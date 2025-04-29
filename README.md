# Inditex Test App

Welcome to the **Inditex Test App**, a sleek Single Page Application (SPA) crafted for the Inditex Front-End Test. This React-based project delivers a seamless mobile device shopping experience with a Product List Page (PLP), Product Details Page (PDP), real-time search, API-driven cart functionality, and robust caching. Below, I'll guide you through the project, explain how it meets the test requirements, and share my reasoning behind key technical decisions—particularly my use of TypeScript and Vite—while highlighting my readiness to adapt if needed.

**Live Demo**: [Inditex Test App](https://inditex-test-eta.vercel.app/)

## Table of Contents
- [Test Requirements Overview](#test-requirements-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
- [Scripts](#scripts)
- [Testing](#testing)
- [ESLint & Prettier](#eslint--prettier)
- [CI/CD Configuration](#cicd-configuration)
- [Technical Decisions](#technical-decisions)
  - [Why TypeScript?](#why-typescript)
  - [Why Vite Instead of Webpack?](#why-vite-instead-of-webpack)
  - [Other Enhancements](#other-enhancements)

## Test Requirements Overview
The Inditex Front-End Test challenged me to build a mini-application for purchasing mobile devices, featuring two views: a **Product List Page (PLP)** and a **Product Details Page (PDP)**. The requirements included:
- A React-based SPA with client-side routing.
- Specific components: header, search bar, product list items, product image, description, and actions.
- Real-time search filtering by brand and model.
- API integration for product listing, details, and cart actions.
- Caching of API responses with a 1-hour expiration.
- Scripts for development, production builds, testing, and linting.
- A public repository with evolutionary commits and a detailed README.

I've addressed all these requirements while making informed decisions to enhance quality and performance. Where I deviated from suggestions (e.g., using TypeScript instead of JavaScript, Vite instead of a Webpack-based boilerplate), I chose what I believe best serves the project's goals. However, I'm fully prepared to adapt these choices if JavaScript or Webpack is deemed more suitable.

## Key Features
- **Product List Page (PLP)**: Displays API-fetched products in a responsive grid (up to 4 items per row), with real-time filtering by brand and model.
- **Product Details Page (PDP)**: Features a two-column layout with a product image on the left and details/actions on the right, including a link to return to the PLP.
- **Header**: Includes a clickable title/icon linking to the PLP, breadcrumbs for navigation, and a persistent cart item count.
- **Search Bar**: Filters products in real time based on user input, matching brand and model.
- **Product Actions**: Offers selectors for storage and color (default-selected if only one option) and a button to add items to the cart via API.
- **Caching**: Implements a 1-hour cache for API responses using `@tanstack/react-query`, minimizing redundant requests.
- **CI/CD Pipeline**: Automates linting, testing, building, and deployment to Vercel via GitHub Actions.
- **Testing**: Includes unit, integration, and E2E tests with Jest and React Testing Library.
- **Code Quality**: Enforces strict standards with ESLint (Airbnb config) and Prettier.

## Tech Stack
- **Frontend**: React 18, **TypeScript**, **Vite**
- **State Management**: Context API (for cart state)
- **Data Fetching & Caching**: `@tanstack/react-query`
- **Styling**: Tailwind CSS (via `App.css`) for responsive design
- **Testing**: Jest, React Testing Library
- **API Services**: Custom services for the provided API
- **Routing**: React Router for client-side navigation

## Directory Structure
The project is structured for modularity and scalability:
```
src/
├── tests/                      # Unit and integration tests
│   ├── products/                   # Product-related tests
│   │   ├── ProductItem.test.tsx
│   │   └── useFilteredProducts.test.tsx
│   └── ui/                         # UI component tests
│       └── SearchBar.test.tsx
├── domains/                        # Business logic domains
│   ├── products/                   # Product management
│   │   ├── components/             # Product-specific components
│   │   │   ├── ProductActions.tsx
│   │   │   ├── ProductDescription.tsx
│   │   │   ├── ProductImage.tsx
│   │   │   └── ProductItem.tsx
│   │   ├── hooks/                  # Product-specific hooks
│   │   │   ├── useFilteredProducts.ts
│   │   │   ├── useProductDetails.ts
│   │   │   └── useProducts.ts
│   │   ├── pages/                  # Product-specific pages
│   │   │   ├── ProductDetailPage.tsx
│   │   │   └── ProductListPage.tsx
│   │   ├── services/               # Product API services
│   │   │   └── productServices.ts
│   │   └── types/                  # Product types
│   │       ├── Product.d.ts
│   │       └── ProductDetail.d.ts
│   ├── cart/                       # Cart management
│   │   ├── context/                # Cart state management
│   │   │   └── CartContext.tsx
│   │   ├── hooks/                  # Cart hooks
│   │   │   └── useAddToCart.ts
│   │   ├── services/               # Cart API services
│   │   │   └── cartServices.ts
│   │   └── types/                  # Cart types
│   │       └── Cart.d.ts
│   └── notifications/              # Notification system
│       ├── hooks/                  # Notification hooks
│       │   └── useToast.ts
│       └── types/                  # Notification types
│           └── Toast.d.ts
├── shared/                         # Shared utilities and components
│   ├── components/                 # Reusable components
│   │   ├── ErrorBoundary.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── SearchBar.tsx
│   ├── types/                      # Shared types
│   │   └── ErrorBoundary.d.ts
│   │   └── searchBar.d.ts
│   └── styles/                     # Global styles
│       └── App.css
├── App.tsx                         # Root component
└── main.tsx                        # Application entry point
```

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/inditex-test.git
   cd inditex-test
   ```

2. **Install Dependencies**: Using npm:
   ```bash
   npm install
   ```
   Or using Yarn:
   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**: Create a .env file in the project root:
   ```env
   VITE_API_BASE_URL=https://itx-frontend-test.onrender.com
   ```

4. **Run the App Locally**:
   ```bash
   npm run start
   ```
   This starts the development server automatically.

## Scripts
The project includes all required scripts, plus extras for convenience:

- `npm run start`: Starts the development server with Vite.
- `npm run build`: Builds the project for production using TypeScript and Vite.
- `npm run test`: Runs the test suite with Jest.
- `npm run lint`: Runs ESLint to check code quality.

Additional scripts:
- `npm run lint:fix`: Automatically fixes linting issues.
- `npm run format`: Formats code with Prettier.
- `npm run format:check`: Checks code formatting.
- `npm run preview`: Previews the production build locally.
- `npm run test:watch`: Runs tests in watch mode.

## Testing
The testing strategy ensures reliability:

- **Unit Tests**: Cover individual components (e.g., ProductItem.test.tsx) and hooks (e.g., useFilteredProducts.test.tsx).
- **Integration Tests**: Verify component interactions, such as search filtering and cart updates.
- **End-to-End (E2E) Tests**: Simulate user flows (e.g., navigating from PLP to PDP, adding to cart).

Run tests:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## ESLint & Prettier
Code quality is maintained with:

- **ESLint**: Configured with Airbnb's style guide for industry-standard linting.
- **Prettier**: Ensures consistent formatting.

Run linting:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

Check formatting:
```bash
npm run format:check
```

Format code:
```bash
npm run format
```

## CI/CD Configuration
The project uses GitHub Actions for Continuous Integration and Deployment, automating linting, testing, building, and deployment to Vercel on pushes or pull requests to the main branch:

```yaml
name: CI + CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install Dependencies
        run: npm install

      - name: Check Prettier Formatting
        run: npm run format:check

      - name: Run Linter
        run: npm run lint

      - name: Run Tests
        run: npm run test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        run: npx vercel --prod --token=${{ secrets.VERCEL }}
```

## Technical Decisions
To demonstrate my technical judgment, I made choices I believe optimize the project's quality, performance, and maintainability. Below, I explain deviations from the test's suggestions (TypeScript and Vite) and emphasize my flexibility to adapt if JavaScript or Webpack is preferred.

### Why TypeScript?
The test recommended JavaScript with ES6 and advised against TypeScript. I chose TypeScript because I believe it significantly enhances the project:

- **Type Safety**: TypeScript catches errors during development, especially critical for API integrations where response shapes (e.g., product or cart data) can be unpredictable. Defining types like Product and ProductDetail ensures robust data handling.
- **Maintainability**: Explicit types make the codebase easier to understand and refactor, supporting long-term scalability.
- **Developer Productivity**: Features like autocompletion and type hints streamline development and reduce errors.
- **Industry Alignment**: TypeScript is a standard in modern React projects, making the codebase more professional and future-proof.
- **Flexibility**: While I believe TypeScript adds substantial value, I'm fully prepared to convert the project to JavaScript if it's deemed optimal. The codebase uses minimal TypeScript-specific features, so transitioning would be straightforward (e.g., removing type annotations). This choice reflects my judgment for quality, but I'm open to aligning with project preferences.

### Why Vite Instead of Webpack?
The test allowed a boilerplate template, often implying a Webpack-based setup like Create React App. I opted for Vite because I believe it better serves the project:

- **Blazing Fast Development**: Vite's ES Module-based system offers near-instant hot module replacement (HMR) and faster cold starts than Webpack, boosting developer productivity.
- **Simpler Configuration**: Vite requires minimal setup, reducing complexity while supporting all required features (e.g., env variables, production builds).
- **Optimized Performance**: Vite's Rollup-based production builds create smaller, faster bundles, aligning with the SPA's performance needs.
- **Modern Tooling**: Vite is designed for modern browsers, making it a forward-looking choice for this project.
- **Flexibility**: I chose Vite to showcase a modern, efficient tool, but I'm ready to switch to Webpack if it's preferred. Vite's configuration is lightweight, and migrating to Webpack (e.g., via Create React App or a custom setup) would be manageable. This decision reflects my aim to prioritize performance and simplicity, but I'm adaptable to meet specific requirements.

### Other Enhancements
- **Custom CSS**: Chosen for its flexibility and full control over responsive design (e.g., 4-item grid on the PLP, two-column layout on the PDP), adapting seamlessly to different screen sizes.
- **@tanstack/react-query**: Simplifies API fetching and caching, implementing the required 1-hour cache expiration while adding features like loading states and retries for better UX.
- **Context API**: Used for cart state management to persist the cart item count across views, keeping the solution lightweight.
- **Error Boundary**: Added to handle unexpected errors gracefully, enhancing reliability.
- **Evolutionary Commits**: The repository includes granular commits (e.g., initial setup, PLP implementation, testing) to show iterative progress.