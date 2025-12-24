BeyondChats Assignment – Article Scraping & API Integration
📌 Project Overview

This project is developed as part of the BeyondChats assignment.
It demonstrates a complete workflow involving:

Article scraping and processing

Backend API integration

Frontend rendering of original and AI-generated articles

Deployment of the frontend application

The application is designed to dynamically fetch article data from a backend API and display it on a web interface.

🛠️ Tech Stack

Frontend

React.js

Deployed on Vercel

Backend

Laravel (REST API)

Article scraping & data processing

Hosted separately (API-based architecture)

🚀 Features

Displays Original Articles

Displays Updated Articles (AI Generated)

Dynamic API-based data fetching

Clean and minimal UI

Environment-based configuration for API URLs

🌐 Live Deployment

Frontend URL:
👉 https://beyondchats-assignment-psi.vercel.app

⚠️ Note:
The frontend depends on a backend API to fetch article data. If the API is not active or not configured, the articles will not be visible on the live site.

🔗 API Dependency (Important)

The application fetches articles using a backend API.

API configuration is handled using environment variables.

Without an active API endpoint or valid API configuration, article data cannot be displayed on the frontend.

This behavior is expected and confirms correct separation of frontend and backend concerns.

📸 Proof of Working

A PDF containing screenshots of the application showing articles when the API was properly connected and running has been included as part of the assignment submission.
This demonstrates that:

The frontend is implemented correctly

API integration works as expected when the backend is available

⚙️ Environment Variable Setup (Frontend)

The frontend uses the following environment variable:

REACT_APP_API_URL=<BACKEND_API_BASE_URL>


Example:

REACT_APP_API_URL=https://beyondchats-api.up.railway.app


After updating environment variables, a redeploy is required.

📂 Project Structure
beyondchats-assignment/
├── react-frontend/
├── laravel-backend/
├── node-ai-pipeline/
└── README.md

✅ Conclusion

The project has been implemented and deployed successfully according to the assignment requirements.
The frontend, backend integration logic, and deployment pipeline are fully functional.
Any absence of article data on the live site is solely due to backend API availability or configuration, not due to an issue with the frontend implementation.
