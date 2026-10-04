import urllib.request
import re
import os

base_url = "https://power-house-digital.lovable.app"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

visited_assets = set()
to_fetch = [
    "/assets/PublicBlocks-D9-2YQ0P.js",
    "/assets/arrow-right-BGNB-Sdj.js",
    "/assets/index-BckL96hb.js",
    "/assets/routes-CG-tjpok.js",
    "/assets/styles-C7PxWAHs.css",
    "/assets/users-BQZR0k5M.js",
    "/favicon.png"
]

all_images = set([
    "/__l5e/assets-v1/069c83c9-0c52-4fc3-a585-47e21258efc0/gym-floor-2.jpeg",
    "/__l5e/assets-v1/2af281ae-a2d9-4174-95da-3e39cee943d5/power-house-logo.png",
    "/__l5e/assets-v1/999a7365-6d25-41c6-9039-422f61c11750/gym-floor-1.jpeg",
    "/__l5e/assets-v1/b1c39f20-0db3-4049-804f-80a49562f10f/ameer-mullani.jpeg"
])

os.makedirs('scraped/assets', exist_ok=True)
os.makedirs('scraped/__l5e/assets-v1', exist_ok=True)

while to_fetch:
    asset_path = to_fetch.pop(0)
    if asset_path in visited_assets:
        continue
    visited_assets.add(asset_path)
    
    url = base_url + asset_path
    print(f"Fetching {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
            
        local_path = os.path.join('scraped', asset_path.lstrip('/'))
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        with open(local_path, 'wb') as f:
            f.write(content)
            
        if asset_path.endswith('.js') or asset_path.endswith('.css'):
            text = content.decode('utf-8', errors='ignore')
            # Look for other assets
            found_assets = re.findall(r'["\'](/assets/[a-zA-Z0-9_\-\.]+\.(?:js|css|woff2|woff|ttf|svg|png|jpg|webp))["\']', text)
            for fa in found_assets:
                if fa not in visited_assets and fa not in to_fetch:
                    to_fetch.append(fa)
            # Look for relative imports like "./About-..." or "PublicBlocks-..."
            rel_assets = re.findall(r'["\']((?:[a-zA-Z0-9_\-]+-[a-zA-Z0-9_\-]+\.js))["\']', text)
            for ra in rel_assets:
                fa = "/assets/" + ra
                if fa not in visited_assets and fa not in to_fetch:
                    to_fetch.append(fa)
                    
            # Look for l5e assets (images uploaded to lovable)
            found_l5e = re.findall(r'(/__l5e/assets-v1/[a-zA-Z0-9_\-]+/[a-zA-Z0-9_\-\.]+)', text)
            for fl in found_l5e:
                all_images.add(fl)
    except Exception as e:
        print(f"Error fetching {asset_path}: {e}")

print(f"\nDiscovered {len(visited_assets)} code assets and {len(all_images)} images.")

for img in all_images:
    url = base_url + img
    print(f"Fetching image: {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
        local_path = os.path.join('scraped', img.lstrip('/'))
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        with open(local_path, 'wb') as f:
            f.write(content)
        print(f"Saved {img}")
    except Exception as e:
        print(f"Error fetching image {img}: {e}")
