# miracetimusic.com

Static website for Mira Ceti, hosted on GitHub Pages.

## Preview locally
    python3 -m http.server 8000
then open http://localhost:8000

## Publish
    git add -A && git commit -m "Update site" && git push

## Where to edit
- Pages: `index.html`, `music.html`, `concerts.html`, `about.html`, `contact.html`
- Colors & fonts: top of `css/style.css` (`:root`)
- Images: put them in `images_processed/`
- The menu and footer are repeated in each page: update all 5 when you change them.
