import prisma from "@/prisma/db";
import { cache } from "react";

// This function will be cached to use the same data
// if the function is called again.
// 💡 This data only changes once a month
export const getUserGrowth = cache(async () => {
  const metrics = await prisma.userMetrics.findMany({
    orderBy: [
      {
        year: "asc",
      },
      { month: "asc" },
    ],
    take: 12,
  });

  return metrics;
});

export type TopSongData = {
  id: number;
  name: string;
  url: string;
  albumbId: number;
  coverImageUrl: string;
  artist: string;
  listens: number;
  verified: boolean;
};

// This function will be cached to use the same data
export const getTopFiveSongs = cache(async (): Promise<TopSongData[]> => {
  console.log("Me llamaron");
  const metrics = await prisma.$queryRaw`SELECT
      track.id,
      track.name,
      track.url,
      track.albumId,
      artist.name as artist,
      artist.verified as verified,
      album.coverImageUrl as coverImageUrl,
      COUNT(stream.trackId) as listens
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
      listens DESC
    LIMIT
      5
  `;

  return metrics as TopSongData[];
});
