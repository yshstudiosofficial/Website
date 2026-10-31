# YSH Studios website

Plain HTML, CSS and JavaScript. No build step.

## Before launch
1. **Your photo:** save it as `assets/founder.jpg` (portrait, about 4:5). It replaces the loading animation automatically.
2. **Social preview:** replace `YOUR-DOMAIN` in the `og:image` tag in `index.html` with your real domain once connected.
3. **Review placeholders:** in `index.html`, find `<figure class="cmt">`. Change the avatar initials, name and label, then delete the `.cmt-note` line.

Contact email is set in `script.js` (`CONFIG.email`). The inquiry form was removed; the contact section shows email and Telegram. Service buttons open an email with the service in the subject.

## Publish on GitHub Pages
1. Create a GitHub repository and upload everything in this folder to the root.
2. Repository **Settings > Pages**: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Under **Custom domain**, enter your domain and save. Add the domain here before changing DNS.

## Connect your GoDaddy domain
In GoDaddy: **My Products > your domain > DNS**. Remove any default parked or "forwarding" A record, then add:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<your-github-username>.github.io` |

Changes can take up to 24 hours. Then tick **Enforce HTTPS** in the Pages settings. Check docs.github.com if anything differs.

Note: a domain does not include email by itself. support@yshstudios.com needs a mailbox or forwarding set up with your email provider.

Fonts (Instrument Serif and Inter) load from Google Fonts.
