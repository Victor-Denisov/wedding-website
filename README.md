# Tiffany & Victor — Wedding Website

A modern, minimal wedding website. Built with plain HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies.

## Pages

- **Our Story** — Hero section with names + date, and a relationship timeline
- **Details** — Ceremony time, venue, accommodations, dress code, dining, registry
- **RSVP** — Working form (wire to your backend of choice)
- **Travel** — Getting there by air, train, car, and shuttle
- **Registry** — Gift registry links
- **Gallery** — Photo grid (add your own images)

## Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/wedding-site.git
   cd wedding-site
   ```

2. **Add your photos** — drop images into the `/images` folder:
   - `hero.jpg` — couple photo for the hero section
   - `story.jpg` — second photo for the story section
   - `gallery-1.jpg` through `gallery-5.jpg` — gallery images

3. **Customize content** — edit `index.html`:
   - Names, date, venue, and times
   - RSVP deadline and email address
   - Registry links
   - Accommodation details

4. **Open locally** — just open `index.html` in any browser. No server needed.

## Hosting on GitHub Pages

1. Push your code to a GitHub repository

2. Go to **Settings → Pages**

3. Under "Source", select **Deploy from a branch**

4. Choose **main** branch and **/ (root)** folder, then click Save

5. Your site will be live at:
   ```
   https://yourusername.github.io/wedding-site
   ```
   (or your custom domain if configured)

6. **Custom domain** (optional): Add a `CNAME` file to the root with your domain name on one line, then configure your DNS provider to point to GitHub Pages.

## Wiring up the RSVP form

The form is client-side only. Choose one of these free options to collect responses:

### Formspree (easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your endpoint ID
3. In `js/main.js`, replace the TODO comment with:
   ```js
   await fetch('https://formspree.io/f/YOUR_ID', {
     method: 'POST',
     body: JSON.stringify(data),
     headers: { 'Content-Type': 'application/json' }
   });
   ```

### Netlify Forms (if deploying to Netlify)
1. Add `data-netlify="true"` to the `<form>` tag in `index.html`
2. Deploy to Netlify — responses appear in your Netlify dashboard

### EmailJS
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Add their SDK and call `emailjs.send()` in the form handler

## File Structure

```
wedding-site/
├── index.html          # All pages (single HTML file)
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Navigation + form logic
├── images/             # Your photos go here
│   └── .gitkeep
└── README.md
```

## Customising

All colours are CSS variables at the top of `style.css` — change the palette there and it propagates everywhere. Fonts are loaded from Google Fonts; swap them in the `<link>` tag in `index.html` and update the font variables in CSS.
