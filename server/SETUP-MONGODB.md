# MongoDB Atlas Setup Guide

## Your MongoDB Connection String
```
mongodb+srv://ashwinlakshminarasimhan46_db_user:codexcape@cluster.eml0w21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster
```

## Setup Steps

### 1. Install Dependencies
Make sure you have Node.js and npm installed, then run:
```bash
cd neon-code-champions-main/server
npm install
```

### 2. Set Environment Variable
Create a `.env` file in the `server` directory with:
```env
MONGODB_URI=mongodb+srv://ashwinlakshminarasimhan46_db_user:codexcape@cluster.eml0w21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster
PORT=4000
```

### 3. Alternative: Set Environment Variable Directly

#### Windows PowerShell:
```powershell
$env:MONGODB_URI="mongodb+srv://ashwinlakshminarasimhan46_db_user:codexcape@cluster.eml0w21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
npm run dev
```

#### Windows Command Prompt:
```cmd
set MONGODB_URI=mongodb+srv://ashwinlakshminarasimhan46_db_user:codexcape@cluster.eml0w21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster
npm run dev
```

### 4. Start the Server
```bash
npm run dev
```

## Expected Output
When successful, you should see:
```
Connected to MongoDB
API listening on http://localhost:4000
```

## API Endpoints Available
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user  
- `GET /api/leaderboard` - Get leaderboard
- `POST /api/games` - Create new game
- `GET /api/games/:id` - Get game by ID
- `GET /api/lobby` - List active lobbies
- `POST /api/lobby/join` - Join a game
- `POST /api/lobby/leave` - Leave a game

## Database Collections
The following collections will be created automatically:
- `users` - User accounts
- `scores` - User scores/points
- `games` - Game sessions

## Troubleshooting
- Make sure your MongoDB Atlas cluster allows connections from your IP
- Check that the username and password are correct
- Ensure the database user has read/write permissions
