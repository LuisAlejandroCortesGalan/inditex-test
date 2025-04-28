import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import SearchBar from "../src/features/Ui/SearchBar";
import "@testing-library/jest-dom";

describe("SearchBar", () => {
  it("renders input with correct placeholder", () => {
    const mockOnSearchChange = jest.fn();
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />);

    const input = screen.getByPlaceholderText("Search by brand or model...");
    expect(input).toBeInTheDocument();
  });

  it("calls onSearchChange when input value changes", () => {
    const mockOnSearchChange = jest.fn();
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />);

    const input = screen.getByPlaceholderText("Search by brand or model...");
    fireEvent.change(input, { target: { value: "iPhone" } });

    expect(mockOnSearchChange).toHaveBeenCalledWith("iPhone");
  });

  it("displays the searchTerm value in the input", () => {
    const mockOnSearchChange = jest.fn();
    render(
      <SearchBar searchTerm="iPhone" onSearchChange={mockOnSearchChange} />,
    );

    const input = screen.getByPlaceholderText(
      "Search by brand or model...",
    ) as HTMLInputElement;
    expect(input.value).toBe("iPhone");
  });
});
