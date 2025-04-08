import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Account from "@/app/account/page";
import userEvent from "@testing-library/user-event";
import mediaQuery from "css-mediaquery";
import OrderHistory from "@/components/orderHistory";

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

describe("Account", () => {
  it("test for account page fields", () => {
    render(<Account />);

    const name = screen.getByText("Name:");
    const email = screen.getByText("Email Address:");
    const memberSince = screen.getByText("Member since:");
    const lastLogged = screen.getByText("Last Logged In Activity:");

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(memberSince).toBeInTheDocument();
    expect(lastLogged).toBeInTheDocument();
  });

  it("test for tabs", () => {
    render(<Account />);

    const profile = screen.getByRole("tab", { name: "Profile" });
    const orderHistory = screen.getByRole("tab", { name: "Order History" });
    const savedAddresses = screen.getByRole("tab", {
      name: "Saved Addresses",
    });
    const paymentMethods = screen.getByRole("tab", {
      name: "Payment Methods",
    });

    expect(profile).toBeInTheDocument();
    expect(orderHistory).toBeInTheDocument();
    expect(savedAddresses).toBeInTheDocument();
    expect(paymentMethods).toBeInTheDocument();
  });

  it("test for switching tabs", async () => {
    const user = userEvent.setup();

    render(<Account />);

    const orderHistory = screen.getByRole("tab", { name: "Order History" });

    await user.click(orderHistory);

    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Order History"
    );

    const savedAddresses = screen.getByRole("tab", {
      name: "Saved Addresses",
    });

    await user.click(savedAddresses);

    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Saved Addresses"
    );

    const paymentMethods = screen.getByRole("tab", {
      name: "Payment Methods",
    });

    await user.click(paymentMethods);

    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Payment Methods"
    );
  });

  it("test for add address button opens dialog box", async () => {
    const user = userEvent.setup();

    render(<Account />);

    const savedAddresses = screen.getByRole("tab", {
      name: "Saved Addresses",
    });

    await user.click(savedAddresses);

    const addAddressButton = screen.getByRole("button", {
      name: "Add Address",
    });
    await user.click(addAddressButton);

    expect(screen.getByText("Add a new address")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("test for add address errors", async () => {
    const user = userEvent.setup();

    render(<Account />);

    const savedAddresses = screen.getByRole("tab", {
      name: "Saved Addresses",
    });

    await user.click(savedAddresses);

    const addAddressButton = screen.getByRole("button", {
      name: "Add Address",
    });
    await user.click(addAddressButton);

    await user.click(
      screen.getByRole("button", {
        name: "Save",
      })
    );

    expect(screen.getByText("Please enter a full name")).toBeInTheDocument();
  });

//   it("test for action buttons", async () => {
//     const user = userEvent.setup();

//     render(<Account />);

//     const savedAddresses = screen.getByRole("tab", {
//       name: "Saved Addresses",
//     });

//     await user.click(savedAddresses);

//     const defaultButton = screen.getByRole("button", {
//       name: "Set As Default",
//     });

//     expect(defaultButton).toBeInTheDocument();
//   });
});


//test for add address when empty, fill form and save
//test for add address when not empty
//test for action buttons when addresses are already present by mocking data
//test for functionalities of action buttons