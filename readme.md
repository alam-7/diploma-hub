<div align="center">

# 🎓 DIPLOMA HUB

**Understand Engineering. Learn Practically. Build the Future.**

A modern, free, offline-first learning platform for **MSBTE Diploma Engineering** students — notes, books, question papers, practicals, quizzes, and lab equipment reference for every branch and semester.

[![Live Site](https://img.shields.io/badge/Live-alam--7.github.io%2Fdiploma--hub-00d4ff?style=for-the-badge&logo=github)](https://alam-7.github.io/diploma-hub/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Ready-a855f7?style=for-the-badge)](https://alam-7.github.io/diploma-hub/)
[![Made with](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-f43f5e?style=for-the-badge)](https://github.com/alam-7/diploma-hub)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [PWA Installation](#-pwa-installation)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [FAQ](#-faq)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 📚 About

**DiplomaHub** is a free, open-source learning platform built specifically for **MSBTE (Maharashtra State Board of Technical Education)** Diploma Engineering students. It brings together everything a student needs — curriculum, notes, books, previous papers, practicals, MCQs, and equipment reference — in one fast, offline-capable, ad-free app.

### Why DiplomaHub?

- 🎯 **Built for MSBTE** — follows the official **K-Scheme** curriculum
- 💯 **Free forever** — no paywalls, no ads, no tracking
- 📱 **Works offline** — install as an app, study anywhere
- ⚡ **Fast** — loads in under 2 seconds, even on slow networks
- 🔐 **Privacy-first** — all progress stays on your device
- 🌓 **Dark mode** — easy on the eyes during night study

---

## ✨ Features

### 📘 Learning Content
- ✅ All 5 major branches — Computer, Mechanical, Civil, Electrical, E&TC
- ✅ All 6 semesters per branch
- ✅ 145+ subjects with full syllabus
- ✅ Unit-wise weightage for every subject
- ✅ Rich course data (notes, books, papers, questions, answers, practicals, quizzes)

### 📖 Study Resources
- 📝 **Notes** — unit-wise PDF notes with preview modal
- 📕 **Books** — textbooks and reference books with metadata
- 📋 **Papers** — Winter & Summer previous year papers (solved/unsolved)
- ✍️ **Important Questions** — with marks, difficulty, and answers
- ✅ **Solutions** — step-by-step answers
- 🧪 **Practicals** — aim, apparatus, procedure, result, precautions
- ❓ **MCQ Quizzes** — timed, instant scoring, review, best-score tracking
- 🔧 **Equipment Library** — 200+ lab equipment with specs

### 🤖 Smart Tools
- 🔍 **Global search** — search across everything instantly
- 🧠 **AI Assistant** — ask questions, get answers from local data
- 📊 **Personal dashboard** — track progress, streaks, XP, and bookmarks
- 🏆 **Leaderboard** — compare quiz scores with others
- 🎓 **Study progress** — mark units complete, resume where you left off

### 🛡 Admin Panel
- 👥 User management (verify, block, promote)
- 🔧 Equipment management (add, edit, verify)
- 📋 Verification queue for user-submitted content
- 📊 Analytics and stats

### 💻 Technical
- 🌐 **PWA** — installable on Android, iOS, and desktop
- 📴 **Offline-first** — service worker caches everything
- 🔒 **Secure auth** — Supabase + JWT with RLS
- 📱 **Fully responsive** — mobile, tablet, desktop
- ♿ **Accessible** — keyboard navigation, ARIA labels
- 🌙 **Dark mode** — default; light mode toggle
- 🚀 **No build step** — pure HTML, CSS, JS
- 🎨 **Modern UI** — glassmorphism, gradients, smooth animations

---

## 🌐 Live Demo

**Visit:** [https://alam-7.github.io/diploma-hub/](https://alam-7.github.io/diploma-hub/)

> 💡 **Tip:** Install as an app from your browser menu → "Add to Home Screen"

---

## 🛠 Tech Stack

### Frontend
| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | Custom CSS3 (glassmorphism, CSS variables) |
| Scripting | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6.5 |
| Fonts | Inter (Google Fonts) |
| PWA | Manifest + Service Worker |
| Hosting | GitHub Pages |

### Backend (optional)
| Layer | Technology |
|-------|------------|
| Runtime | Node.js 18+ |
| Server | Express 4 |
| Auth | Supabase Auth (JWT) |
| Database | Supabase (PostgreSQL) |
| Rate limiting | express-rate-limit |
| Deployment | Railway / Render / Vercel |

### Data
| Layer | Location |
|-------|----------|
| Course data | `js/msbte-k-scheme-data.js` |
| Equipment data | `js/equipment-data.js` |
| User progress | `localStorage` + Supabase |
| Sessions | `localStorage` + `sessionStorage` |

---

## 📁 Project Structure
