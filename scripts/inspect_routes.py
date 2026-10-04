import re
import os

with open('scraped/assets/routes-CG-tjpok.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

print('Length of routes file:', len(text))
chunks = re.findall(r'\"([a-zA-Z0-9_\-]+\.js)\"', text)
print('Chunks referenced in routes:', set(chunks))

# Look for all strings ending in .js
all_js = set(re.findall(r'[\'\"/]([a-zA-Z0-9_\-]+\.js)[\'\"]', text))
print('All .js strings:', all_js)

# Look for route paths
routes = re.findall(r'path:\s*\"([^\"]+)\"', text)
print('Routes found:', set(routes))

# Also search for any other URL or asset
all_assets = set(re.findall(r'\"(/[a-zA-Z0-9_\-\./]+)\"', text))
print('Paths starting with /:', [a for a in all_assets if not a.startswith('//')])
