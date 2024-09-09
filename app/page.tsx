import Player from "@/components/dashboard.tsx/player";
import SearchIcon from "@/components/icons/search";
import VerifiedIcon from "@/components/icons/verified";
import prisma from "@/prisma/db";
import { Card, CardFooter, Image, Input } from "@nextui-org/react";

export default async function Home() {
  const artist = await prisma.artist.findMany();

  return (
    <div className="flex flex-col px-4 md-px-10 py-8 pb-6 min-h-screen max-h-screen overflow-hidden relative">
      <div className="flex grow-0 items-center justify-center mb-10">
        <Input
          isClearable
          radius="lg"
          color="secondary"
          size="lg"
          className="max-w-[500px] drop-shadow-sm"
          placeholder="What do you want to play?"
          startContent={
            <SearchIcon className=" size-6 text-black/50 mb-0.5 dark:text-white/90 text-slate-400 " />
          }
        />
      </div>
      <div className="flex flex-1 flex-wrap gap-6 justify-center overflow-y-auto pb-[120px]">
        {artist.map((artist) => (
          <Card
            key={artist.id}
            isFooterBlurred
            radius="lg"
            className="border-none shadow-md h-[200px]"
          >
            <Image
              alt={`Image for ${artist.name}`}
              className="object-cover"
              isZoomed
              height={200}
              src={artist.imageUrl}
              width={200}
            />
            <CardFooter className="justify-between before:bg-white border-white/30 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] ml-1 z-10">
              <div className="flex flex-1 items-center text-white/90">
                {artist.verified && <VerifiedIcon className="size-6 mr-2" />}
                <span className=" text-md shadow-sm text-ellipsis line-clamp-1">
                  {artist.name}
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="w-[90%] h-[98px] left-[50%] -translate-x-[50%] rounded-lg md:rounded-full drop-shadow-lg flex justify-center absolute bottom-6 z-30 bg-purple-300/70 backdrop-blur-md ">
        <Player />
      </div>
    </div>
  );
}
