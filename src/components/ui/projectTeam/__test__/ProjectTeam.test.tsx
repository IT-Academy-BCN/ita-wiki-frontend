import { render, screen } from "@testing-library/react";
import ProjectTeam from "../ProjectTeam";

describe("ProjectTeam", () => {
  const props = {
    logoFront: "../assets/react.svg",
    logoBack: "../assets/logo-php 1.svg",
    avatarSrc: "../assets/project-avatar1.svg",
    avatarSrc2: "../assets/project-avatar2.svg",
    avatarSrc3: "../assets/project-avatar3.svg",
  };

  test("renders tech sections with logos", () => {
    render(<ProjectTeam {...props} />);

    const imgs = screen.getAllByRole("img");
    const hasFrontLogo = imgs.some(
      (img) => img.getAttribute("src") === props.logoFront,
    );
    const hasBackLogo = imgs.some(
      (img) => img.getAttribute("src") === props.logoBack,
    );
    expect(hasFrontLogo).toBe(true);
    expect(hasBackLogo).toBe(true);
  });

  test("renders avatars of team members", () => {
    render(<ProjectTeam {...props} />);

    const imgs = screen.getAllByRole("img");
    const hasAvatar1 = imgs.some(
      (img) => img.getAttribute("src") === props.avatarSrc,
    );
    const hasAvatar2 = imgs.some(
      (img) => img.getAttribute("src") === props.avatarSrc2,
    );
    const hasAvatar3 = imgs.some(
      (img) => img.getAttribute("src") === props.avatarSrc3,
    );

    expect(hasAvatar1).toBe(true);
    expect(hasAvatar2).toBe(true);
    expect(hasAvatar3).toBe(true);
  });

  test("renders basic project info sections", () => {
    render(<ProjectTeam {...props} />);

    expect(screen.getByText(/equipo/i)).toBeInTheDocument();
    expect(screen.getByText(/frontend/i)).toBeInTheDocument();
    expect(screen.getByText(/backend/i)).toBeInTheDocument();
    expect(screen.getByText(/duración/i)).toBeInTheDocument();
    expect(screen.getByText(/inscripción/i)).toBeInTheDocument();
  });
});
