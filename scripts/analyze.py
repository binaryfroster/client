import re
import os
import urllib.request
import json

base_url = "https://power-house-digital.lovable.app"

with open('index_scraped.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

urls = set()
for match in re.finditer(r'(?:src|href)=["\']([^"\']+)["\']', text):
    u = match.group(1)
    if '/assets/' in u or '/__l5e/' in u or 'favicon' in u:
        urls.add(u)

print("Found URLs in index.html:")
for u in sorted(urls):
    print(" ", u)
