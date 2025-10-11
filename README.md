# React

A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 📁 Project Structure

```
react_app/
├── functions/
│   ├── .env
│   ├── db.js
│   ├── package.json
│   ├── resetPassword.js
│   ├── sendOtp.js
│   ├── verifyOtp.js
├── public/             # Static assets
│   ├── assets
│   ├───── images
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
├── src/
│   ├── assets/
│   ├── components/     # Reusable UI components
│   ├───── ui/
│   ├──────── Button.jsx
│   ├──────── card.tsx
│   ├──────── Checkbox.jsx
│   ├──────── Header.jsx
│   ├──────── Input.jsx
│   ├──────── Select.jsx
│   ├───── AppIcon.jsx
│   ├───── AppImage.jsx
│   ├───── ErrorBoundary.jsx
│   ├───── RequireAuth.jsx
│   ├───── ScrollToTop.jsx
│   ├── context/
│   ├───── AuthContext.jsx
│   ├── lib/
│   ├───── utils.ts
│   ├── pages/          # Page components
│   ├───── admin-recipe-management/
│   ├───── ai-suggestions #chatbot
│   ├───── dashboard
│   ├───── farmer-dasboard
│   ├───── ingredient-marketplace
│   ├───── recipe-detail-instructions
│   ├───── resipe-discovery-dashboard
│   ├───── recipe-submission-management
│   ├───── sign-in
│   ├───── user-profile-health-goals
│   ├───── NotFound.jsx
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── utils/
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
│   ├── supabaseClient.js
├── .env                # Environment variables
├── .gitignore
├── favicon.ico
├── index.html          # HTML template
├── jsconfig.json
├── package.json        # Project dependencies and scripts
├── postcss.config.js
├── README.md
├── tailwind.config.js  # Tailwind CSS configuration
├── vercel.json
├── vite.config.mjs      # Vite configuration
└── vite-env.d.ts
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 📦 Deployment

Build the application for production:

```bash
npm run build
```

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by React and Vite
- Styled with Tailwind CSS

Built with ❤️ on Rocket.new
