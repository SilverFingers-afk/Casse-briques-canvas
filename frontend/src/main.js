import './style.css';
import { Brick } from './bricks/Brick.js';
import { BrickManager } from './bricks/brickManager.js';
import { Ball } from './Ball.js';
import { level1,level2,level0 } from './levels.js';
import { Paddle } from './Paddle.js';
import { saveScore } from "./api.js";
import { getScores } from "./api.js";
import { ParticleManager } from "./particules/ParticleManager.js";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const title = document.querySelector('#step-title');
const instructions = document.querySelector('#instructions');
const status = document.querySelector('#status');
const controls = document.querySelector('.controls');
const canvasWidth = 860;
const paddleWidth = 70;
const canvasHeight = 400;
let x = canvasWidth/2 ;
const level = new BrickManager(level2, canvasWidth, 20, 40);
const scoreElement = document.getElementById("score");
level.loadLevel();
const ball = new Ball(x, 330, 7, 1.25, -1.25);
const paddle = new Paddle(x - paddleWidth/2, 350 , paddleWidth, 20);
const keys = new Set();
const particleManager = new ParticleManager();
const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", () => {
    window.location.reload();
});
let score = 0;
let gameState = "waiting";
const playerName = prompt("Entrez votre nom de joueur :")?.trim() || "Anonyme";
canvas.addEventListener('keydown', event => keys.add(event.key));
canvas.addEventListener('keyup', event => keys.delete(event.key));
canvas.addEventListener("keydown", (event) => {
    if (event.code === "Space" && gameState === "waiting") {
        event.preventDefault();
        gameState = "playing";
    }
});
canvas.addEventListener("click", () => {
    canvas.focus();
});
let cleanup = () => {};

function rectangle() {
  context.fillStyle = '#102b29'; context.fillRect(0, 0, canvasWidth, 400);
}

function updateScore(points) {
    console.log(points)
    scoreElement.textContent = points;
}

async function displayLeaderboard() {
    const leaderboard = document.getElementById("leaderboard");

    try {
        const scores = await getScores();

        leaderboard.replaceChildren();

        const topScores = [...scores]
        .sort((a, b) => b.points - a.points)
        .slice(0, 10);

        for (let i = 0; i < 10; i++) {
            const li = document.createElement("li");

            if (i < topScores.length) {
                li.textContent = `${topScores[i].player} : ${topScores[i].points}`;
            } else {
            li.textContent = "NP";
        }

    leaderboard.appendChild(li);
}
    } catch (error) {
        console.error("Erreur de chargement :", error);
    }
}

async function sendScore(player, score) {
    await saveScore(player, score)
}

function drawGameOver(ctx, canvas, gameState, score) {
    // Fond gris semi-transparent
    ctx.fillStyle = "rgba(30, 30, 30, 0.75)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Texte centré
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "white";
    ctx.font = "bold 40px Arial";

    const message = gameState === "won"
        ? "VICTOIRE !"
        : "GAME OVER";

    ctx.fillText(
        message,
        canvas.width / 2,
        canvas.height / 2 - 30
    );

    ctx.font = "24px Arial";
    ctx.fillText(
        `Score : ${score}`,
        canvas.width / 2,
        canvas.height / 2 + 25
    );
}

let previous = null;
let frameId = 0;
let sended = false;

displayLeaderboard();

function frame(now) {
  const dt = previous === null ? 0 : (now - previous) / 1000;
  previous = now;
  if (gameState === "playing") {
        const direction = Number(keys.has('ArrowRight')) - Number(keys.has('ArrowLeft'));
        const points = level.checkCollisions(ball, particleManager);
        paddle.x = Math.max(0, Math.min(canvasWidth - paddle.width, paddle.x + direction * 350 * dt));
        ball.update();
        particleManager.update();
        ball.checkWalls(canvasWidth);
        ball.checkPaddle(paddle);
        // Collisions avec les briques
        if (points > 0) {
            score += points;
            updateScore(score);
        }
        // Vérification des conditions de fin
        if (level.isCompleted()) {
            gameState = "won";
        } else if (ball.isLost(canvas)) {
            gameState = "lost";
        }
    }

    rectangle();
    level.afficher(context);
    paddle.afficher(context);
    ball.afficher(context);
    particleManager.afficher(context);

    if (gameState === "waiting") {
        context.fillStyle = "white";
        context.font = "22px Arial";
        context.textAlign = "center";
        context.fillText(
            "Cliquez ici puis appuyez sur ESPACE",
            canvas.width / 2,
            canvas.height / 2
        );
    }

    // Écran de fin
    if (gameState !== "playing" && gameState !== "waiting") {
        drawGameOver(context, canvas, gameState, score);
        restartButton.style.display = "block";
        if (!sended) {
            sended = true
            sendScore(playerName, score)
                .then(() => displayLeaderboard())
        }
    }
   
  frameId = requestAnimationFrame(frame);
}
frameId = requestAnimationFrame(frame);

  instructions.textContent = 'Origine en haut à gauche. x va vers la droite, y vers le bas.';
  rectangle(300);
  controls.hidden = true;

window.addEventListener('pagehide', cleanup, {once:true});
if (import.meta.hot) import.meta.hot.dispose(cleanup);
