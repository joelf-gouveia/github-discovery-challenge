import React from "react";
import { render, screen } from "@testing-library/react";
import { SignUp } from "./SignUp";

/* eslint-disable */
// Mock the react-alert module
jest.mock("@blaumaus/react-alert", () => ({
  useAlert: () => ({
    error: jest.fn(),
  }),
}));

// Mock the useNavigate for react router v6
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SignUp component", () => {
  test("renders SignUp heading", () => {
    render(<SignUp />);
    const heading = screen.getByText("Sign up");
    expect(heading).toBeInTheDocument();
  });

  test("renders form fields", () => {
    render(<SignUp />);
    const name = screen.getByLabelText("Name", { exact: false });
    const emailField = screen.getByLabelText("Email Address", { exact: false });
    const passwordField = screen.getByLabelText("Password", { exact: false });
    expect(name).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  test("renders Sign Up button", () => {
    render(<SignUp />);
    const signInButton = screen.getByRole("button", { name: /sign up/i });
    expect(signInButton).toBeInTheDocument();
  });
});
