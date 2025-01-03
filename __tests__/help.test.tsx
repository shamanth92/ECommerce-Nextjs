import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Help from "@/app/help/page";
import userEvent from "@testing-library/user-event";
import mediaQuery from "css-mediaquery";

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

function createMatchMedia(width: number) {
  return (query: string) => ({
    matches: mediaQuery.match(query, {
      width,
    }),
    addEventListener: () => {},
    removeEventListener: () => {},
    onchange: () => {},
    addListener: () => {},
    removeListener: () => {},
    media: "",
    dispatchEvent: jest.fn(),
  });
}

describe("Help", () => {
  it("test for header texts", () => {
    window.matchMedia = createMatchMedia(1920);

    render(<Help />);

    const helpText = screen.getByText("Frequently Asked Questions");
    const helpTextTwo = screen.getByText("Still have questions?");

    expect(helpText).toBeInTheDocument();
    expect(helpTextTwo).toBeInTheDocument();
  });

  it("test if the buttons are present", () => {
    window.matchMedia = createMatchMedia(1024);

    render(<Help />);

    const contactButton = screen.getByRole("button", { name: "Contact us" });
    const chatButton = screen.getByRole("button", {
      name: "Chat with a Virtual Agent",
    });

    expect(contactButton).toBeInTheDocument();
    expect(chatButton).toBeInTheDocument();
  });

  it("test chat button click opens chat box", async () => {
    const user = userEvent.setup();

    render(<Help />);

    const chatButton = screen.getByRole("button", {
      name: "Chat with a Virtual Agent",
    });
    await user.click(chatButton);

    expect(screen.getByText("Conversation with ShopBot")).toBeInTheDocument();
  });
});
