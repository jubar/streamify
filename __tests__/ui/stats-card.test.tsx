import StatsCard from "@/components/ui/stats-card";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Stats card component", () => {
  it("should render the title and subtitle", () => {
    render(<StatsCard title="Awesome card" subtitle="A great description." />);

    const title = screen.getByRole("heading", { name: /Awesome card/ });
    const subtitle = screen.getByText("A great description.");
    const footer = screen.queryByRole("button", { name: /View all/ });

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(footer).not.toBeInTheDocument();
  });

  it("should render the view all button", () => {
    render(
      <StatsCard
        title="Awesome card"
        subtitle="A great description."
        viewAllLink="/users"
      />
    );

    const button = screen.getByRole("link", { name: /View all/ });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/users");
    expect(button).toHaveTextContent("View all");
  });
});
