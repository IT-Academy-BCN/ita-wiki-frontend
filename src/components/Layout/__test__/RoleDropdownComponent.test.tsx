import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import RoleDropdownComponent from "../header/RoleDropdownComponent";
import { TypUserRole } from "../../../types";
import userEvent from "@testing-library/user-event";

describe("RoleDropdownComponent", () => {
  const mockOnRoleChange = vi.fn().mockResolvedValue(undefined);

  const defaultProps = {
    userRole: "student" as TypUserRole,
    isChanging: false,
    onRoleChange: mockOnRoleChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render all available roles", () => {
    render(<RoleDropdownComponent {...defaultProps} />);

    expect(screen.getByText("student")).toBeInTheDocument();
    expect(screen.getByText("mentor")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
    expect(screen.getByText("superadmin")).toBeInTheDocument();
  });

  test("should render header text", () => {
    render(<RoleDropdownComponent {...defaultProps} />);

    expect(screen.getByText("Cambiar a:")).toBeInTheDocument();
  });

  test("should highlight current user role", () => {
    render(<RoleDropdownComponent {...defaultProps} userRole="mentor" />);

    const mentorButton = screen.getByText("mentor");
    expect(mentorButton).toHaveClass("font-bold");
    expect(mentorButton).toHaveClass("bg-gray-100");
  });

  test("should call onRoleChange when clicking a role", async () => {
    const user = userEvent.setup();
    render(<RoleDropdownComponent {...defaultProps} />);

    const adminButton = screen.getByText("admin");
    await user.click(adminButton);

    expect(mockOnRoleChange).toHaveBeenCalledWith("admin");
    expect(mockOnRoleChange).toHaveBeenCalledTimes(1);
  });

  test("should disable all buttons when isChanging is true", () => {
    render(<RoleDropdownComponent {...defaultProps} isChanging={true} />);

    const studentButton = screen.getByText("student");
    const mentorButton = screen.getByText("mentor");
    const adminButton = screen.getByText("admin");
    const superadminButton = screen.getByText("superadmin");

    expect(studentButton).toBeDisabled();
    expect(mentorButton).toBeDisabled();
    expect(adminButton).toBeDisabled();
    expect(superadminButton).toBeDisabled();
  });

  test("should disable all buttons when disableAll is true", () => {
    render(<RoleDropdownComponent {...defaultProps} disableAll={true} />);

    const studentButton = screen.getByText("student");
    const mentorButton = screen.getByText("mentor");
    const adminButton = screen.getByText("admin");
    const superadminButton = screen.getByText("superadmin");

    expect(studentButton).toBeDisabled();
    expect(mentorButton).toBeDisabled();
    expect(adminButton).toBeDisabled();
    expect(superadminButton).toBeDisabled();
  });

  test("should apply disabled styles when disableAll is true", () => {
    render(<RoleDropdownComponent {...defaultProps} disableAll={true} />);

    const studentButton = screen.getByText("student");
    const mentorButton = screen.getByText("mentor");
    const adminButton = screen.getByText("admin");
    const superadminButton = screen.getByText("superadmin");

    expect(studentButton).toHaveClass("cursor-not-allowed");
    expect(studentButton).toHaveClass("opacity-50");
    expect(mentorButton).toHaveClass("cursor-not-allowed");
    expect(mentorButton).toHaveClass("opacity-50");
    expect(adminButton).toHaveClass("cursor-not-allowed");
    expect(adminButton).toHaveClass("opacity-50");
    expect(superadminButton).toHaveClass("cursor-not-allowed");
    expect(superadminButton).toHaveClass("opacity-50");
  });

  test("should not call onRoleChange when button is disabled", async () => {
    const user = userEvent.setup();
    render(<RoleDropdownComponent {...defaultProps} isChanging={true} />);

    const adminButton = screen.getByText("admin");
    await user.click(adminButton);

    expect(mockOnRoleChange).not.toHaveBeenCalled();
  });

  test("should render correctly when userRole is null", () => {
    render(<RoleDropdownComponent {...defaultProps} userRole={null} />);

    expect(screen.getByText("student")).toBeInTheDocument();
    expect(screen.getByText("mentor")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
    expect(screen.getByText("superadmin")).toBeInTheDocument();

    // No role should be highlighted
    const studentButton = screen.getByText("student");
    const mentorButton = screen.getByText("mentor");
    const adminButton = screen.getByText("admin");
    const superadminButton = screen.getByText("superadmin");

    expect(studentButton).not.toHaveClass("font-bold");
    expect(mentorButton).not.toHaveClass("font-bold");
    expect(adminButton).not.toHaveClass("font-bold");
    expect(superadminButton).not.toHaveClass("font-bold");
  });

  test("should render all TypUserRole types", () => {
    render(<RoleDropdownComponent {...defaultProps} />);

    const expectedRoles: TypUserRole[] = [
      "student",
      "mentor",
      "admin",
      "superadmin",
    ];

    expectedRoles.forEach((role) => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });
  });
});
