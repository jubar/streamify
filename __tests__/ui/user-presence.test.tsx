import UserPresence from "@/components/ui/user-presence";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("User presence component", () => {
  it("Should render the user info", () => {
    render(
      <UserPresence
        userName="Jhon Doe"
        userImageUrl="https://images/users/jhon"
        linkedinUser="doe-test-user"
      />
    );

    const userName = screen.getByText(/Jhon Doe/);
    const linkedinLink = screen.getByRole("link");
    const avatar = screen.getByAltText(/User image/);

    expect(userName).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://linkedin.com/in/doe-test-user"
    );
    expect(linkedinLink).toHaveTextContent("@doe-test-user"); // Includes the @ symbol
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://images/users/jhon");
  });
});
