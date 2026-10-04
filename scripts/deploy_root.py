import shutil
import os

# Copy assets
shutil.copytree('scraped/assets', 'assets', dirs_exist_ok=True)
print("Copied assets/")

# Copy __l5e
shutil.copytree('scraped/__l5e', '__l5e', dirs_exist_ok=True)
print("Copied __l5e/")

# Copy favicon
if os.path.exists('scraped/favicon.png'):
    shutil.copy('scraped/favicon.png', 'favicon.png')
    print("Copied favicon.png")

# Copy HTML pages
for f in os.listdir('scraped_pages'):
    if f.endswith('.html'):
        shutil.copy(os.path.join('scraped_pages', f), f)
        print(f"Copied {f}")

print("\nAll production files deployed to root!")
