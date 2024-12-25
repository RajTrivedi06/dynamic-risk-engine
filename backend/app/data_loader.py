# backend/app/data_loader.py

import pandas as pd
import os

DATA_PATH = os.path.join("backend", "data", "city_market_tracker.tsv")

class DataLoader:
    def __init__(self):
        self.df = None
    
    def load_data(self):
        # load your CSV into a DataFrame
        self.df = pd.read_csv(DATA_PATH)
        # example: keep only latest row per city
        # or do any preprocessing you want

    def get_cost_per_sqft(self, city: str, property_type: str) -> float:
        """
        Retrieve a cost_per_sqft or median PPSF from the DataFrame 
        for the specified city and property type, or return fallback.
        """
        # filter df
        sub = self.df[
            (self.df['city'].str.lower() == city.lower()) &
            (self.df['property_type'].str.lower() == property_type.lower())
        ]
        if not sub.empty:
            # example: take the last row or an average
            val = sub.tail(1)['median_ppsf'].values[0]
            return float(val) if val > 0 else 150.0
        else:
            # fallback if city not found
            return 150.0  # arbitrary default cost per sq ft

data_loader = DataLoader()
data_loader.load_data()