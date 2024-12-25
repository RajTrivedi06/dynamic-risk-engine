# backend/app/routes.py

from fastapi import APIRouter, HTTPException
from .schemas import (
    RiskRequest, RiskResponse,
    CoverageRequest, CoverageResponse
)
from .risk_calculator import calculate_risk
from .external_api import get_weather_factor
from .coverage_calculator import calculate_total_coverage
from .data_loader import data_loader  # <-- import directly from data_loader

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.post("/calculate-risk", response_model=RiskResponse)
def calculate_risk_endpoint(request: RiskRequest):
    """
    Calculate risk score based on ZIP code and property type.
    """
    try:
        weather_factor = get_weather_factor(request.zip_code)
        risk_score = calculate_risk(request.property_type, weather_factor)
        return RiskResponse(
            zip_code=request.zip_code,
            property_type=request.property_type,
            weather_factor=weather_factor,
            risk_score=risk_score
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/calculate-coverage", response_model=CoverageResponse)
def calculate_coverage_endpoint(request: CoverageRequest):
    """
    Estimate coverage needs based on city-level cost data + user inputs.
    """
    try:
        cost_per_sqft = data_loader.get_cost_per_sqft(request.city, request.property_type)
        results = calculate_total_coverage(
            square_footage=request.square_footage,
            cost_per_sqft=cost_per_sqft,
            year_built=request.year_built,
            roof_age=request.roof_age,
            has_pool=request.has_pool
        )
        return CoverageResponse(**results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
