# 🎮 Neon Code Champions Website Features

## 🌐 **Website Access:**
- **Main Website:** http://localhost:5173
- **Backend API:** http://localhost:4000

## 🔐 **Sign-In & Authentication:**

### **Frontend Pages (http://localhost:5173):**
- **Home Page** - Main landing page
- **Profile Page** - User account management
- **Authentication** - Register/Login forms

### **Backend API Endpoints (http://localhost:4000):**
- **POST /api/auth/register** - Create new user account
- **POST /api/auth/login** - Sign in existing user

### **Example API Usage:**
```bash
# Register a new user
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## 🗄️ **Database (MongoDB Atlas):**

### **Connected Database:**
- **Cluster:** cluster.eml0w21.mongodb.net
- **User:** ashwinlakshminarasimhan46_db_user
- **Collections:**
  - `users` - User accounts and authentication
  - `scores` - User points and leaderboard
  - `games` - Game sessions and players

### **Database Features:**
- ✅ **User Registration** - Secure password hashing with bcrypt
- ✅ **User Authentication** - Login validation
- ✅ **Score Tracking** - Points and leaderboard
- ✅ **Game Management** - Multiplayer game sessions
- ✅ **Real-time Updates** - Socket.IO integration

## 🎯 **Available Features:**

### **Authentication System:**
1. **User Registration**
   - Username, email, password
   - Secure password hashing
   - Duplicate user validation

2. **User Login**
   - Username/password authentication
   - Session management
   - User profile access

### **Game Features:**
1. **Game Creation**
   - Create new multiplayer games
   - Set game modes and player limits
   - Real-time game updates

2. **Lobby System**
   - Join/leave game lobbies
   - View active games
   - Real-time lobby updates

3. **Leaderboard**
   - Top player rankings
   - Score tracking
   - User statistics

## 🔧 **API Endpoints:**

### **Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### **Games:**
- `POST /api/games` - Create new game
- `GET /api/games/:id` - Get game details

### **Leaderboard:**
- `GET /api/leaderboard` - Get top players

### **Lobby:**
- `GET /api/lobby` - List active lobbies
- `POST /api/lobby/join` - Join a game
- `POST /api/lobby/leave` - Leave a game

## 🚀 **How to Use:**

1. **Open the website:** http://localhost:5173
2. **Register a new account** using the sign-up form
3. **Login** with your credentials
4. **Explore game features:**
   - Create or join games
   - View leaderboard
   - Manage your profile

**Your Neon Code Champions website is fully functional with MongoDB Atlas database!** 🎉
