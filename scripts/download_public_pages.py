import urllib.request
import re
import os

base_url = "https://power-house-digital.lovable.app"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

to_download = ["/assets/PublicPages-BYBzPx0t.js"]
visited = set(os.listdir('scraped/assets'))

while to_download:
    cur = to_download.pop(0)
    fname = os.path.basename(cur)
    if fname in visited:
        continue
    visited.add(fname)
    url = base_url + cur
    print(f"Downloading {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
        target = os.path.join('scraped/assets', fname)
        with open(target, 'wb') as f:
            f.write(content)
        print(f"Saved {fname} ({len(content)} bytes)")
        
        # Check imports inside this file
        text = content.decode('utf-8', errors='ignore')
        matches = re.findall(r'["\'](?:\./|/assets/)([a-zA-Z0-9_\-]+\.(?:js|css))["\']', text)
        for m in matches:
            if m not in visited:
                to_download.append("/assets/" + m)
                
        # Check image or media references
        img_matches = re.findall(r'(/__l5e/assets-v1/[a-zA-Z0-9_\-]+/[a-zA-Z0-9_\-\.]+)', text)
        for im in set(img_matches):
            im_target = os.path.join('scraped', im.lstrip('/'))
            if not os.path.exists(im_target):
                os.makedirs(os.path.dirname(im_target), exist_ok=True)
                im_url = base_url + im
                print(f"Downloading image {im_url}...")
                try:
                    with urllib.request.urlopen(urllib.request.Request(im_url, headers=headers)) as r:
                        with open(im_target, 'wb') as f:
                            f.write(r.read())
                    print(f"Saved {im}")
                except Exception as ex:
                    print(f"Error fetching image {im}: {ex}")
    except Exception as e:
        print(f"Error fetching {cur}: {e}")
