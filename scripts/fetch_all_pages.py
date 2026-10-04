import urllib.request
import os

base_url = "https://power-house-digital.lovable.app"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

routes = [
    ("", "index.html"),
    ("about", "about.html"),
    ("programs", "programs.html"),
    ("personal-training", "personal-training.html"),
    ("membership", "membership.html"),
    ("gallery", "gallery.html"),
    ("reviews", "reviews.html"),
    ("visit", "visit.html"),
    ("owner", "owner.html")
]

os.makedirs('scraped_pages', exist_ok=True)

for route, filename in routes:
    url = f"{base_url}/{route}"
    print(f"Fetching {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
        target = os.path.join('scraped_pages', filename)
        with open(target, 'wb') as f:
            f.write(content)
        print(f"Saved {filename} ({len(content)} bytes)")
    except Exception as e:
        print(f"Error fetching {url}: {e}")
