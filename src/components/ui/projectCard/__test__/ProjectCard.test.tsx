import { render, screen } from "@testing-library/react";
import ProjectCard from "../ProjectCard";

describe("ProjectCard", () => {
  const props = {
    logoFront: "../assets/react.svg",
    logoBack: "../assets/logo-php 1.svg",
    avatarSrc: "../assets/project-avatar1.svg",
    avatarSrc2: "../assets/project-avatar2.svg",
    avatarSrc3: "../assets/project-avatar3.svg",
  };

  test("renders tech sections with logos", () => {
    render(<ProjectCard {...props} />);

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
});
