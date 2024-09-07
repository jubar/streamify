import { getTopFiveSongs } from "@/lib/api";
import TopSongItem from "../ui/top-song-item";

export default async function TopSongs() {
  // 💡 These values are cached and are used by this component
  // and the TopSongsChart component.
  // We are using the same data, but we only execute the query once.
  // 🧠 The data is cached using react cache.
  const topFiveSongs = await getTopFiveSongs();

  return (
    <div className="flex flex-col gap-6 mt-4">
      <h1 className="text-xl font-bold dark:text-slate-100">Top 5 songs</h1>
      {topFiveSongs.map((song) => (
        <TopSongItem
          key={song.id}
          song={song.name}
          artist={song.artist}
          albumCover={song.coverImageUrl}
          isVerified={song.verified}
          listens={song.listens}
        />
      ))}
    </div>
  );
}
