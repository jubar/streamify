import MainStats from "@/components/dashboard.tsx/main-stats";
import TopSongs from "@/components/dashboard.tsx/top-songs";
import TopArtist from "@/components/ui/top-artist";

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-8 py-4">
      <div className="gap-6 flex flex-col xl:flex-row flex-1 w-full ">
        <div className="flex flex-col gap-6 flex-1">
          <MainStats />

          <div className="flex bg-slate-500 rounded-md h-[220px]">
            Aca va a ir un banner
          </div>

          <div>Aca van a ir los graficos</div>
        </div>

        <div className="flex flex-col">
          <div className="w-full sm:w-2/3 lg:w-3/4 xl:w-full">
            <TopArtist
              artist="La Tabare"
              song="Blues de los esclavos de ahora"
              albumCover="https://i.scdn.co/image/ab67616d0000b273c27bfe8bccec8a1f7d3b2469"
              artistAvatar="https://i.scdn.co/image/ab67616100005174ecfbc2083dada0374928ad98"
            />
          </div>
          <TopSongs />
        </div>
      </div>
    </div>
  );
}
