# How to Run the Neon Code Champions Website

## Prerequisites
You need to install Node.js and npm first:

### 1. Install Node.js
- Go to [nodejs.org](https://nodejs.org/)
- Download and install the LTS version
- This will also install npm

### 2. Verify Installation
Open a new PowerShell/Command Prompt and run:
```bash
node --version
npm --version
```

## Running the Website

### Step 1: Set up the Backend (MongoDB Server)

1. **Navigate to server directory:**
   ```bash
   cd neon-code-champions-main/server
   ```

2. **Create environment file:**
   Create a `.env` file in the server directory with:
   ```env
   MONGODB_URI={{MONGODB_URI}}
   PORT=4000
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   Connected to MongoDB
   API listening on http://localhost:4000
   ```

### Step 2: Set up the Frontend (React App)

1. **Open a new terminal/PowerShell window**

2. **Navigate to project root:**
   ```bash
   cd neon-code-champions-main
   ```

3. **Install frontend dependencies:**
   ```bash
   npm install
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   Local:   http://localhost:5173/
   Network: http://192.168.x.x:5173/
   ```

## Access the Website

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000

## Available Features

### Backend API Endpoints:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/leaderboard` - Get leaderboard
- `POST /api/games` - Create new game
- `GET /api/games/:id` - Get game by ID
- `GET /api/lobby` - List active lobbies
- `POST /api/lobby/join` - Join a game
- `POST /api/lobby/leave` - Leave a game

### Frontend Pages:
- Home page
- Game Room
- Leaderboard
- Lobby
- Profile

## Troubleshooting

### If npm is not recognized:
1. Restart your terminal/PowerShell after installing Node.js
2. Or use the full path to npm (usually in Program Files)

### If MongoDB connection fails:
1. Check your internet connection
2. Verify the MongoDB Atlas cluster is running
3. Ensure your IP is whitelisted in MongoDB Atlas

### If ports are in use:
- Backend: Change PORT in server/.env file
- Frontend: Vite will automatically find the next available port

## Development Commands

### Backend:
```bash
cd server
npm run dev    # Development mode
npm run build # Build for production
npm start      # Run production build
```

### Frontend:
```bash
npm run dev    # Development mode
npm run build  # Build for production
npm run preview # Preview production build
```
