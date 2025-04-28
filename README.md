# 📱 Mobile Shop Application

A modern Single Page Application (SPA) built with React 19 and TypeScript for purchasing mobile devices. Developed for an Inditex front-end technical test.

🔗 **[Live Demo](https://inditex-test-eta.vercel.app/)**

## 📋 Table of Contents

- [Technologies](#-technologies)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Components](#-components)
- [Custom Hooks](#-custom-hooks)
- [Caching System](#-caching-system)
- [Testing](#-testing)
- [Setup & Installation](#-setup--installation)
- [Responsive Design](#-responsive-design)

## 🛠 Technologies

- **React 19**: UI framework
- **TypeScript 5.7**: Static typing
- **React Router 6**: Routing
- **Context API**: State management
- **Pure CSS**: Custom styling
- **Vite 6**: Fast build tool
- **ESLint & Prettier**: Code quality
- **LocalStorage**: Data persistence
- **Jest & React Testing Library**: Testing

## 🏗 Architecture

### Layers:

- **UI Layer**: Renders views (Components, Pages)
- **Logic Layer**: Manages state (Hooks, Context)
- **Data Layer**: Handles API and cache

### Patterns:

- Observer (Context API for cart)
- Repository (data layer)
- Component Composition
- Custom Hooks for logic

## 📂 Project Structure

```
src/
├── __tests__/                 # Test files
│   ├── components/
│   ├── hooks/
│   └── pages/
├── api/                       # API services
│   └── services.ts
├── context/                   # State management
│   └── cartContext.tsx
├── Hooks/                     # Custom hooks
│   ├── useAddToCart/
│   ├── useFilteredProducts.tsx
│   ├── useProductDetails/
│   ├── useProducts/
│   └── useToast/
├── Pages/                     # Pages
│   ├── ProductDetailPage/
│   └── ProductListPage/
├── ProductDetailComponents/   # Product components
│   ├── ProductActions.tsx
│   ├── ProductDescription.tsx
│   ├── ProductImage.tsx
│   └── ProductItem.tsx
├── types/                     # TypeScript types
│   ├── CartContext.d.ts
│   ├── ErrorBoundary.d.ts
│   ├── Index.d.ts
│   ├── ProductItem.d.ts
│   └── Toast.d.ts
├── UI/                        # UI components
│   ├── ErrorBoundary.tsx
│   ├── Header.tsx
│   ├── LoadingSpinner.tsx
│   └── SearchBar.tsx
├── App.css                    # Global CSS
├── App.tsx                    # Root component
└── main.tsx                   # Entry pointt
```

## 🧩 Components

### UI Components:

- **Header**: App title, breadcrumbs, cart count
- **SearchBar**: Real-time filtering
- **ProductItem**: Product card in list
- **ProductImage**: Product visuals
- **ProductDescription**: Product specifications
- **ProductActions**: Storage/color selection and add button
- **LoadingSpinner**: Loading indicator
- **ErrorBoundary**: Error handling

### Pages:

- **ProductListPage (PLP)**: Products with search
- **ProductDetailPage (PDP)**: Image and details columns

## 🪝 Custom Hooks

```typescript
// Example usage
const { products, loading, error } = useProducts();
const filteredProducts = useFilteredProducts(products, searchTerm);
```

- **useProducts**: Fetches product list
- **useFilteredProducts**: Real-time filtering
- **useProductDetails**: Loads product details
- **useAddToCart**: Manages cart operations
- **useToast**: Notification system

## 💾 Caching System

### Implementation:

- Time-based caching in LocalStorage (1-hour expiration)
- Automatic revalidation of expired data
- Transparent to components

### Flow:

```
Request → Cache Valid? → Return Cached
        → Else → Fetch API → Cache → Return
```

## ✅ Testing

### Test Suite:

- **Unit Tests**: Components and hooks
- **Integration Tests**: User flows and interactions
- **Mock API**: For consistent test results

### Example Test:

```typescript
test('renders ProductItem with correct data', () => {
  render(<ProductItem product={mockProduct} />);
  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.getByText('iPhone 13')).toBeInTheDocument();
});
```

### Coverage Areas:

- Component rendering
- User interactions (clicks, form inputs)
- API response handling
- Error state management
- Responsive layout behavior

### Run Tests:

```bash
npm run test        # Run all tests
npm run test:watch  # Watch mode during development
npm run test:coverage  # Generate coverage report
```

## 🚀 Setup & Installation

### Requirements:

- Node.js ≥ 18
- npm or yarn

### Steps:

1. Clone: `git clone https://github.com/your-username/mobile-shop.git`
2. Install: `cd mobile-shop && npm install`
3. Run: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173)

### Scripts:

- `npm run dev`: Development server
- `npm run build`: Production build
- `npm run lint`: Code quality check
- `npm run test`: Run tests
- `npm run preview`: Preview build

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 480px, 768px, 992px, 1200px
- Maximum 4 products per row (adjusts by screen)
- Flexbox and Grid layouts
- CSS variables for consistency

```css
.products-grid {
  display: grid;
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```
