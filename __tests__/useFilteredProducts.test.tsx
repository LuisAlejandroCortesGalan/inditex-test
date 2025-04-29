import { renderHook } from "@testing-library/react";

import { useFilteredProducts } from "../src/features/hooks/useFilteredProducts";
import "@testing-library/jest-dom";

describe("useFilteredProducts", () => {
  const mockProducts = [
    {
      id: "1",
      brand: "Apple",
      model: "iPhone 13",
      price: "999",
      imgUrl: "url1",
    },
    {
      id: "2",
      brand: "Samsung",
      model: "Galaxy S21",
      price: "899",
      imgUrl: "url2",
    },
    {
      id: "3",
      brand: "Google",
      model: "Pixel 6",
      price: "799",
      imgUrl: "url3",
    },
    {
      id: "4",
      brand: "Apple",
      model: "iPhone 12",
      price: "799",
      imgUrl: "url4",
    },
  ];

  it("returns all products when search term is empty", () => {
    const { result } = renderHook(() => useFilteredProducts(mockProducts, ""));
    expect(result.current).toEqual(mockProducts);
  });

  it("filters products by brand", () => {
    const { result } = renderHook(() =>
      useFilteredProducts(mockProducts, "Apple"),
    );
    expect(result.current).toHaveLength(2);
    expect(result.current?.map((p) => p.id)).toEqual(["1", "4"]);
  });

  it("filters products by model", () => {
    const { result } = renderHook(() =>
      useFilteredProducts(mockProducts, "Galaxy"),
    );
    expect(result.current).toHaveLength(1);
    expect(result.current?.[0].id).toBe("2");
  });

  it("is case insensitive", () => {
    const { result } = renderHook(() =>
      useFilteredProducts(mockProducts, "apple"),
    );
    expect(result.current).toHaveLength(2);
    expect(result.current?.map((p) => p.id)).toEqual(["1", "4"]);
  });

  it("returns empty array when no matches found", () => {
    const { result } = renderHook(() =>
      useFilteredProducts(mockProducts, "Motorola"),
    );
    expect(result.current).toHaveLength(0);
  });

  it("handles undefined products", () => {
    const { result } = renderHook(() =>
      useFilteredProducts(undefined, "Apple"),
    );
    expect(result.current).toBeUndefined();
  });
});
