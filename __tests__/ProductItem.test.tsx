import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import ProductItem from "../src/features/productDetailComponents/ProductItem";

describe("ProductItem", () => {
  const mockProduct = {
    id: "1",
    brand: "Apple",
    model: "iPhone 13",
    price: 999,
    imgUrl: "https://example.com/iphone13.jpg",
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    const routerOptions = {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    };
    return render(
      <BrowserRouter future={routerOptions.future}>{ui}</BrowserRouter>,
    );
  };

  it("renders product information correctly", () => {
    renderWithRouter(<ProductItem product={mockProduct} />);

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("iPhone 13")).toBeInTheDocument();
    expect(screen.getByText("€999")).toBeInTheDocument();

    const img = screen.getByAltText("Apple iPhone 13");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/iphone13.jpg");
  });

  it("renders link to product detail page", () => {
    renderWithRouter(<ProductItem product={mockProduct} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", expect.stringContaining("/product/1"));
  });
});
