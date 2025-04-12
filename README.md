# 🪙 My Crypto Dashboard

A performant and responsive **crypto market dashboard** built with **React**, **TypeScript**, and **Vite**. This project features live coin data, charts, infinite scroll, and a clean atomic design structure — optimized for scalability and developer experience.

---

## 🚀 Tech Stack

- **React 18** + **TypeScript** – Modern frontend architecture
- **Vite** – Lightning-fast development experience with HMR
- **MUI (Material UI)** – UI components with theme customization
- **React Query (TanStack Query)** – Data fetching, caching, and state management
- **Error Boundary** – Handles rendering errors gracefully
- **ApexCharts / Recharts** – Advanced charting solutions
- **React Router DOM v7** – Routing and navigation
- **Tailwind CSS** – Utility-first responsive styling
- **ESLint + Prettier** – Code linting and formatting

---

## 📁 Project Structure

Following **Feature-Based** principles:

📦 Feature-Based Organization

The codebase is organized by domain features rather than file types. Each feature folder contains all related components, hooks, and logic, making the project more modular, scalable, and easier to maintain.

````
```
/src/
├── components/             // Global reusable UI components (e.g., Button, Text, Loader)
├── features/
│   ├── market/             // Market-related components, tables, charts
│   ├── coin-details/       // Coin detail page, chart logic,
```
````

## 📈 Features

✅ Live crypto market data

✅ Candlestick & line chart support

✅ Responsive & mobile-friendly layout

✅ Custom chart toggle switch with animated icons

✅ Styled using both Tailwind and MUI

✅ Infinite scroll for coin listings

✅ Lazy loaded components for performance optimization

## 🧯 Error Handling

The app includes a custom Error Boundary wrapper for catching unexpected rendering errors and providing fallback UIs without crashing the whole app.

## 🛠️ Getting Started:

# Install dependencies

npm install

# Run dev server

npm run dev

# Lint your code

npm run lint

# Build for production

npm run build

## Feature 🧹 To-do:

1- Unit testing for components
