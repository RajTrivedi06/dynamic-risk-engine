# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from .routes import router  # just the router, no data_loader import

# Load .env file if present
load_dotenv()

app = FastAPI(
    title="Dynamic Risk Assessment Engine",
    description="Backend for Dynamic Risk Assessment + Coverage",
    version="1.0.0"
)

origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Just include the router
app.include_router(router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Dynamic Risk & Coverage Backend!"}
