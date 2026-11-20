# Casse-briques-canvas
Petit jeu pour découvrir le canvas et l'architecture backend.

## Fonctionnalités prévues
Une fois le nom sélectionné, il faut cliquer sur le canvas pour le sélectionner et appuyer sur
espace pour jouer

## Stack technique
- Frontend : JavaScript (ES6+), HTML5 Canvas, CSS3, Vite.
- Backend : Python, FastAPI (API REST).
- Base de données : SQLite.
- Serveur applicatif : Uvicorn.

## Init
### Backend
**Au premier démarrage:** créer l'environnement python (depuis le dossier backend):
```
python -m venv .venv
```
Puis activer l'environnement:
```
.\.venv\Scripts\Activate.ps1
```
Ou sous Linux/MacOs:
```
source .venv/bin/activate
```
Installer les dépendances:
```
python -m pip install -r requirements.txt
```

Pour **lancer** le backend:
Après avoir cloné le projet, pour lancer le backend:
1. Se mettre dans le dossier server
2. Lancer, dans l'ordre:
```
.\.venv\Scripts\Activate.ps1
```
Puis
```
python -m uvicorn main:app --reload
```

### Frontend
**Au premier démarrage:** pour installer les dépendances (dans client):
```
npm install
```

Puis, pour le **lancer:**
```
npm run dev
```