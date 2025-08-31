# FAYKAR App

A modern product-sharing platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern Dashboard**: Clean, responsive design with a three-column layout
- **Component-Based Architecture**: Modular components for easy maintenance
- **Responsive Design**: Built with Tailwind CSS for consistent styling
- **TypeScript**: Full type safety throughout the application

## Dashboard Components

The dashboard is built with the following components:

### 1. Header Component (`src/customComp/Header.tsx`)
- FAYKAR logo with green branding
- Navigation icons (search, chat, add, profile, etc.)
- Active home tab indicator
- User profile picture

### 2. Left Sidebar (`src/customComp/LeftSidebar.tsx`)
- User profile section (Virat Kohli)
- Search bar with filter options
- Navigation menu (Home, Notifications, Messages, Friends, Languages)
- Help sections (About, Faykar Help)

### 3. Main Content (`src/customComp/MainContent.tsx`)
- Product sharing input field
- Product stories carousel (Abdul, Meru, Chandra, Namaha, Raamaya)
- Sponsored post with interaction buttons
- Product details and pricing

### 4. Right Sidebar (`src/customComp/RightSidebar.tsx`)
- Latest post information
- Advertisement section (50% off clothing)
- Recent activity feed with user avatars and timestamps

## Project Structure

```
src/
├── app/
│   └── (main)/
│       └── dashboard/
│           └── page.tsx          # Main dashboard page
├── customComp/                   # Custom components
│   ├── Header.tsx               # Top navigation
│   ├── LeftSidebar.tsx          # Left navigation panel
│   ├── MainContent.tsx          # Central content area
│   ├── RightSidebar.tsx         # Right information panel
│   └── index.ts                 # Component exports
└── ...
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) in your browser

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React 19**: Latest React features

## Design Features

- **Color Scheme**: Green (#10B981) as primary brand color
- **Layout**: Three-column responsive design
- **Typography**: Clean, readable fonts with proper hierarchy
- **Icons**: SVG icons for consistent visual language
- **Spacing**: Consistent spacing using Tailwind's spacing scale

## Component Architecture

Each component is designed to be:
- **Reusable**: Can be used in different parts of the application
- **Maintainable**: Clear separation of concerns
- **Responsive**: Works on different screen sizes
- **Accessible**: Proper semantic HTML and ARIA labels

## Future Enhancements

- Add dark mode support
- Implement real-time notifications
- Add product image upload functionality
- Integrate with backend APIs
- Add user authentication
- Implement product search and filtering
