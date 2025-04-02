@echo off

:: Start backend server
start cmd /k "cd backend && npm run dev"

:: Start frontend server
start cmd /k "cd frontend && npm start" 