# backend/app/external_api.py

import requests
import os

TOMORROW_API_KEY = os.getenv("TOMORROW_API_KEY")

def get_weather_factor(zip_code: str) -> float:
    """
    Fetch weather data from Tomorrow.io based on ZIP code and calculate a weather factor.
    """
    try:
        # Convert ZIP code to latitude/longitude
        lat, lon = get_lat_lon(zip_code)

        # Tomorrow.io Timelines API endpoint
        url = "https://api.tomorrow.io/v4/timelines"

        # Define the request parameters
        params = {
            "apikey": TOMORROW_API_KEY,
            "location": f"{lat},{lon}",
            "fields": [
                "precipitationIntensity",
                "windSpeed",
                "weatherCode"
            ],
            "timesteps": "current",
            "units": "imperial"
        }

        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for 4xx/5xx status
        data = response.json()

        # Extract relevant fields from the response
        current = data['data']['timelines'][0]['intervals'][0]['values']
        precipitation_intensity = current.get("precipitationIntensity", 0)
        wind_speed = current.get("windSpeed", 0)
        weather_code = current.get("weatherCode", 0)

        # Simple mapping to a weather factor
        weather_factor = 0.0
        if precipitation_intensity > 0:
            weather_factor += precipitation_intensity * 0.5  # Example weighting
        if wind_speed > 20:
            weather_factor += wind_speed * 0.3

        # Weather code ranges (example: 2xx = Thunderstorm, 5xx = Rain, 6xx = Snow)
        if 200 <= weather_code < 300:
            weather_factor += 2.0  # Thunderstorm
        elif 500 <= weather_code < 600:
            weather_factor += 1.5  # Rain
        elif 600 <= weather_code < 700:
            weather_factor += 1.0  # Snow

        return weather_factor

    except Exception as e:
        print(f"Error fetching weather data: {e}")
        # Return a default factor if the API call fails
        return 1.0

def get_lat_lon(zip_code: str) -> tuple:
    """
    Convert a U.S. ZIP code to latitude and longitude using the Zippopotam.us API.
    """
    try:
        url = f"http://api.zippopotam.us/us/{zip_code}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        place = data['places'][0]
        latitude = float(place['latitude'])
        longitude = float(place['longitude'])
        return (latitude, longitude)
    except Exception as e:
        print(f"Error fetching geolocation data: {e}")
        # Default coordinates or handle it differently if needed
        return (0.0, 0.0)
