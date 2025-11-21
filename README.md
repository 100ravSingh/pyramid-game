# 🎮 Pyramid Riddle Game

A fully interactive, team-based riddle-solving game built using **React**, featuring a **layer-wise pyramid**, **randomized riddles**, **persistent scoring**, responsive UI, and custom block colors.

Designed & developed by **Sourav Singh**.

---

## 🚀 Live Demo

Game link:

```
https://100ravSingh.github.io/pyramid-game
```
---

## 🧠 Game Overview

The Pyramid Riddle Game is designed for **two teams** who compete by answering riddles hidden in pyramid blocks. Each layer of the pyramid increases in difficulty, and each block contains:

* A **random number** (01–99)
* A **unique riddle**
* **Points based on difficulty**
* **Color-coded result**

  * 🔵 Team A
  * 🌸 Team B
  * 🔴 Wrong answer

Once a block is used, it becomes locked.

The entire pyramid and scoring system is **saved in localStorage**, so reloading the page does **not reset your progress**.

---

## ✨ Key Features

### 🔶 Pyramid Mechanics

* 7 layers
* Block distribution: **25 → 20 → 15 → 10 → 5 → 2 → 1**
* Auto-centered pyramid
* Fully responsive on all screens
* Gradient colors based on difficulty layer

### 🔶 Riddles

* 78+ riddles divided by:

  * Easy
  * Medium
  * Hard
* No repetition (random non-repeating selection)
* Layer-based difficulty

### 🔵 Team System

* Two teams (Team A & Team B)
* Switch active team
* Add points on correct answer
* Color-coded block marking
* Full game progress saved across refresh

### ⚡ Persistent Storage

* Team scores
* Used blocks
* Block colors
* Riddle selections
  → All saved in **localStorage**

### 🧰 Admin Controls

* Reset Scores
* Reset Blocks
* Reset Entire Game

### 🎨 Modern UI

* Smooth animations
* Modal with pop animation
* Clean dark theme
* Responsive layout
* Glow highlight on active team

---

## 📁 Folder Structure

```
src/
 ├── App.jsx
 ├── App.css
 ├── riddleLayers.js
 ├── pyramidConfig.js
 ├── components/
 │    ├── Block.jsx
 │    ├── Pyramid.jsx
 │    ├── Pyramid.css
 │    ├── Scoreboard.jsx
 │    ├── RiddleModal.jsx
 │    ├── Footer.jsx
 ├── index.jsx
 └── assets/ (optional)
```

---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/your-repo.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

### 4. Build

```bash
npm run build
```

---

## 🌐 Deploy on GitHub Pages

### 1. Install gh-pages

```bash
npm install gh-pages --save-dev
```

### 2. Add these to `package.json`

```json
"homepage": "https://<username>.github.io/<repo-name>/",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### 3. Deploy

```bash
npm run deploy
```

---

## 🧩 Configuration File Details

### pyramidConfig.js

Defines:

* Block counts per layer
* Points per layer
* Layer colors

### riddleLayers.js

Contains **layer-wise riddles** (used randomly once per block).

---

## 🤝 Contributing

Feel free to fork, submit issues, or add new riddles, new themes, or new game modes!

---

## 📝 License

MIT License — free to modify & use.

---

## 👨‍💻 Author

**Sourav Singh**
GitHub: [https://github.com/100ravSingh](https://github.com/100ravSingh)

---

If you want, I can also generate:

✔ Project Logo
✔ Badges (build passing, stars, etc.)
✔ GIF demo preview
✔ Dark/Light theme toggle
✔ Multi-player mode


