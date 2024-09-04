import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

interface TopArtistProps {
  artist: string;
  song: string;
  albumCover: string;
  artistAvatar: string;
}

export default function TopArtist({
  artist,
  song,
  albumCover,
  artistAvatar,
}: TopArtistProps) {
  return (
    <Card
      isFooterBlurred
      className="flex-2 h-[300px] md:h-[500px] xl:h-[350px] drop-shadow-lg"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <h4
          role="heading"
          className="text-white/90 font-medium text-2xl drop-shadow-xl"
        >
          Top Artist
        </h4>
      </CardHeader>
      <Image
        role="img"
        isZoomed
        removeWrapper
        alt="Album cover image"
        className="z-0 w-full h-full object-cover"
        src={albumCover}
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            role="img"
            alt="Artist avatar"
            className="rounded-full w-10 h-11 bg-black"
            src={artistAvatar}
          />
          <div className="flex flex-col">
            <p className="text-sm text-white/90 font-bold">{artist}</p>
            <p className="text-tiny text-white/80">{song}</p>
          </div>
        </div>
        <Button role="button" radius="full" size="sm" color="secondary">
          Play now
        </Button>
      </CardFooter>
    </Card>
  );
}
