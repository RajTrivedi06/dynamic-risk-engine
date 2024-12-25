# backend/app/coverage_calculator.py

import math
from typing import Optional

def estimate_dwelling_coverage(
    square_footage: float, 
    cost_per_sqft: float, 
    year_built: Optional[int] = None,
    roof_age: Optional[int] = None
) -> float:
    """
    Estimate the dwelling coverage by multiplying the home's 
    square footage by a local cost per sq ft, 
    then adjust for older year built or roof condition if desired.
    """
    base = square_footage * cost_per_sqft

    # Example adjustments
    if year_built and year_built < 1970:
        base *= 1.10  # add 10% for older structures
    if roof_age and roof_age > 15:
        base *= 1.05  # 5% if roof is older than 15 yrs

    return base

def estimate_personal_property(dwelling_cov: float) -> float:
    """
    Simple approach: personal property ~ 60% of dwelling coverage by default.
    """
    return dwelling_cov * 0.60

def estimate_liability(has_pool: bool = False) -> float:
    """
    Basic liability coverage suggestion. 
    If there's a pool or other risk factor, suggest higher coverage.
    """
    base = 300_000.0
    if has_pool:
        base = 500_000.0
    return base

def calculate_total_coverage(
    square_footage: float, 
    cost_per_sqft: float,
    year_built: Optional[int] = None,
    roof_age: Optional[int] = None,
    has_pool: bool = False
) -> dict:
    """
    Main function to compute coverage estimates.
    Returns a dictionary of coverage categories.
    """
    dwelling = estimate_dwelling_coverage(square_footage, cost_per_sqft, year_built, roof_age)
    personal = estimate_personal_property(dwelling)
    liability = estimate_liability(has_pool)

    return {
        "dwelling_coverage": math.ceil(dwelling),
        "personal_property": math.ceil(personal),
        "liability_coverage": liability
    }
