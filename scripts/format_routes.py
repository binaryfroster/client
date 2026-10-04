import jsbeautifier
import os

with open('scraped/assets/routes-CG-tjpok.js', 'r', encoding='utf-8') as f:
    code = f.read()

# beautify or write out formatted code
try:
    import jsbeautifier
    opts = jsbeautifier.default_options()
    opts.indent_size = 2
    formatted = jsbeautifier.beautify(code, opts)
    with open('scraped/routes-beautified.js', 'w', encoding='utf-8') as f:
        f.write(formatted)
    print("Beautified routes saved to scraped/routes-beautified.js")
except ImportError:
    # simple formatting
    with open('scraped/routes-beautified.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("jsbeautifier not installed, saved raw")
