## 🛠 Project Details

- **Project Name:** Skill Sphere
- **Purpose:** A Next.js-based web application for a skill learning platform, allowing users to browse, view, and manage courses. It facilitates online education through user profiles and structured course listings.
- **Live URL:** `http://b13-a8.vercel.app`

---

## ✨ Key Features

- **User Authentication & Authorization:** Secure login/registration using **Better Auth** with MongoDB adapter. Supports sessions and user profiles.
- **Course Discovery:** Homepage with banners, popular courses, and trending sections.
- **Dynamic Course Pages:** Individual course details via dynamic routes (e.g., `/all-courses/[id]`) using `CourseCard` components.
- **Responsive UI:** Built with **HeroUI**, **DaisyUI**, and **Tailwind CSS** for a modern, mobile-friendly design.
- **Data Management:** Efficient data fetching from `data.json` and MongoDB integration for user-specific data.
- **Interactive Elements:** Smooth animations with **Framer Motion**, icons via **React Icons**, and notifications using **React Toastify**.
- **UX Optimization:** Custom loading states and error-handling (not-found) pages.

---

## 📦 NPM Packages Used

### Dependencies

`@better-auth/mongo-adapter`, `@gravity-ui/icons`, `@heroui/react`, `@heroui/styles`, `better-auth`, `framer-motion`, `mongodb`, `next`, `react`, `react-dom`, `react-icons`, `react-toastify`.

### DevDependencies

`@tailwindcss/postcss`, `daisyui`, `eslint`, `eslint-config-next`, `tailwindcss`.

---

## 🏗 Tech Stack

- **Framework:** Next.js 16.2.4
- **Library:** React 19.2.4
- **Styling:** Tailwind CSS & PostCSS
- **Database:** MongoDB

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
```
