import TopArtist from "@/components/ui/top-artist";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Top artist component", () => {
  it("should render the title and subtitle", () => {
    render(
      <TopArtist
        artist="Johnny Cash"
        song="Ring of Fire"
        albumCover="https://images/covers/cash"
        artistAvatar="https://images/artists/cash"
      />
    );

    const title = screen.getByRole("heading", { name: /Top Artist/ });
    const artist = screen.getByText(/^Johnny Cash$/);
    const song = screen.getByText(/^Ring of Fire$/);
    const cover = screen.getByAltText(/Album cover image/);
    const avatar = screen.getByAltText(/Artist avatar/);
    const button = screen.queryByRole("button", { name: /Play now/ });

    expect(title).toBeInTheDocument();
    expect(artist).toBeInTheDocument();
    expect(song).toBeInTheDocument();
    expect(cover).toBeInTheDocument();
    expect(cover).toHaveAttribute("src", "https://images/covers/cash");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://images/artists/cash");
    expect(button).toBeInTheDocument();
  });
});
