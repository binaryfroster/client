import os
import re

missing = set()
for f in os.listdir('scraped_pages'):
    with open(os.path.join('scraped_pages', f), 'r', encoding='utf-8') as fp:
        html = fp.read()
    assets = re.findall(r'(?:src|href)=["\'](/assets/[^"\']+|/__l5e/[^"\']+|/[a-zA-Z0-9_\-\.]+\.png)["\']', html)
    for a in assets:
        local_a = os.path.join('scraped', a.lstrip('/'))
        if not os.path.exists(local_a):
            missing.add(a)

print("Missing assets across all HTML pages:", missing)
