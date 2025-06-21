# 🚀 Foodify Restaurant Manager Frontend

A modern, performant restaurant management frontend built using **React**, **TypeScript**, **Redux Toolkit**, **GSAP**, and **Tailwind CSS**. This project is the interface for restaurant managers to register, manage orders, chat with bots, and more — all powered by WebSocket and RESTful APIs.

---

## 📁 Project Structure

frontend-rm/
├── public/ # Static assets
├── src/
│ ├── api/ # Axios instances and API helpers
│ ├── assets/ # Images, icons, SVGs
│ ├── components/ # Reusable UI components
│ ├── context/ # Context providers
│ ├── data/ # Static/fake data
│ ├── features/ # Feature modules (auth, chat, orders, etc.)
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Top-level pages
│ ├── redux/ # Redux slices, store config
│ ├── routes/ # React Router configs
│ ├── types/ # TypeScript type declarations
│ ├── utils/ # Utility functions
│ ├── App.tsx # Main app component
│ ├── main.tsx # App entry point
├── eslint.config.js
├── tailwind.config.js
├── vite.config.ts
├── tsconfig*.json
├── package.json
└── README.md

yaml
Copy
Edit

---

## 🧰 Tech Stack

| Technology        | Purpose                                      |
|-------------------|----------------------------------------------|
| React + TypeScript | UI + Type safety                             |
| Vite              | Fast bundler and dev server                  |
| Tailwind CSS      | Utility-first styling                        |
| Redux Toolkit     | State management                             |
| React Router DOM  | Page routing                                 |
| Axios             | HTTP client for API calls                    |
| GSAP              | Animations for UI interactions               |
| WebSockets        | Real-time order updates                      |
| ESLint + Prettier | Code linting and formatting                  |

---

## 🌐 Features

- 🔐 **Auth Flow** (Login, Register with OTP)
- 🧾 **Order Placement & Success Page**
- 💬 **Chat Widget with GSAP animation**
- 📦 **Real-time order updates via WebSocket**
- 🎨 **Smooth transitions using GSAP**
- 📱 **Responsive UI with Tailwind CSS**

---
