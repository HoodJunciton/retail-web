# Retailer Web

A comprehensive retail management solution built with Next.js, Redux, and Material UI.

## Features

- Modern UI with Material UI components
- State management with Redux Toolkit
- Dark mode toggle
- Responsive design with Tailwind CSS
- Type safety with TypeScript

## Project Structure

```
retailer-web/
├── app/                  # Next.js app directory
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page component
├── components/           # Reusable components
│   └── layouts/          # Layout components
│       └── MainLayout.tsx # Main application layout
├── store/                # Redux store
│   ├── index.ts          # Store configuration
│   └── slices/           # Redux slices
│       └── uiSlice.ts    # UI state slice
```

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Technologies Used

- Next.js - React framework
- Redux Toolkit - State management
- Material UI - Component library
- Tailwind CSS - Utility-first CSS framework
- TypeScript - Type checking
- Husky - Git hooks
