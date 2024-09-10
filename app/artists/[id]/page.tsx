import AlbumDetail from "@/app/dashboard/artists/album-detail";
import ArtistDetail from "@/app/dashboard/artists/artist-detail";
import { getArtist } from "@/lib/api";
import { Divider } from "@nextui-org/react";
import { redirect } from "next/navigation";

export default async function ArtistDetailPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    // This page requires an ID to be visited.
    redirect("/");
  }

  const artist = await getArtist(parseInt(params.id));

  if (!artist) {
    throw new Error("Artist not found");
  }

  function jsDay(releaseDate: any) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col p-4">
      <ArtistDetail
        name={artist.name}
        imageUrl={artist.imageUrl}
        verified={artist.verified}
      />

      <h2 className="text-2xl mt-8 mb-4">Discography</h2>
      <Divider className="mb-4" />
      {artist.albums.map((album) => (
        <AlbumDetail
          key={album.id}
          coverImageUrl={album.coverImageUrl}
          name={album.name}
          releaseOn={album.releaseOn}
          tracks={album.tracks}
        />
      ))}
    </div>
  );
}
