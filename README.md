📱 Mobile Shop Application
A modern Single Page Application (SPA) built with React 19 and TypeScript for purchasing mobile devices. Developed for an Inditex front-end technical test, this project showcases a scalable, modular architecture, robust functionality, and a polished user experience.
🔗 Live Demo
📋 Table of Contents

Features
Technologies
Architecture
Project Structure
Components
Custom Hooks
Caching System
Testing
Setup & Installation
Responsive Design
Design Decisions

🌟 Features

Product Listing: Browse mobile devices with real-time search by brand or model.
Product Details: View detailed specifications, select storage/color options, and add to cart.
Cart Management: Add products to the cart with persistent count via LocalStorage.
Notifications: User feedback via toast notifications (react-toastify).
Error Handling: Robust error boundaries with fallback UI for unexpected errors.
Responsive Design: Mobile-first layout with adaptive grids and multiple breakpoints.
Testing: Comprehensive unit and integration tests using Jest and React Testing Library.
Performance: Efficient caching with TanStack Query, lazy-loaded images, and optimized build with Vite.

🛠 Technologies

React 19: Modern UI framework for dynamic, component-based interfaces.
TypeScript 5.7: Static typing for enhanced code reliability and developer productivity.
React Router 6: Declarative routing for seamless navigation.
TanStack Query 5: Data fetching, caching, and state synchronization.
Context API: Lightweight global state management for cart functionality.
Pure CSS: Custom styling with CSS variables for consistent theming.
Vite 6: Fast development server and optimized production build tool.
ESLint & Prettier: Code quality and formatting enforcement.
LocalStorage: Persistent cart count and API response caching.
Jest & React Testing Library: Robust testing suite for components and hooks.
React Toastify: User-friendly notification system.
FontAwesome: Icons for enhanced UI elements.

🏗 Architecture
The application adopts a modular architecture with clear separation of concerns, drawing inspiration from Screaming Architecture and Hexagonal Architecture to ensure scalability, maintainability, and alignment with business intent.
Layers

UI Layer: Renders views using components and pages.
Logic Layer: Manages business logic and state through hooks and Context API.
Data Layer: Handles API interactions and caching via services and TanStack Query.

Patterns

Observer: Context API for reactive cart state management.
Repository: API services as a data access layer.
Component Composition: Reusable, single-responsibility components.
Custom Hooks: Encapsulated logic for reusability and testability.
Ports and Adapters: Services act as adapters to isolate business logic from external APIs.

Architectural Decision
The modular architecture organizes code by business domains (products, cart, notifications), balancing the project's moderate size with the need for scalability:

Screaming Architecture: Inspired by my familiarity with this pattern, the structure reflects the application's core domains (e.g., products for product listing and details), making the codebase intuitive and aligned with business goals.
Hexagonal Architecture Influence: Services (productServices, cartServices) act as ports, decoupling business logic from external APIs. This facilitates testing and potential integrations with different backends.
Why Modular?: For a project of this scope, a fully hexagonal or Domain-Driven Design approach would be excessive, while a flat structure would hinder maintainability. The modular design strikes a balance, leveraging my expertise in Screaming Architecture while incorporating hexagonal principles for scalability. It supports future features (e.g., user authentication, order history) without requiring significant refactoring.

📂 Project Structure
The project is organized by business domains under domains/, with shared utilities in shared/ to enhance clarity and scalability:
src/
├── __tests__/                     # Unit and integration tests
│   ├── products/
│   │   ├── ProductItem.test.tsx
│   │   └── useFilteredProducts.test.tsx
│   └── ui/
│       └── SearchBar.test.tsx
├── domains/                      # Business domains
│   ├── products/                 # Product management
│   │   ├── components/           # Domain-specific components
│   │   │   ├── ProductActions.tsx
│   │   │   ├── ProductDescription.tsx
│   │   │   ├── ProductImage.tsx
│   │   │   └── ProductItem.tsx
│   │   ├── hooks/                # Domain-specific hooks
│   │   │   ├── useFilteredProducts.ts
│   │   │   ├── useProductDetails.ts
│   │   │   └── useProducts.ts
│   │   ├── pages/                # Domain-specific pages
│   │   │   ├── ProductDetailPage.tsx
│   │   │   └── ProductListPage.tsx
│   │   ├── services/             # API services
│   │   │   └── productServices.ts
│   │   └── types/                # Domain-specific types
│   │       ├── Product.ts
│   │       └── ProductDetail.ts
│   ├── cart/                     # Cart management
│   │   ├── context/              # Cart state
│   │   │   └── CartContext.tsx
│   │   ├── hooks/                # Cart hooks
│   │   │   └── useAddToCart.ts
│   │   ├── services/             # Cart API services
│   │   │   └── cartServices.ts
│   │   └── types/                # Cart types
│   │       └── Cart.ts
│   └── notifications/            # Notification system
│       ├── hooks/                # Notification hooks
│       │   └── useToast.ts
│       └── types/                # Notification types
│           └── Toast.ts
├── shared/                       # Shared utilities
│   ├── components/               # Generic components
│   │   ├── ErrorBoundary.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── SearchBar.tsx
│   ├── types/                    # Shared types
│   │   └── ErrorBoundary.ts
│   └── styles/                   # Global styles
│       └── App.css
├── App.tsx                       # Root component
└── main.tsx                      # Entry point

