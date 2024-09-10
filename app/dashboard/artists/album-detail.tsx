import { faker } from "@faker-js/faker";
import { Image, Link } from "@nextui-org/react";
import { Track } from "@prisma/client";
import dayjs from "dayjs";

interface AlbumDetailProps {
  albumId: number;
  coverImageUrl: string;
  name: string;
  releaseOn: Date;
  tracks: Track[];
}

export default function AlbumDetail({
  albumId,
  coverImageUrl,
  name,
  releaseOn,
  tracks,
}: AlbumDetailProps) {
  return (
    <div key={albumId} className="flex flex-1 flex-col md:flex-row">
      <Image
        src={coverImageUrl}
        alt={name}
        width={200}
        height={160}
        isBlurred
        className="p-1"
      />
      <div className="flex flex-col w-full ml-4">
        <div className="flex flex-1 justify-between">
          <h2 role="title" className="text-2xl">
            {name}
          </h2>
          <span className="text-small">
            Released on: {dayjs(releaseOn).format("MMMM, YYYY")}
          </span>
        </div>

        <div>
          {tracks.map((track, i) => (
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
  );
}
