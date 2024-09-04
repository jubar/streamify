import TopSongItem from "@/components/ui/top-song-item";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Top song item component", () => {
  it("should render the title and subtitle", () => {
    const listensVal = 1780536;
    const listenFormatted = listensVal.toLocaleString();

    render(
      <TopSongItem
        artist="Johnny Cash"
        song="Ring of Fire"
        albumCover="https://images/covers/cash"
        isVerified={true}
        listens={listensVal}
      />
    );

    const artist = screen.getByText(/^Johnny Cash$/);
    const song = screen.getByText(/^Ring of Fire$/);
    const cover = screen.getByAltText(/Album cover image/);
    const listens = screen.getByText(`${listenFormatted} listens`);

    expect(artist).toBeInTheDocument();
    expect(song).toBeInTheDocument();
    expect(cover).toBeInTheDocument();
    expect(cover).toHaveAttribute("src", "https://images/covers/cash");
    expect(listens).toBeInTheDocument();
  });

  it("should render the verified chip", () => {
    render(
      <TopSongItem
        artist="Johnny Cash"
        song="Ring of Fire"
        albumCover="https://images/covers/cash"
        isVerified={true}
        listens={1780536}
      />
    );

    const verified = screen.getByText("Verified");

    expect(verified).toBeInTheDocument();
  });

  it("should not render the verified chip", () => {
    render(
      <TopSongItem
        artist="Johnny Cash"
        song="Ring of Fire"
        albumCover="https://images/covers/cash"
        isVerified={false}
        listens={1780536}
      />
    );

    const verified = screen.queryByText("Verified");

    expect(verified).not.toBeInTheDocument();
  });
});
