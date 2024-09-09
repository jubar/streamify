import VerifiedIcon from "@/components/icons/verified";
import { getArtist } from "@/lib/api";
import { faker } from "@faker-js/faker";
import {
  Avatar,
  AvatarGroup,
  Button,
  Chip,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";
import dayjs from "dayjs";
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
      <div className="flex flex-1 p-4 bg-violet-400/30 rounded-lg drop-shadow-md">
        <Image
          src={artist.imageUrl}
          alt={artist.name}
          width={200}
          height={200}
          isBlurred
          className="p-1"
        />

        <div className="flex flex-col flex-1 ml-4 p-1 justify-between">
          <div>
            <h1 role="title" className="text-4xl mb-2">
              {artist.name}
            </h1>
            {artist.verified && (
              <Chip
                size="sm"
                endContent={<VerifiedIcon />}
                variant="flat"
                color="secondary"
              >
                <span className="hidden sm:flex">Artist Verified</span>
              </Chip>
            )}
          </div>

          <div className="justify-self-end flex pb-1 items-center justify-between">
            <AvatarGroup isBordered>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </AvatarGroup>
            <Button color="secondary">Play now</Button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl mt-8 mb-4">Discography</h2>
      <Divider className="mb-4" />
      {artist.albums.map((album) => (
        <div key={album.id} className="flex flex-1">
          <Image
            src={album.coverImageUrl}
            alt={album.name}
            width={200}
            height={160}
            isBlurred
            className="p-1"
          />
          <div className="flex flex-col w-full ml-4">
            <div className="flex flex-1 justify-between">
              <h2 role="title" className="text-2xl">
                {album.name}
              </h2>
              <span className="text-small">
                Released on: {dayjs(album.releaseOn).format("MMMM, YYYY")}
              </span>
            </div>

            <div>
              {album.tracks.map((track, i) => (
                <div
                  key={track.id}
                  className="flex flex-1 items-center gap-2 hover:bg-violet-400/30 px-2 py-1 rounded-lg cursor-pointer"
                >
                  <span className="text-slate-500 text-md">{i + 1}. </span>
                  <span className="text-slate-500">
                    {faker.helpers.arrayElement([
                      "4:32",
                      "4:56",
                      "3:51",
                      "4:01",
                      "3:07",
                    ])}
                  </span>
                  <span className="font-md ml-1">{track.name}</span>
                  <div className="flex flex-1 justify-end">
                    <Link
                      href="#"
                      color="secondary"
                      size="sm"
                      className="justify-self-end"
                    >
                      Play now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
