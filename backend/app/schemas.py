# backend/app/schemas.py

from pydantic import BaseModel
from typing import Optional

# -------------------
# Risk Models
# -------------------
class RiskRequest(BaseModel):
    zip_code: str
    property_type: str

class RiskResponse(BaseModel):
    zip_code: str
    property_type: str
    weather_factor: float
    risk_score: float

# --------------------
# Coverage Models
# --------------------
class CoverageRequest(BaseModel):
    city: str
    property_type: str
    square_footage: float
    year_built: Optional[int] = None
    roof_age: Optional[int] = None
    has_pool: bool = False

class CoverageResponse(BaseModel):
    dwelling_coverage: float
    personal_property: float
    liability_coverage: float
