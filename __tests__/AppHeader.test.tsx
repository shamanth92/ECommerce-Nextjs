import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import userEvent from "@testing-library/user-event";
// import { useRouter } from "next/navigation";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(), // Mock the initializeApp function
}));

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("App Header", () => {
  it("test for header text", () => {
    render(<AppHeader />);

    const header = screen.getByText("Next ECommerce");

    expect(header).toBeInTheDocument();
  });

  it("test for header icons", () => {
    render(<AppHeader />);

    const accountAvatar = screen.getByTestId("avatar-icon");
    const homeIcon = screen.getByTestId("HomeIcon");
    const favoritesIcon = screen.getByTestId("FavoriteIcon");
    const cartIcon = screen.getByTestId("ShoppingBagIcon");

    expect(accountAvatar).toBeInTheDocument();
    expect(homeIcon).toBeInTheDocument();
    expect(favoritesIcon).toBeInTheDocument();
    expect(cartIcon).toBeInTheDocument();
  });

  it("test links for header icons", () => {
    render(<AppHeader />);

    const links = screen.getAllByRole("link");

    const routes = ["/products", "/products/favorites", "/products/checkout"];

    links.forEach((link, i) => {
      expect(link).toHaveAttribute("href", routes[i]);
    });
  });

  it("test clicking on avatar opens the menu", async () => {
    const user = userEvent.setup();

    render(<AppHeader />);

    const accountAvatar = screen.getByTestId("avatar-icon");
    await user.click(accountAvatar);

    expect(screen.getByText("My account")).toBeInTheDocument();
    expect(screen.getByText("View Orders")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
  });

  it("test clicking on avatar opens the menu", async () => {
    const useRouter = jest.spyOn(require("next/navigation"), "useRouter");
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
    }));

    const user = userEvent.setup();

    render(<AppHeader />);

    const accountAvatar = screen.getByTestId("avatar-icon");
    await user.click(accountAvatar);
    const myAccountOption = screen.getByText("My account");
    await user.click(myAccountOption);

    expect(useRouter).toHaveBeenCalled();
  });
});