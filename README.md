# Fortinet SSL VPN Clipboard Bookmarklets

Small bookmarklets that reduce the repetitive clipboard workflow in the Fortinet SSL-VPN web UI.

The generated site publishes two bookmarklets that you can use when you have an active Fortinet SSL-VPN session open in your browser:

- `↑ Send clipboard`: reads text from your local clipboard and sends it to the remote clipboard
- `↓ Get VPN clipboard`: fetches the remote clipboard and copies it back to your local clipboard

## Why this exists

Without automation, moving text through the Fortinet clipboard UI is tedious. The manual process is:

1. Press `F8`
2. Select `Clipboard`
3. Press `Request Remote Clipboard` or paste your copied text
4. Press `Copy to Local Clipboard` or `Copy to Remote Clipboard`
5. Press `Clear`
6. Close the slideover

These bookmarklets automate the repetitive button clicks inside that clipboard panel with one click.

## Project structure

- [build.js](build.js): reads the bookmarklet scripts, extracts display metadata, and renders the site
- [templates/index.ejs](templates/index.ejs): HTML template for the GitHub Pages site
- [scripts/copy_to.js](scripts/copy_to.js): send local clipboard text to the Fortinet page
- [scripts/copy_from.js](scripts/copy_from.js): fetch remote clipboard text from the Fortinet page

Each script starts with a metadata comment in this format:

```js
// name: Short display name | description: Short explanation shown on the website
```

That metadata is used for the generated GitHub Pages UI, but is stripped out of the final bookmarklet code itself.

## Development

Install dependencies:

```bash
npm install
```

Build the site:

```bash
npm run build
```

This regenerates [index.html](index.html) from the template and the scripts.

## Deployment

GitHub Actions deploys the generated site to GitHub Pages on every push to `main` or `master`.

The workflow is defined in [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml).
