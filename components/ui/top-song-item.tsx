import { Avatar, Chip } from "@nextui-org/react";
import VerifiedIcon from "../icons/verified";

interface TopSongItemProps {
  song: string;
  artist: string;
  albumCover: string;
  isVerified: boolean;
  listens: number;
}

export default function TopSongItem({
  song,
  artist,
  albumCover,
  isVerified,
  listens,
}: TopSongItemProps) {
  return (
    <div className="flex flex-1 rounded-sm">
      <Avatar
        isBordered
        radius="sm"
        className="w-[60px] h-[60px]"
        alt="Album cover image"
        src={albumCover}
      />
      <div className="flex flex-col flex-1 ml-4 justify-between">
        <div className="flex flex-col">
          <div className="flex flex-1 justify-between">
            <span className="text-md font-semibold dark:text-slate-100">
              {song}
            </span>
            {isVerified && (
              <Chip
                size="sm"
                endContent={<VerifiedIcon />}
                variant="flat"
                color="secondary"
              >
                <span className="hidden sm:flex">Verified</span>
              </Chip>
            )}
          </div>
          <span className="text-sm text-slate-500 dark:text-stone-300">
            {artist}
          </span>
        </div>
        <span className="text-tiny text-violet-500">
          {listens.toLocaleString()} listens
        </span>
      </div>
    </div>
  );
}
