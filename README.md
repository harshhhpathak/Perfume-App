# Perfume Shop - Full Stack E-commerce Application

A modern e-commerce platform for selling perfumes, built with React, Node.js, and MongoDB.

## Features

- Responsive navigation bar
- Eye-catching call-to-action banner
- Interactive product cards with hover effects
- Detailed product pages
- Product reviews system
- Social media sharing
- MongoDB integration for dynamic data

## Tech Stack

- Frontend: React.js
- Backend: Node.js with Express
- Database: MongoDB
- Styling: CSS Modules with modern design

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the backend directory with:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     ```

4. Start the application:
   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend development server
   cd ../frontend
   npm start
   ```

5. Access the application at `http://localhost:3000`

## Project Structure

```
perfumeapp/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── styles/
│       └── App.js
└── README.md
``` 
