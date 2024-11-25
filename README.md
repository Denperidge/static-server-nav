# Static Server Nav
Don't wanna have to type in all your subdomains all the time? Want to have your server just give a quick navigation of whatever you've got going, without putting too much processing power into it? Same!

## How-To
### Clone & build locally
Building this requires [Node.js](https://nodejs.org/) to be installed
```bash
# Clone & enter directory
git https://github.com/Denperidge/static-server-nav.git
cd static-server-nav

# Install dependencies
npm install

# After following config instructions below, run...
npm start  # Build static server nav
npm run serve  # Eleventy live server
```

### Configuration
Create a file called `config/config.json` from the repo source directory
```json
{
    "title": "Welcome!",
    "links": [
        ["NextCloud Host", "https://nextcloud.example.com"],
        ["Website", "https://example.com/web"],
        ["Samba", "smb://example.com/share"],
    ]
}
```

#### Adding images to links
While a peculiar system, this workflowhas been made to decrease setup time as much as possible. If an image can be found with the same **filename as the first word of the link title**, that will be used.

**config/config.json**
```json
{
    "links": [
        ["NextCloud Host", "https://nextcloud.example.com"]
    ]
}
```
This setup will then look for any file that starts with `nextcloud`, case insensitive. For example, `config/nextcloud.png` & `config/NextCloud.SVG` are both valid filenames and will be detected & used

#### Adding a background image
Like above, any image with the name `bg` or `background` (case-insensitive) will be used as background image after building. Valid filenames include `config/background.png`, `config/BG.PNG`, `config/Bg.Jpeg`...

## License
This project is released into the public domain under the [Unlicense](LICENSE). Credit is appreciated, but not required.
