# 🕋 Oman Prayer Times & Azkar App

A modern, responsive, and lightweight web application built with **React** and **Vite** that provides accurate Islamic prayer timings across all governorates in the Sultanate of Oman, along with an elegant pop-up for authenticated post-prayer Azkar.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361dafb)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

---

## 🌟 Key Features

*   **🌍 Live Geolocation Support:** Automatically detects the user's current location via browser coordinates to fetch highly accurate local prayer times.
*   **🏙️ Multi-Governorate Coverage:** Includes a comprehensive pre-defined list covering all 11 governorates of Oman as a seamless fallback or manual choice.
*   **⏳ Real-time Countdown Timer:** A dynamic countdown clock ticking second-by-second showing the exact remaining time for the next upcoming prayer.
*   **📿 Authenticated Post-Prayer Azkar:** An interactive Modal displaying fully verified, 100% accurate Arabic Azkar with their official Islamic English translations.
*   **🌐 Full Dynamic Localization (Bi-lingual):** Complete support for English and Arabic. When switching to Arabic, the app dynamically converts Gregorian/Hijri months and countdown digits into Eastern Arabic numerals (`٠١٢٣`).
*   **🌗 Automatic Smart Theming:** Detects the current time of day to switch between a bright day theme and a relaxed dark night theme automatically.

---

## 🛠️ Tech Stack & Architecture

*   **Frontend Library:** React (Functional Components & Hooks: `useState`, `useEffect`).
*   **Build Tool:** Vite (Optimized for lightning-fast bundling and HMR).
*   **API Integration:** RESTful API consumption using asynchronous `fetch/await` architecture connected to the trusted *Aladhan API*.
*   **Deployment:** Securely hosted via GitHub Pages using modern static routing configurations (`vite.config.js` base paths).

---

## 🚀 How to Run Locally

Follow these simple steps to set up the project on your machine:

1. **Clone the repository:**
   git clone [https://github.com/maatheralsinani/oman-prayer-times.git](https://github.com/maatheralsinani/oman-prayer-times.git)

---

1. **Navigate into the project directory:**
      cd oman-prayer-times


2. **Install dependencies:**
      npm install


3. **Start the local development server:**
      npm run dev


4. **Build for production:**
      npm run build

---

**🛡️ Clean Code & Optimization Highlights**
Event Propagation Control: Handled dynamic UX overlays gracefully by stopping synthetic event bubbling (e.stopPropagation()) on modal content interactions.

Performance Optimization: Avoided memory leaks by ensuring asynchronous cleanups inside intervals (clearInterval) within React lifecycles.

Zero Server Vulnerabilities: Designed with a pure serverless Jamstack approach, displaying raw static views without database vectors to guarantee 100% client safety.