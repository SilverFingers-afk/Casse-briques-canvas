const API_URL = "http://127.0.0.1:8000";

export async function saveScore(player, points) {
    const response = await fetch(`${API_URL}/scores`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            player: player,
            points: points
        })
    });

    if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement");
    }

    return await response.json();
}

export async function getScores() {
    const response = await fetch(`${API_URL}/scores`);

    if (!response.ok) {
        throw new Error("Impossible de récupérer les scores");
    }

    return await response.json();
}