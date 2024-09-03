import { Avatar, Chip } from "@nextui-org/react";
import VerifiedIcon from "../icons/verified";

interface TopSongItemProps {
  song: string;
  artist: string;
  imageUrl: string;
  isVerified: boolean;
  plays: number;
}

export default function TopSongItem({
  song,
  artist,
  imageUrl,
  isVerified,
  plays,
}: TopSongItemProps) {
  return (
    <div className="flex flex-1 rounded-sm">
      <Avatar isBordered radius="sm" className="w-20 h-20" src={imageUrl} />
      <div className="flex flex-col flex-1 ml-4 justify-between">
        <div className="flex flex-col">
          <div className="flex flex-1 justify-between">
            <span className="text-lg font-semibold">{song}</span>
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
          <span className="text-md text-slate-500">{artist}</span>
        </div>
        <span className="text-tiny text-violet-500">
          {plays.toLocaleString()} plays
        </span>
      </div>
    </div>
  );
}
