# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Development server**: `npm run dev` - Starts Next.js development server on http://localhost:3000
- **Build**: `npm run build` - Creates production build with static export
- **Production start**: `npm run start` - Starts production server (after build)
- **Linting**: `npm run lint` - Runs ESLint with Next.js configuration
- **Code formatting**: `npx prettier --write .` - Formats code using Prettier with Tailwind CSS plugin

## Architecture Overview

This is a **Next.js-based documentation website** built with the following key technologies:

### Core Technologies

- **Next.js 15** with App Router and static export (`output: 'export'`)
- **MDX** for documentation pages (Markdown + React components)
- **TypeScript** with strict mode enabled
- **Tailwind CSS** with custom typography styles and Headless UI
- **Framer Motion** for animations and page transitions

### Documentation System

- **Content Structure**: Documentation pages are MDX files in `src/app/` directory
- **Navigation**: Defined as JavaScript array in `src/components/Navigation.tsx:232-365`
- **Page Structure**: Each page needs `metadata` object with title/description and `sections` array
- **URL Mapping**: Directory structure maps to URLs (e.g., `/fhir/Patient` → `src/app/fhir/Patient/page.mdx`)

### Search Implementation

- **FlexSearch** powers global search functionality (⌘K shortcut)
- **Search indexing**: Automatically scans MDX files via `src/mdx/search.mjs`
- **Configuration**: Search parameters can be adjusted in `/src/mdx/search.mjs`

### Component Architecture

- **Layout**: `src/components/Layout.tsx` provides main application shell
- **Navigation**: Animated sidebar navigation with section highlighting
- **MDX Components**: Custom components in `src/components/mdx.tsx` for enhanced content
- **State Management**: Zustand for section tracking and navigation state

### Styling System

- **Design System**: Custom Tailwind configuration with extended typography
- **Dark Mode**: Built-in dark mode support using `next-themes`
- **Typography**: Custom typography plugin with specialized styles for documentation

## Key Files and Patterns

### Navigation Updates

When adding new pages, update the `navigation` array in `src/components/Navigation.tsx:232-365` to match the directory structure in `src/app/`.

### MDX Page Structure

Each documentation page should follow this pattern:

```jsx
export const metadata = {
  title: 'Page Title',
  description: 'Page description for SEO'
}

export const sections = [
  { title: 'Section 1', id: 'section-1' },
  { title: 'Section 2', id: 'section-2' }
]

# Page Content

Content goes here...
```

### Path Aliases

- `@/*` maps to `src/*` for clean imports throughout the codebase

### Build Configuration

- Static export enabled for deployment without server
- Custom MDX processing with remark/rehype plugins
- Integrated search index generation during build
