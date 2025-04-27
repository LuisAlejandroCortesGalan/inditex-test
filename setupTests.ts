import { renderHook, RenderHookOptions } from '@testing-library/react-hooks';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import '@testing-library/jest-dom';

// Custom renderHook to use createRoot
const customRenderHook = <Result, Props extends { children: React.ReactNode }>(
  callback: (props: Props) => Result,
  options?: RenderHookOptions<Props>
) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  const renderResult = renderHook(callback, {
    ...options,
    wrapper: ({ children }: Props) => {
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

(function setupMock() {
  jest.mock('@testing-library/react-hooks', () => {
    const actual = jest.requireActual('@testing-library/react-hooks');
    return {
      ...actual,
      renderHook: customRenderHook,
    };
  });
})();