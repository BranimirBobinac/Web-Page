# Algebra – SUPIT Project

A static, multi-page website for **Algebra University** (Sveučilište Algebra), built as a project for the *Standards in Applying Internet Technologies* (SUPIT) course. The site is in Croatian. It has a home page, an "About us" page and news articles. It also has a contact form, user registration and login, and a **curriculum planner** that only logged-in users can open.

## Features

- **Home page**: full-screen background video with an animated typewriter slogan.
- **About us (O nama)**: values, history timeline, partner certifications and directions with an embedded Google Map. A side navigation panel opens when the mouse reaches the left edge of the screen.
- **News (Novosti)**: a news overview with three article pages. One article has an image gallery (Fancybox lightbox) and a video.
- **Contact form**: a modal dialog (jQuery UI) on every page that sends the message to the course's contact form endpoint.
- **Registration and login**: uses the course REST API. The JWT token is kept in `sessionStorage` and is cleared when it expires or when you log out.
- **Curriculum planner (Nastavni plan)**: only for logged-in users. Type to search courses with autocomplete, add them to a table and see the totals for ECTS, hours, lectures and exercises update automatically. You can remove courses from the table.
- **Responsive layout**: on small screens the navigation turns into a hamburger menu.
- **Animations**: scroll animations with AOS and entrance animations with Animate.css.

## Technologies

| Technology | Purpose |
|---|---|
| HTML5 / CSS3 | Page structure and custom styling (`styles.css`) |
| JavaScript (ES6+) | Application logic (`js/`) |
| [jQuery 3.6](https://jquery.com/) | DOM manipulation and events |
| [jQuery UI 1.12](https://jqueryui.com/) | Contact and notification dialogs |
| [Bootstrap 5.3](https://getbootstrap.com/) | Layout grid and utility classes |
| [AOS 2.3](https://michalsnik.github.io/aos/) | Animate-on-scroll effects |
| [Animate.css 4.1](https://animate.style/) | CSS entrance animations |
| [Typewriter Effect](https://github.com/tameemsafi/typewriterjs) | Typewriter slogan on the home page |
| [Fancybox 5](https://fancyapps.com/fancybox/) | Image gallery lightbox |
| [Google Material Symbols](https://fonts.google.com/icons) | Icons |
| Fetch API + JWT | Communication with the backend REST API |

All libraries are loaded from public CDNs, so there is no build step and nothing to install.

### Backend API

The site uses an external API provided for the course:

| Endpoint | Method | Description |
|---|---|---|
| `https://www.fulek.com/data/api/user/register` | POST | Register a new user (`{ username, password }`) |
| `https://www.fulek.com/data/api/user/login` | POST | Log in. Returns a JWT token |
| `https://www.fulek.com/data/api/supit/curriculum-list/hr` | GET | Curriculum list (needs `Authorization: Bearer <token>`) |
| `https://www.fulek.com/mvc/supit/project-contact-form` | POST | Contact form submission |

## Project structure

```
├── index.html            # Home page
├── Onama.html            # About us
├── Novosti.html          # News overview
├── Novost1.html          # News article 1 (gallery + video)
├── Novost2.html          # News article 2
├── Novost3.html          # News article 3
├── NastavniPlan.html     # Curriculum planner (login required)
├── Prijava.html          # Login
├── Registracija.html     # Registration
├── styles.css            # Custom styles
├── js/
│   ├── token.js          # JWT handling, logged-in navigation, logout
│   ├── navbar.js         # Mobile menu toggle, active link highlight
│   ├── kontakt.js        # Contact form dialog
│   ├── pocetna.js        # Home page typewriter animation
│   ├── sidenav.js        # Side navigation on the About page
│   ├── prijava.js        # Login logic
│   ├── registracija.js   # Registration logic
│   └── nastavniPlan.js   # Curriculum search, table and totals
├── img/                  # Images
└── vid/                  # Videos
```

## Getting started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge or Safari)
- An internet connection (libraries load from CDNs and the API is remote)

### Run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/<BranimirBobinac>/<Web-Page>.git
   cd <Web-Page>
   ```
2. Serve the folder with any static web server. A local server is better than opening the file directly, because some browsers restrict `fetch` and `sessionStorage` on `file://` URLs. Pick one:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx serve .
   ```
   You can also use the **Live Server** extension in VS Code. Right-click `index.html` and choose *Open with Live Server*.
3. Open `http://localhost:8000` in your browser.

### Deploy to GitHub Pages

1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under *Source*, choose **Deploy from a branch**. Select the `main` branch and the `/ (root)` folder.
4. The site will be available at `https://<BranimirBobinac>.github.io/<Web-Page>/`.

## Usage

1. Open **Prijava → Registrirajte se** to create an account, then log in.
2. After you log in, a **Nastavni plan** link appears in the navigation.
3. On the curriculum page, type part of a course name, pick it from the suggestions and it is added to the table with the totals. Click **Obriši** to remove a course.
4. Click **Odjava** to log out.

## Author

**Branimir Bobinac** – Algebra University
