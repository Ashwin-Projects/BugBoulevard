# 🐞 BugBoulevard

A real-time, competitive debugging arena where players race to fix buggy code snippets under pressure.  
The mission: debug faster than your peers, climb the leaderboard, and become the ultimate Bug Hunter. 🚀  

---

## 🌟 Features
- **Multiplayer Debug Races** – Join friends or random players in timed races.  
- **Buggy Code Challenges** – Handcrafted problems with intentional errors.  
- **Hints with Penalties** – Take hints, but lose precious seconds or points.  
- **Dynamic Leaderboard** – Live updates of scores and ranks.  
- **Arcade-Style UI** – Neon-glow, dark theme, and smooth transitions for a fun gaming vibe.  

---

## 🖥️ Tech Stack
**Frontend (Lovable / React):**
- Vite + React + TypeScript  
- Tailwind CSS + shadcn/ui (UI components)  
- Framer Motion (animations)  

**Backend:**
- Node.js + Express  
- Socket.IO (real-time gameplay)  
- SQLite / MongoDB Atlas (scores + user persistence)  

**Deployment:**
- Frontend → Lovable publish  
- Backend → Railway / Render  

---

## 🚀 How to Run Locally

### Frontend
```sh
# Step 1: Clone the repo
git clone <YOUR_GIT_URL>
cd bug-boulevard-frontend

# Step 2: Install dependencies
npm install

# Step 3: Start dev server
npm run dev
