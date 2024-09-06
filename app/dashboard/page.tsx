import UserGrowthChart from "@/components/charts/user-growth-chart";
import MainStats from "@/components/dashboard.tsx/main-stats";
import TopSongs from "@/components/dashboard.tsx/top-songs";
import TopArtist from "@/components/ui/top-artist";
import prisma from "@/prisma/db";

export default async function DashboardPage() {
  const userGrowth = await prisma.userMetrics.findMany({
    orderBy: [
      {
        year: "asc",
      },
      { month: "asc" },
    ],
    take: 12,
  });

  console.log("userGrowth >>>>>>>>>>", userGrowth);

  const userGrowthData = {
    allUsers: [1, 2, 5, 8, 9, 13, 18, 20, 25, 30, 35, 40],
    activeUsers: [1, 2, 4, 6, 8, 10, 15, 10, 16, 22, 29, 35],
  };

  const topFiveSongs = await prisma.$queryRaw`SELECT
    track.id,
    track.name,
    track.url,
    track.albumId,
    artist.name as artist,
    COUNT(stream.trackId) as total
  FROM 
    stream
  INNER JOIN
    track
  ON
    stream.trackId = track.id
  INNER JOIN
    album
  ON 
    track.albumId = album.id
  INNER JOIN 
    artist 
  ON 
    album.artistId = artist.id
  GROUP BY
    trackid
  ORDER BY
    total DESC
  LIMIT
    5
`;

  console.log("top five songs", topFiveSongs);

  return (
    <div className="flex flex-col w-full min-h-screen px-8 py-4">
      <div className="gap-6 flex flex-col xl:flex-row flex-1 w-full">
        <div className="flex flex-col gap-6 flex-1">
          <MainStats />

          <div className="flex bg-slate-500 rounded-md h-[220px]">
            Aca va a ir un banner
          </div>

          <div className="flex flex-1">
            <div className="flex flex-1 max-w-[900px]">
              <UserGrowthChart chartData={userGrowthData} />
            </div>

            {/* <TopSongsChart chartData={topFiveSongs} />

            <RevenueChart /> */}
          </div>
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
