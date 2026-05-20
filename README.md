# Portfolio Website

An interactive, game-like personal portfolio website served with Node.js and Express. Instead of a traditional webpage, visitors explore a 3D environment featuring interactive buildings, a day/night cycle, ambient nature sounds, animated animals, and a character messenger for sending contact emails — all designed to make a CV feel like an experience.

---

## Features

- **2D Interactive Environment** — Navigate with mouse clicks.
- **Interactive Buildings** — Each building represents a section of the CV (projects, hobbies, skills, etc.) with headings displayed on top
- **Day/Night Cycle** — Toggleable light and dark mode with a visual day/evening cycle
- **Character Messenger** — A highlighted player character acts as a contact form; clicking it sends an email
- **Ambient Nature Music** — Soothing background audio to set the mood
- **Animated Animals** — Cattle and clickable birds that double as contact triggers
- **First-Visit Onboarding** — New visitors are welcomed with instructions on how to navigate; returning visitors get a reminder
- **Mobile Support** — Centered main player, drag-camera instructions, and a hamburger-style nav menu for small screens
- **Contact API** — Form submission with a response popup on success

---

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Runtime    | Node.js                 |
| Server     | Express.js v5           |
| Frontend   | JavaScript (vanilla)    |
| Styling    | CSS                     |
| Package Mgr| npm                     |

---

## Project Structure

```
portfolio/
├── app/                    # Frontend source (views, assets, client JS)
├── index.js                # Express server entry point
├── package.json            # Dependencies and scripts
├── package-lock.json
├── .gitignore
└── notes                   # Development notes and planned features
```

> The `app/` directory contains the client-side code — HTML, CSS, and JavaScript that power the 3D interactive scene.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/krispymango/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node index.js
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```
   *(Port may vary — check `index.js` for the configured port.)*

---

## Scripts

| Command                  | Description                                          |
|--------------------------|------------------------------------------------------|
| `node index.js`          | Start the Express server                             |
| `npm run auto:git`       | Stage, commit with message "new change", and push to `main` |

---

## How It Works

- `index.js` is the Express server entry point. It serves the static frontend from the `app/` directory and handles any backend API routes (e.g. the contact form email submission).
- The frontend renders a navigable 2D scene using JavaScript. Visitors can drag the camera around to explore different "buildings," each of which maps to a section of the owner's CV.
- The day/night toggle switches the scene's lighting and color palette between a daytime and evening theme.
- On first visit (detected via `localStorage` or `sessionStorage`), an onboarding sequence introduces the visitor and explains how to interact. Returning visitors receive a shorter welcome-back message.
- The character messenger opens a contact form overlay when clicked. On submission, it calls the backend contact API and displays a response popup.
- Mobile visitors see a simplified layout: the camera is centered on the main character, with a menu button providing navigation links.

---

## Roadmap / Planned Features

See the `notes` file for a full list. Highlights include:

- Pointer cursor styling (pencil/crosshair icon)
- Additional clickable birds as secondary contact triggers
- Further mobile UI polish
- Expanded projects and hobbies sections

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## License

This project is licensed under the ISC License.
