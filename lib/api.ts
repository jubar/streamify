import prisma from "@/prisma/db";
import dayjs from "dayjs";
import { cache } from "react";

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

/**
 * This function returns the user growth metrics.
 * 💡 After get the data from the data base, the result set will be cached
 * using React Cache for server components in order to re-use in multiple components.
 * @returns {Promise<UserMetrics[]>} - The user growth metrics.
 */
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

/**
 * This function returns the top five listened songs.
 * 💡 After get the data from the data base, the result set will be cached
 * using React Cache for server components in order to re-use in multiple components.
 * @returns {Promise<TopSongData[]>} - The top five listened songs.
 */
export const getTopFiveSongs = cache(async (): Promise<TopSongData[]> => {
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

/**
 * This function returns the number of streamed songs in the last 30 days.
 * @returns {Pomise<number>} - The total number of streams in the last 30 days.
 */
export const getTotalStreamsThisMonth = async (): Promise<number> => {
  const result = await prisma.stream.count({
    where: {
      createdAt: {
        gte: dayjs().subtract(30, "day").toISOString(),
      },
    },
  });

  return result;
};

/**
 * This function returns the total number of users in the DB.
 * @returns {Promise<number>} - The total number of users.
 */
export const getTotalUsers = async (): Promise<number> => {
  const result = await prisma.user.count();
  return parseInt(result.toString());
};

/**
 * This function returns the total number of active users from the given date.
 * @param {string} from - The date in ISO format from which we want to get the active users.
 * @returns {Promise<number>} - The total number of active users for the given date.
 */
export const getTotalActiveUsers = async (from: string): Promise<number> => {
  const data: { result: number }[] =
    await prisma.$queryRaw`SELECT COUNT(DISTINCT userId) as result FROM Stream WHERE 'createdAt' >= ${from}`;
  return parseInt(data[0].result.toString());
};

/**
 * This function returns the revenue of the current month or the previous month.
 * @param {boolean} thisMonth - If true, it will return the revenue of the current month. If false,
 * it will return the revenue of the previous month.
 * @returns {Promise<number>} - The revenue for the given period.
 */
export const getRevenueBySubscriptions = async (
  thisMonth: boolean
): Promise<number> => {
  const firstDayThisMonth = dayjs().startOf("month").toISOString();
  const firstDayLastMonth = dayjs()
    .subtract(1, "month")
    .startOf("month")
    .toISOString();
  const lastDayLastMonth = dayjs()
    .subtract(1, "month")
    .endOf("month")
    .toISOString();

  const from = thisMonth ? firstDayThisMonth : firstDayLastMonth;
  const to = thisMonth ? dayjs().toISOString() : lastDayLastMonth;

  const subscriptions = await prisma.userSubscription.findMany({
    where: {
      createdAt: {
        gte: from,
        lt: to,
      },
    },
    include: {
      // I'm including only the needed fields.
      subscription: {
        select: {
          price: true,
        },
      },
    },
  });

  const revenue = subscriptions.reduce(
    (acc, userSubscription) => acc + userSubscription.subscription.price,
    0
  );

  return revenue;
};
