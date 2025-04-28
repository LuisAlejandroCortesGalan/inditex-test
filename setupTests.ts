import {
  renderHook as originalRenderHook,
  RenderHookOptions,
} from "@testing-library/react";
import { createRoot } from "react-dom/client";
import React, { ReactNode } from "react";
import "@testing-library/jest-dom";

// Custom renderHook to use createRoot
const customRenderHook = <Result, Props>(
  callback: () => Result,
  options?: Omit<RenderHookOptions<Props>, "wrapper"> & {
    wrapper?: React.ComponentType<{ children: ReactNode }>;
  },
) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  const renderResult = originalRenderHook(callback, {
    ...options,
    wrapper: ({ children }: { children: ReactNode }) => {
      root.render(children);
      return null;
    },
  });

  return {
    ...renderResult,
    unmount: () => {
      renderResult.unmount();
      root.unmount();
      document.body.removeChild(container);
    },
  };
};

// Exportar el renderHook personalizado para usarlo en los tests
export { customRenderHook as renderHook };
