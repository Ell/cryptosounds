#!/bin/python

import json
import requests

response = requests.get("https://api.kraken.com/0/public/AssetPairs").json()
results = response["result"]

allowed_out = [
    "USD",
    "USDT",
]

filtered = [
    {pair["wsname"]: pair["altname"]}
    for pair in response["result"].values()
    if pair["wsname"].split("/")[1] in allowed_out
]

with open("../src/pairs.json", "w") as f:
    f.write(f'{{"pairs": {json.dumps(filtered)}}}')
