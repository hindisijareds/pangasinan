import re
import json

with open('C:/Users/jared/.gemini/antigravity/brain/788fd68a-f642-421d-a143-5441da7d515f/.system_generated/steps/34/content.md', encoding='utf-8') as f:
    content = f.read()

idx = content.find('{\\"heritageItems\\":[')
if idx == -1:
    idx = content.find('{"heritageItems":[')

if idx != -1:
    stack = 0
    end_idx = idx
    for i in range(idx, len(content)):
        if content[i] == '{':
            stack += 1
        elif content[i] == '}':
            stack -= 1
            if stack == 0:
                end_idx = i + 1
                break
    
    # We might have nested escaping. Let's just try to parse the unescaped string
    raw_str = content[idx:end_idx]
    
    # RSC payload unescaping is tricky. If it's a JS string, we can do json.loads('"' + raw_str + '"') ? No.
    # We can try to decode unicode escapes
    try:
        # If it was within double quotes in RSC, let's just unescape it fully
        import codecs
        decoded_str = codecs.decode(raw_str, 'unicode_escape')
        # Wait, if we just unescape backslashes:
        decoded_str = raw_str.replace('\\"', '"').replace('\\\\', '\\')
        data = json.loads(decoded_str)
        with open('src/data/awaran.json', 'w', encoding='utf-8') as out:
            json.dump(data, out, indent=2)
        print("Success! Extracted", len(data.get('heritageItems', [])), "items.")
    except Exception as e:
        print("Error:", e)
else:
    print("Not found")

