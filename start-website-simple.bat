@echo off
echo Starting Neon Code Champions Website...

REM Add Node.js to PATH
set PATH=%PATH%;C:\Program Files\nodejs

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && set MONGODB_URI=mongodb+srv://ashwinlakshminarasimhan46_db_user:codexcape@cluster.eml0w21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster && npm run dev"

echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd neon-code-champions-main && npm run dev"

echo.
echo Waiting 10 seconds for servers to start...
timeout /t 10 /nobreak > nul

echo.
echo Opening website in browser...
start http://localhost:5173

echo.
echo ========================================
echo Website is starting up!
echo.
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:4000
echo.
echo Both servers are starting in separate windows.
echo Wait for the servers to fully load before using the website.
echo ========================================
echo.
pause
