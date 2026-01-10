# GEMINI.md

## Project Overview

This is a personal portfolio website for Hongming Wang, a Full-Stack Developer. The project is built with modern web technologies and showcases his skills, experience, and projects. It is a single-page application with a clean and responsive design, featuring smooth animations and a dark mode theme.

The main technologies used are:

*   **Framework:** Next.js (with App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (with custom theme and animations)
*   **UI Components:** React
*   **Animations:** Framer Motion
*   **Icons:** Lucide React
*   **Themeing:** `next-themes` for dark/light mode

The project follows a component-based architecture, with a clear separation of concerns. All the text content, including personal information, project details, and experience, is centralized in `src/lib/constants.ts` for easy maintenance.

## Building and Running

The project uses `npm` as the package manager. The following scripts are available in `package.json`:

*   **To run the development server:**
    ```bash
    npm run dev
    ```

*   **To create a production build:**
    ```bash
    npm run build
    ```

*   **To start the production server:**
    ```bash
    npm run start
    ```

*   **To run the linter:**
    ```bash
    npm run lint
    ```

## Development Conventions

*   **Code Style:** The project uses the standard Next.js ESLint configuration for code style and quality.
*   **TypeScript:** TypeScript is used with strict mode enabled (`"strict": true` in `tsconfig.json`). Path aliases (`@/*`) are configured to simplify imports.
*   **Component Structure:** Components are organized into two main categories:
    *   `src/components/ui`: For general-purpose, reusable UI elements like `Navbar` and `Footer`.
    *   `src/components/sections`: For the main content sections of the page, such as `Hero`, `About`, and `Projects`.
*   **Styling:** Tailwind CSS is used for styling. A custom theme with specific colors, fonts, and animations is defined in `tailwind.config.ts`. The `clsx` utility is used for conditionally applying classes.
*   **Data Management:** All static data and text content are stored in `src/lib/constants.ts`. This makes it easy to update the website's content without modifying the components.
*   **Theming:** Dark mode is supported using `next-themes`, and the theme can be toggled by the user. The `darkMode: "class"` strategy is used in Tailwind CSS.
