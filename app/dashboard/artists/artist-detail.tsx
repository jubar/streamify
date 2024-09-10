import VerifiedIcon from "@/components/icons/verified";
import { Avatar, AvatarGroup, Button, Chip, Image } from "@nextui-org/react";

interface ArtistDetailProps {
  name: string;
  imageUrl: string;
  verified: boolean;
}

export default function ArtistDetail({
  name,
  imageUrl,
  verified,
}: ArtistDetailProps) {
  return (
    <div className="flex flex-1 flex-col items-center md:items-stretch md:flex-row p-4 bg-violet-400/30 rounded-lg drop-shadow-md">
      <Image
        src={imageUrl}
        alt={name}
        width={200}
        height={200}
        isBlurred
        className="p-1"
      />

      <div className="flex flex-col flex-1 md:ml-4 p-1 items-center md:items-start">
        <h1 role="title" className="text-2xl md:text-4xl mb-2">
          {name}
        </h1>
        {verified && (
          <Chip
            size="sm"
            endContent={<VerifiedIcon />}
            variant="flat"
            color="secondary"
          >
            <span className="flex">Artist Verified</span>
          </Chip>
        )}

        <div className="flex flex-col flex-1 md:flex-row pb-1 mt-4 md:mt-0 md:justify-between md:items-end w-full">
          <AvatarGroup isBordered>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
          </AvatarGroup>
          <Button color="secondary" className="mt-4 md:mt-0">
            Play now
          </Button>
        </div>
      </div>
    </div>
  );
}
