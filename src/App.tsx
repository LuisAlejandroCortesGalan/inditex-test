import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  PersistQueryClientProvider,
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CartProvider, useCart } from "./domains/cart/context/CartContext";
import { useCartLogic } from "./domains/cart/hooks/useCartLogic";
import { useCheckout } from "./domains/cart/hooks/useCheckout";
import ProductDetailPage from "./domains/products/pages/ProductDetailPage";
import ProductListPage from "./domains/products/pages/ProductListPage";
import ErrorBoundary from "./shared/components/ErrorBoundary";
import Header from "./shared/components/Header";
import "./shared/styles/App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 60,
      retry: 1,
    },
  },
});

const localStoragePersister: Persister = {
  persistClient: async (client: PersistedClient) => {
    const serializedClient = JSON.stringify(client);
    localStorage.setItem("tanstack-query-cache", serializedClient);
    return Promise.resolve();
  },
  restoreClient: async () => {
    const serializedClient = localStorage.getItem("tanstack-query-cache");
    if (serializedClient) {
      return Promise.resolve(JSON.parse(serializedClient));
    }
    return Promise.resolve(null);
  },
  removeClient: async () => {
    localStorage.removeItem("tanstack-query-cache");
    return Promise.resolve();
  },
};

const routerOptions = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

const HeaderWithProviders: React.FC = () => {
  const cartState = useCart();
  const cartLogic = useCartLogic();
  const { handleCheckout } = useCheckout();

  return <Header {...cartState} {...cartLogic} {...{ handleCheckout }} />;
};

const App: React.FC = () => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: localStoragePersister,
        maxAge: 1000 * 60 * 60,
        buster: "v1",
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            return (
              query.queryKey[0] === "products" ||
              query.queryKey[0] === "product"
            );
          },
        },
      }}
    >
      <CartProvider>
        <Router future={routerOptions.future}>
          <ErrorBoundary>
            <div className="app">
              <HeaderWithProviders />
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
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </PersistQueryClientProvider>
  );
};

export default App;
