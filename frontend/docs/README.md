# Frontend Documentation

## Overview
This is a modern React/TypeScript application built with Vite. The application serves as a professional business/company website with various features including blog functionality, service showcasing, and interactive components.

## Tech Stack
- **Framework**: React 18.3.1
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Development Tools**: ESLint, PostCSS

## Project Structure
```
frontend/
├── src/
│   ├── api/          # API integration
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── types/        # TypeScript type definitions
│   ├── App.tsx       # Main application component
│   └── main.tsx      # Application entry point
├── public/           # Static assets
└── docs/            # Documentation
```

## Key Components

### Layout Components
- `Navbar`: Main navigation component
- `Footer`: Site-wide footer component

### Page Components
- `Hero`: Landing page main section
- `Features`: Features showcase section
- `Domaines`: Services/domains presentation
- `Blog`: Blog listing and management
- `BlogPost`: Individual blog post display
- `Contact`: Contact form and information
- `WarMap`: Interactive map visualization
- `Team`: Team members showcase
- `Founder`: Founder information section
- `RecentBlogs`: Recent blog posts display

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation
1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:
```bash
npm install
# or
yarn install
```

### Development
Run the development server:
```bash
npm run dev
# or
yarn dev
```

### Building for Production
Build the application:
```bash
npm run build
# or
yarn build
```

### Linting
Run ESLint:
```bash
npm run lint
# or
yarn lint
```

## Scripts
- `dev`: Start development server
- `build`: Build for production
- `lint`: Run ESLint
- `preview`: Preview production build

## Dependencies
### Production Dependencies
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-query`: ^3.39.3
- `react-router-dom`: ^6.28.0
- `axios`: ^1.6.7

### Development Dependencies
- `typescript`: ^5.2.2
- `vite`: ^5.1.6
- `tailwindcss`: ^3.4.15
- `eslint`: ^9.15.0
- And various TypeScript and ESLint plugins

## Contributing
Please follow the existing code style and structure when contributing to the project. Make sure to run linting before submitting any pull requests.
