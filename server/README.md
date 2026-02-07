# Neon Code Champions - Backend

Express + TypeScript + Socket.IO + MongoDB.

## Setup

1. Create your env file:
   - Copy `.env.example` to `.env` and fill in values.
   - Set `MONGODB_URI` to your MongoDB connection string (defaults to `mongodb://localhost:27017/neon-code-champions`)

2. Install dependencies:
   - Using npm: `npm install`

3. Run in dev mode:
   - `npm run dev`
   - Server starts on `http://localhost:4000` by default.

4. Build and run:
   - `npm run build && npm start`

## API
- GET `/api/health` – health check and optional DB check.
- POST `/api/auth/register` – register a new user
- POST `/api/auth/login` – login user
- GET `/api/leaderboard` – get leaderboard
- POST `/api/games` – create a new game
- GET `/api/games/:id` – get game by ID
- GET `/api/lobby` – list active lobbies
- POST `/api/lobby/join` – join a game
- POST `/api/lobby/leave` – leave a game

## Realtime
Socket.IO is available on the same server. Example namespaces/rooms are stubbed for lobby and game rooms.

## Database
- Uses MongoDB with Mongoose ODM
- Connection string in `MONGODB_URI` environment variable
- Models: User, Score, Game
- Automatic password hashing with bcryptjs
