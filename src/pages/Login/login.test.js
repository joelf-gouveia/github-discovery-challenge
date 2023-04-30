import React from "react";
import { render, screen } from "@testing-library/react";
import { Login } from "./Login";

/* eslint-disable */
// Mock the react-alert module
jest.mock("react-alert", () => ({
  useAlert: () => ({
    error: jest.fn(),
  }),
}));

// Mock the useNavigate for react router v6
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login component", () => {
  test("renders Login heading", () => {
    render(<Login />);
    const heading = screen.getByText("Login");
    expect(heading).toBeInTheDocument();
  });

  test("renders Email Address field", () => {
    render(<Login />);
    const emailField = screen.getByLabelText("Email Address", { exact: false });
    expect(emailField).toBeInTheDocument();
  });

  test("renders Password field", () => {
    render(<Login />);
    const passwordField = screen.getByLabelText("Password", { exact: false });
    expect(passwordField).toBeInTheDocument();
  });

  test("renders Sign In button", () => {
    render(<Login />);
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
  });
});
