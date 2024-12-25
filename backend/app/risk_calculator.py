# backend/app/risk_calculator.py

def calculate_risk(property_type: str, weather_factor: float) -> float:
    """
    Calculate a simple risk score based on property type and weather factor.
    """
    base_score = 0.0

    # Basic logic based on property type
    if property_type.lower() == "house":
        base_score = 5.0
    elif property_type.lower() == "apartment":
        base_score = 3.0
    elif property_type.lower() == "condo":
        base_score = 4.0
    else:
        base_score = 2.0  # Default for other property types

    # Combine with weather factor
    risk_score = base_score + weather_factor

    # Clamp the score between 1 and 10
    risk_score = max(1.0, min(risk_score, 10.0))

    return risk_score
