# Portfolio Website - William

## Overview

This is a modern portfolio website for William, a frontend web developer based in London. The application showcases services, portfolio work, testimonials, and includes a contact form. Built with React, Express, and TypeScript, it follows a clean, professional design aesthetic with a vibrant pink/magenta accent color (#FF1493) and emphasizes visual hierarchy similar to modern Dribbble/Behance creator portfolios.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**React SPA with Wouter Routing**
- Single-page application using React 18 with TypeScript
- Client-side routing via Wouter (lightweight React Router alternative)
- Component library: shadcn/ui (Radix UI primitives with Tailwind CSS)
- State management: React hooks and TanStack Query for server state
- Form handling: React Hook Form with Zod validation

**Styling System**
- Tailwind CSS with custom design tokens
- Light mode only (dark mode not required per design guidelines)
- Custom color palette with vibrant pink primary (#FF1493)
- Inter font family via Google Fonts
- Consistent spacing primitives (4, 6, 8, 12, 16, 20, 24px units)
- Max container width: 6xl (1280px)

**Design Patterns**
- Component-based architecture with reusable UI components
- Form validation using Zod schemas shared between client and server
- Responsive grid layouts (4-column services, 2-column portfolio)
- Mobile-first responsive design

### Backend Architecture

**Express Server with TypeScript**
- Node.js/Express REST API
- ESM module system
- Development mode with hot reloading via Vite middleware
- Production builds using esbuild bundler

**API Endpoints**
- `POST /api/contact` - Submit contact form (validated with Zod)
- `GET /api/contact` - Retrieve contact submissions (admin view)

**Data Layer**
- In-memory storage implementation (MemStorage class)
- Interface-based storage pattern (IStorage) for easy database migration
- Drizzle ORM configured for PostgreSQL (schema defined but not connected)
- Session management ready with connect-pg-simple

**Error Handling**
- Global error middleware
- Zod validation error responses (400 status)
- Generic error responses (500 status)
- Request/response logging for API routes

### External Dependencies

**UI Component Libraries**
- @radix-ui/* - Headless UI primitives (accordion, dialog, dropdown, select, etc.)
- Tailwind CSS - Utility-first CSS framework
- shadcn/ui - Pre-built component system
- Lucide React - Icon library
- React Icons - Additional icon sets (Simple Icons for social media)

**Data & Forms**
- TanStack Query - Server state management and data fetching
- React Hook Form - Form state and validation
- Zod - Schema validation (shared between client/server)
- Drizzle ORM - Database ORM (configured for PostgreSQL)

**Database (Configured but not connected)**
- PostgreSQL (via @neondatabase/serverless)
- Drizzle Kit for migrations
- Schema: `contact_submissions` table with id, name, email, message, createdAt

**Development Tools**
- Vite - Build tool and dev server
- TypeScript - Type safety
- esbuild - Production bundler
- Replit plugins - Development helpers (error overlay, cartographer, dev banner)

**Design System**
- Google Fonts (Inter family)
- Custom CSS variables for theming
- Consistent border radius (9px, 6px, 3px)
- Elevation system with rgba overlays