import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

export default function TopArtist() {
  return (
    <Card
      isFooterBlurred
      className="flex-2 h-[300px] md:h-[500px] xl:h-[350px] drop-shadow-lg"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <h4 className="text-white/90 font-medium text-2xl drop-shadow-xl">
          Top Artist
        </h4>
      </CardHeader>
      <Image
        isZoomed
        removeWrapper
        alt="La Tabare"
        className="z-0 w-full h-full object-cover"
        src="https://i.scdn.co/image/ab67616d0000b273c27bfe8bccec8a1f7d3b2469"
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            className="rounded-full w-10 h-11 bg-black"
            src="https://i.scdn.co/image/ab67616100005174ecfbc2083dada0374928ad98"
          />
          <div className="flex flex-col">
            <p className="text-sm text-white/90 font-bold">La tabare</p>
            <p className="text-tiny text-white/80">New single from La tabare</p>
          </div>
        </div>
        <Button radius="full" size="sm">
          Play now
        </Button>
      </CardFooter>
    </Card>
  );
}
