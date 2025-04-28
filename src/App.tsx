import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CartProvider } from "./features/context/CartContext";
import ProductDetailPage from "./features/pages/ProductDetailPage";
import ProductListPage from "./features/pages/ProductListPage";
import ErrorBoundary from "./features/ui/ErrorBoundary";
import Header from "./features/ui/Header";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
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
