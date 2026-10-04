import urllib.request
import os

base_url = "https://power-house-digital.lovable.app/assets/"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

chunks = [
    "about-DCo87xrs.js",
    "gallery-B4hwruBF.js",
    "membership-B66W1dg5.js",
    "owner-DoFcXITO.js",
    "personal-training-DRGlgjAp.js",
    "programs-sjhHadLd.js",
    "reviews-DhDaWByW.js",
    "visit-CCKmCg3f.js"
]

os.makedirs('scraped/assets', exist_ok=True)

for c in chunks:
    url = base_url + c
    print(f"Downloading {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
        with open(os.path.join('scraped/assets', c), 'wb') as f:
            f.write(content)
        print(f"Saved {c} ({len(content)} bytes)")
    except Exception as e:
        print(f"Error {c}: {e}")
