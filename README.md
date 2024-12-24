# Dynamic Risk Assessment Engine (MVP)

This project is a simple yet powerful example of a **Dynamic Risk Assessment Engine**. It continually updates **insurance risk profiles** using real-time data (e.g., weather information) and provides a **clean, interactive frontend** for end users.

> **Why it’s important**: Traditional insurance models often rely on outdated or infrequent data. This engine showcases how integrating **timely external data** can enhance risk scoring accuracy.

## Table of Contents

1. [Overview](#overview)
2. [Key Technologies](#key-technologies)
3. [Features](#features)
4. [Directory Structure](#directory-structure)
5. [Installation & Setup](#installation--setup)
6. [Environment Variables](#environment-variables)
7. [Deployment](#deployment)
8. [Roadmap](#roadmap)
9. [License](#license)

---

## Overview

- **Backend (FastAPI + Python)**: Processes user input, fetches external data (e.g., weather), and calculates a **risk score**.
- **Frontend (React + TypeScript)**: Lets users submit property details (like ZIP code) and see real-time **risk scores**.

**Goal**: Provide a polished MVP that demonstrates:

1. A full-stack architecture (frontend + backend).
2. External API integration (e.g., weather data).
3. Basic risk scoring capabilities.
4. Easy deployment to services like Heroku, Netlify, or Render.

---

## Key Technologies

### Backend

- **Python 3.9+** with **FastAPI**
- Main libraries:
  - `uvicorn` (runs the FastAPI server)
  - `requests` (for external API calls)
  - `pydantic` (data validation)
  - _Optionally_: `scikit-learn` for future ML integrations

### Frontend

- **React (TypeScript)** + **Vite**
- **Tailwind CSS** for quick styling
- **Axios** (or `fetch`) for making HTTP requests

### Database/Storage

- **MVP**: Uses CSV, SQLite, or even in-memory storage.
- For production, consider **PostgreSQL** or another database.

---

## Features

1. **Risk Scoring API**

   - `POST /api/calculate-risk`
   - Returns a numeric `risk_score` based on property data (type, ZIP code) and live weather info.

2. **Real-Time Weather Integration**

   - Fetches weather info from [OpenWeatherMap](https://openweathermap.org/api) (or another service).
   - Translates conditions (e.g., rain, storms) into extra risk factors.

3. **User-Friendly Interface**

   - Simple, responsive form where users enter a ZIP code and property type.
   - Displays real-time risk results and weather conditions.

4. **Modular Code**
   - Clearly separated files for routes, weather API calls, and risk scoring in the backend.
   - Frontend components split into **reusable** React and TypeScript modules.

---

## Directory Structure

```
dynamic-risk-engine/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py          # FastAPI entry point
│   │   ├── routes.py        # API endpoints
│   │   ├── risk_calculator.py
│   │   ├── external_api.py  # External weather API logic
│   │   └── models.py        # (Optional) pydantic models
│   ├── requirements.txt     # Python dependencies
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── globals.css      # Tailwind CSS
│   │   └── components/
│   │       └── RiskForm.tsx # Form for user input
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── .gitignore
├── README.md
└── ...
```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dynamic-risk-engine.git
cd dynamic-risk-engine
```

### 2. Backend Setup

1. **Install Python dependencies**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # on macOS/Linux
   pip install -r requirements.txt
   ```
2. **Run the FastAPI server**
   ```bash
   uvicorn app.main:app --reload
   ```
3. **Verify**
   - Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to see the auto-generated docs.
   - Test `POST /api/calculate-risk` directly in the Swagger UI.

### 3. Frontend Setup

1. **Install Node dependencies**
   ```bash
   cd ../frontend
   npm install
   ```
2. **Start the development server**
   ```bash
   npm run dev
   ```
3. **Test in Browser**
   - Visit the URL shown in the terminal (e.g., [http://127.0.0.1:5173](http://127.0.0.1:5173)).
   - Submit the form to see real-time risk scores.

---

## Environment Variables

- **OpenWeatherMap API Key**
  - Set `OPENWEATHER_API_KEY` in your backend environment or `.env` file.
  - If not set, the app might use a placeholder or show an error.
- **Backend URL in Frontend**
  - If the backend is hosted separately, put its URL in a `.env` file (e.g., `VITE_API_URL`) and use that in fetch/axios calls.

---

## Deployment

1. **Deploy the Backend**

   - **Heroku**: Add a `Procfile`, push to Heroku, set environment variables.
   - **Render**: Create a new web service from your repo and configure environment variables.

2. **Deploy the Frontend**

   - **Netlify**: Link your GitHub repo, set the build command to `npm run build`, and publish from `dist/`.
   - **Vercel**: Import your project, confirm the build settings, and deploy.

3. **Configure Production Variables**
   - Ensure your frontend points to the correct backend URL in production.

---

## Roadmap

1. **Advanced Risk Modeling**

   - Integrate past claims data or geodemographic details.
   - Explore adding an ML model (e.g., scikit-learn).

2. **Robust Database**

   - Move from CSV or in-memory to a database like PostgreSQL for real-world scenarios.

3. **User Authentication**

   - Allow users to sign in and track their property risk assessments over time.

4. **Logging & Monitoring**

   - Add backend/frontend logging and performance tracking.
   - Integrate error reporting tools.

5. **Continuous Integration/Deployment**
   - Implement automated testing and deployment pipelines (GitHub Actions, GitLab CI, etc.).

---

## License

Feel free to choose a license that best suits your needs (e.g., MIT, Apache 2.0). Include it here.

### Thank You!

We appreciate your interest in this Dynamic Risk Assessment Engine (MVP). If you have any questions or suggestions, please open an issue or submit a pull request. Enjoy building!
