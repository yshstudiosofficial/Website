# YSH Studios website

Plain HTML, CSS and JavaScript. No build step.

## Before launch (3 things)
1. **Email:** set `CONFIG.email` in `script.js`. Until then the contact section shows a placeholder and the footer hides the email link.
2. **Form:** create a free form at formspree.io using your email, then paste its ID (the part after `/f/`) into `CONFIG.formspree` in `script.js`. Until then the form shows a "not connected" message. Send a test inquiry once it is set.
3. **Your photo:** save it as `assets/founder.jpg` (portrait, about 4:5). It replaces the placeholder automatically.

Also replace `YOUR-DOMAIN` in the `og:image` tag in `index.html` with your real domain once connected.

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

Changes can take up to 24 hours. Then tick **Enforce HTTPS** in the Pages settings. Records last checked against GitHub's docs on 28 Oct 2026; check docs.github.com if anything differs.

Fonts (Instrument Serif and Inter) load from Google Fonts.

## Replacing the review placeholders
In `index.html`, find the `<figure class="cmt">` block. Change the avatar initials (or swap the `.av` div for an `<img>`), the name and the label, then delete the `.cmt-note` line. The review text itself is the real one you supplied.

## Logo
The nav and footer logos are embedded in `index.html`, so they no longer depend on the `assets/` folder. Keep the whole folder together when uploading anyway.
