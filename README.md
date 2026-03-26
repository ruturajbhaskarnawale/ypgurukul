# YP Gurukul - Educational Platform

Welcome to the **YP Gurukul** repository! This is a state-of-the-art, immersive educational platform designed to provide a premium and engaging experience for students. Built with a focus on modern aesthetics, 3D interactive elements, and robust functionality, the platform serves as a central hub for learning, test series, and comprehensive educational resources.
---

## ✨ Key Features

- **Immersive 3D Environments:** Discover "The Nexus of Excellence," a flight-through-knowledge-experience built with WebGL and React Three Fiber, providing a visually stunning landing page.
- **Dynamic Interactions:** High-quality, editorial-style animations, smooth scroll-triggered reveals, and subtle hover-zoom effects powered by modern animation libraries.
- **Interactive 3D Carousels:** Engaging and interactive course and feature presentation using robust 3D card carousels.
- **Comprehensive Test Series & Courses:** Detailed previews, test taking interfaces, and course structures tailored for student success.
- **Faculty Showcases:** Premium layouts to highlight the experienced faculty behind the platform.
- **Secure Admin Panel:** Dedicated interfaces and secure workflows for administrators to manage content, users, and platform data.
- **Fully Responsive & Optimized:** Ensuring a seamless experience across all devices, from desktop environments to mobile web browsers.

---

## 🛠️ Technology Stack

The platform leverages a modern, robust, and scalable tech stack:

- **Frontend Framework:** [Next.js](https://nextjs.org/) (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS for fast, utility-first, and highly customizable UI design.
- **3D & Graphics:** `@react-three/fiber` and `@react-three/drei` for rendering performant 3D scenes directly in the browser.
- **Animations:** Framer Motion (or equivalent) for complex, layout-driven, and scroll-based animations.
- **Package Management:** npm ecosystem

---

## 📂 Project Structure

A brief overview of the core application structure:

```text
frontend/
├── src/
│   ├── app/                 # Next.js App Router (Pages, Layouts, API routes)
│   │   ├── contact/         # Contact forms and details
│   │   ├── admin/           # Admin dashboard and authentication
│   │   └── ...
│   ├── components/          # Reusable UI components
│   │   ├── home/            # Homepage specific components (Hero, FoundationScene, etc.)
│   │   ├── admin/           # Admin-specific components
│   │   └── shared/          # Buttons, Inputs, Navbars, etc.
│   ├── lib/                 # Utility functions, helpers, and configurations
│   ├── styles/              # Global CSS and Tailwind directives
│   └── types/               # TypeScript interface and type definitions
├── public/                  # Static assets (images, 3D models, fonts)
├── package.json             # Project dependencies and scripts
└── tailwind.config.ts       # Tailwind CSS configuration
```

---

## � Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites


- **Node.js**: Ensure you have Node.js (v18 or higher recommended) installed.
- **npm**: The default package manager for Node.js.

### Installation

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   Execute the following command to download and install all required packages:

   ```bash
   npm install
   ```

### Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000). You can now open your browser and interact with the platform.

---

## 🤝 Contributing

When contributing to this project, please adhere to the following guidelines:
- Ensure 3D components are dynamically imported and optimized to avoid client-side load errors (e.g., handling `ChunkLoadError`).
- Maintain the premium design aesthetic using the predefined Tailwind configurations.
- Verify responsiveness across various viewport sizes (mobile, tablet, desktop) before submitting any UI changes.
- Ensure all new components are strictly typed using TypeScript.

## admin credentials

- Admin email: admin@ypgurukul.com
Admin password (seeded): password123
