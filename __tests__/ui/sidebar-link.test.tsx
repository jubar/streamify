import SidebarLink from "@/components/ui/sidebar-link";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

describe("Sidebar link component", () => {
  it("should render the icon and label", () => {
    mockUsePathname.mockReturnValue("/dashboard");

    render(<SidebarLink icon="🚀" label="Dashboard" href="/dasboard" />);

    const icon = screen.getByText("🚀");
    const label = screen.getByText("Dashboard");
    const link = screen.getByRole("link");

    expect(icon).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/dasboard");
  });

  it("should apply the active style when the path matches", () => {
    mockUsePathname.mockReturnValue("/dashboard");

    render(<SidebarLink icon="🚀" label="Dashboard" href="/dashboard" />);

    const link = screen.getByRole("link");

    expect(link).toHaveClass("bg-gradient-to-t from-white/30 to-white/20");
  });

  it("should apply the active style when nested routes", () => {
    mockUsePathname.mockReturnValue("/dashboard/users");

    render(<SidebarLink icon="🚀" label="Dashboard" href="/dashboard" />);

    const link = screen.getByRole("link");

    expect(link).toHaveClass("bg-gradient-to-t from-white/30 to-white/20");
  });

  it("should apply the hover style when the path does not match", () => {
    mockUsePathname.mockReturnValue("/");

    render(<SidebarLink icon="🚀" label="Dashboard" href="/dashboard" />);

    const link = screen.getByRole("link");
    fireEvent(link, new MouseEvent("mouseover"));

    expect(link).toHaveClass(
      "hover:bg-gradient-to-t hover:from-white/20 hover:to-white/10"
    );
  });
});
