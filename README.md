# HarmonyStream Music Web App

A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications. 🚀

## Features

- **React 18**: Improved rendering and concurrent features.
- **Vite**: Lightning-fast build tool and development server.
- **Redux Toolkit**: Simplified state management setup.
- **TailwindCSS**: Utility-first CSS framework with extensive customization.
- **React Router v6**: Declarative routing for React applications.
- **Data Visualization**: Integrated D3.js and Recharts for powerful data visualization.
- **Form Management**: Efficient form handling with React Hook Form.
- **Animation**: Smooth UI animations using Framer Motion.
- **Testing**: Setup with Jest and React Testing Library.

## Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the development server:
   ```bash
   npm start
   or
   yarn start
   ```

3. Project Structure
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration

4. Adding Routes
To add new routes to the application, update the Routes.jsx file:

import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";

5. Styling
This project uses Tailwind CSS for styling, including:

Forms plugin for form styling
Typography plugin for text styling
Aspect ratio plugin for responsive elements
Container queries for component-specific responsive design
Fluid typography for responsive text
Animation utilities

6. Responsive Design
The app is built with responsive design using Tailwind CSS breakpoints.

7. Deployment
To build the application for production:

   ```bash
   npm run build
   ```

8. Acknowledgments
Built with Rocket.new
Powered by React and Vite
Styled with Tailwind CSS
Built with ❤️ on Rocket.new

@Copyrights Lazarus Rolando - 2025
