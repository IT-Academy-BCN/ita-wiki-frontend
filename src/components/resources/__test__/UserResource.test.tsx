import { render, screen } from "@testing-library/react";
import { UserResource } from "../UserResource";
import { IntUser } from "../../../types";
const userMoock = {
  id: 5784345,
  displayName: "Usuario uno",
  photoURL: "http/asdadasd.jpg",
} as IntUser;

describe("UserResource Component", () => {
  it("The component must have the initial styles", () => {
    render(<UserResource user={userMoock} />);
    const userResource = screen.getByTestId("user-resource");
    const imgUser = screen.getByRole("img", {
      name: "User avatar",
    });
    expect(userResource).toHaveClass("flex gap-2 items-center");
    expect(imgUser).toHaveClass("rounded-full w-[28px] h-[28px]");
  });

  it("Tiene que rederizar los datos del usuario", () => {
    render(<UserResource user={userMoock} />);
    const displayName = screen.getByText("Usuario uno");
    const photoURL = screen.getByRole("img", { name: "User avatar" });
    expect(displayName).toBeInTheDocument();
    expect(photoURL).toBeInTheDocument();
  });
});
