import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CartProvider } from "./domains/cart/context/CartContext";
import ProductDetailPage from "./domains/products/pages/ProductDetailPage";
import ProductListPage from "./domains/products/pages/ProductListPage";
import ErrorBoundary from "./shared/components/ErrorBoundary";
import Header from "./shared/components/Header";
import "./shared/styles/App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const routerOptions = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router future={routerOptions.future}>
          <ErrorBoundary>
            <div className="app">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<ProductListPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                </Routes>
              </main>
            </div>
          </ErrorBoundary>
        </Router>
      </CartProvider>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default App;
