// The intention of this file is to give access the streams throught
// the client pages unsing fetch requests.
import prisma from "@/prisma/db";
import { NextRequest } from "next/server";

export interface StreamResponseItem {
  total: number;
  streamId: number;
  streamDate: string;
  userId: number;
  userName: string;
  subscriptionId: number;
  subscriptionName: string;
  subscriptionPrice: number;
  trackId: number;
  trackName: string;
  trackUrl: string;
  albumId: number;
  albumName: string;
  albumCoverImageUrl: string;
  artistId: number;
  artistName: string;
  artistImageUrl: string;
  artistVerified: boolean;
}

export interface StreamResponse {
  totalRows: number;
  items: StreamResponseItem[];
}

// If a client access directly to the api without params, this function
// returns only the latest 10 streams.
export async function GET(request: NextRequest, context: any) {
  const params = request.nextUrl.searchParams;

  // 🧠 Here we should whitelist the params, but since this is a demo
  // we'll skip the validation.
  // 🫣 Also, we are assuming that the client will always send the correct
  // values for the params.
  const page = params.get("page") || "1";
  const perPage = params.get("perPage") || "10";
  const filter = params.get("filter") || "";
  let sortBy = params.get("sortBy") || "streamId";
  let sortDirection = params.get("sortDirection") || "DESC";

  const validSorts = ["trackName", "artistName", "streamId"];
  if (!validSorts.includes(sortBy)) {
    sortBy = "streamId";
  }

  const validSortDirections = ["ASC", "DESC"];
  if (!validSortDirections.includes(sortDirection.toUpperCase())) {
    sortDirection = "DESC";
  }

  const filterValue = `%${filter}%`;
  const sortValue = `${sortBy} ${sortDirection}`;
  const skip = +page * +perPage;
  const take = parseInt(perPage);

  // I need to use $queryRaw because I'm using a CTE to filter the data.
  // Prisma doesn't support CTEs and doesn't give an easy way to count total rows
  // for complex queries including nested models.
  const data: StreamResponseItem[] = await prisma.$queryRaw`
  WITH DataStreamsTable AS (
    SELECT
        s.id as streamId,
        s.createdAt as streamDate,
        u.id as userId,
        u.name as userName,
        sub.id as subscriptionId,
        sub.name as subscriptionName,
        sub.price as subscriptionPrice,
        t.id as trackId,
        t.name AS trackName,
        t.url as trackUrl,
        alb.id as albumId,
        alb.name AS albumName,
        alb.coverImageUrl as albumCoverImageUrl,
        art.id as artistId,
        art.name as artistName,
        art.imageUrl as artistImageUrl,
        art.verified as artistVerified
    FROM 
        stream AS s
    INNER JOIN
        user AS u
    ON
        s.userId = u.id
    INNER JOIN 
        userSubscription AS us
    ON
        u.id = us.userId
    INNER JOIN
        subscription AS sub
    ON
        us.subscriptionId = sub.id
    INNER JOIN
        track AS t
    ON
        s.trackId = t.id
    INNER JOIN 
        album AS alb
    ON
        t.albumId = alb.id
    INNER JOIN
        artist AS art
    ON
        alb.artistId = art.id
    WHERE
        trackName LIKE ${filterValue} OR albumName LIKE ${filterValue} OR artistName LIKE ${filterValue}
    ORDER BY
        ${sortValue}
)

SELECT 
    CAST((SELECT COUNT(*) FROM DataStreamsTable) AS FLOAT) AS total,
    *
FROM 
    DataStreamsTable
LIMIT 
    ${take}
OFFSET 
    ${skip};
  `;

  if (data.length === 0) {
    return Response.json({ totalRows: 0, items: [] });
  }

  return Response.json({ totalRows: data[0].total || 0, items: data });
}