This structure promotes modularity, separating domain-specific logic from shared utilities, and aligns with enterprise-grade practices.
🧩 Components
UI Components

Header: Displays the app title, breadcrumbs, and cart count with FontAwesome icons.
SearchBar: Enables real-time filtering by brand or model with accessible input.
ProductItem: Renders product cards with image, brand, model, and price.
ProductImage: Displays product visuals with lazy loading for performance.
ProductDescription: Presents detailed product specifications in a structured format.
ProductActions: Manages storage/color selection and add-to-cart functionality.
LoadingSpinner: Visual indicator for loading states with ARIA accessibility.
ErrorBoundary: Catches runtime errors and renders a fallback UI.

Pages

ProductListPage (PLP): Lists products with search and filtering capabilities.
ProductDetailPage (PDP): Displays product details with image and action columns.

🪝 Custom Hooks
Custom hooks encapsulate logic for reusability and maintainability:
// Example usage
const { data: products, isLoading, error } = useProducts();
const filteredProducts = useFilteredProducts(products, searchTerm);


useProducts: Fetches the product list using TanStack Query with caching.
useFilteredProducts: Filters products in real-time based on search input.
useProductDetails: Retrieves detailed product data by ID.
useAddToCart: Handles cart mutations and updates with optimistic updates.
useToast: Integrates react-toastify for user notifications (e.g., success/error messages).

💾 Caching System
Implementation

TanStack Query: Manages in-memory caching with a 1-hour stale time for products and details.
LocalStorage: Persists cart count and cached API responses with a 1-hour expiration.
Background Revalidation: Automatically refetches stale data to keep the UI up-to-date.

Flow
Request → Check Cache (TanStack Query/LocalStorage) → Valid? → Return Cached
        → Else → Fetch API → Update Cache → Return

Benefits

Minimizes API requests for better performance.
Enhances user experience with instant data rendering.
Supports partial offline functionality.
Reduces server load.

✅ Testing
Test Suite

Unit Tests: Validate individual components and hooks.
Integration Tests: Simulate user flows (e.g., searching, adding to cart).
Mock API: Use mocked responses for consistent and deterministic tests.

Example Test
test('renders ProductItem with correct data', () => {
  render(<ProductItem product={mockProduct} />);
  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.getByText('iPhone 13')).toBeInTheDocument();
});

Coverage Areas

Component rendering and prop validation.
User interactions (clicks, form inputs, navigation).
API response handling (success, error, loading).
Error boundary behavior under failure conditions.
Responsive layout across multiple breakpoints.

Run Tests
npm run test          # Run all tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report

🚀 Setup & Installation
Requirements

Node.js ≥ 18
npm or yarn

Steps

Clone the repository:git clone https://github.com/your-username/mobile-shop.git


Install dependencies:cd mobile-shop && npm install


Start the development server:npm run dev


Open http://localhost:5173 in your browser.

Scripts

npm run dev: Launches the Vite development server with hot module replacement.
npm run build: Generates an optimized production build with Rollup.
npm run lint: Checks code quality with ESLint.
npm run lint:fix: Automatically fixes linting issues.
npm run format: Formats code with Prettier.
npm run format:check: Verifies formatting compliance.
npm run test: Runs the test suite with Jest.
npm run preview: Previews the production build locally.

📱 Responsive Design
The application is built with a mobile-first approach to ensure a seamless experience across devices:

Breakpoints: 480px, 768px, 992px, 1200px.
Product Grid: Adapts from 1 to 4 columns based on screen width.
Layouts: Leverages Flexbox and CSS Grid for flexible, responsive designs.
CSS Variables: Ensures consistent theming and simplifies style maintenance.
Accessibility: Includes ARIA attributes and keyboard

