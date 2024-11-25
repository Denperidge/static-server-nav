# Static Server Nav
Don't wanna have to type in all your subdomains all the time? Want to have your server just give a quick navigation of whatever you've got going, without putting too much processing power into it? Same!

## Adding images
While peculiar, this mechanic has been made to decrease setup time as much as possible. If an image can be found with the same filename as the first word of the link, that will be used.

**config/links.json**
```json
[
    ["Nextcloud Host", "https://nextcloud.example.com"]
]
```
This setup will then look for any file that starts with `nextcloud`, case insensitive. E.g. `config/nextcloud.png`, `config/NextCloud.SVG` are all valid filenames and will be detected

