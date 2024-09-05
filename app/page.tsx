import VerifiedIcon from "@/components/icons/verified";
import prisma from "@/prisma/db";
import { Card, CardBody, CardHeader, Chip, Image } from "@nextui-org/react";

export default async function Home() {
  const artist = await prisma.artist.findMany();

  return (
    <div className="flex min-h-screen p-0">
      <h1>Home page, the player</h1>

      <div className="gap-6 flex flex-1 flex-wrap">
        {artist.map((artist) => (
          <Card className="py-4" key={artist.id}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">{artist.name}</h4>
              {artist.verified && (
                <Chip
                  size="sm"
                  endContent={<VerifiedIcon />}
                  variant="flat"
                  color="secondary"
                >
                  <span className="hidden sm:flex">Verified</span>
                </Chip>
              )}
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Artist image"
                className="object-cover rounded-xl"
                src={artist.imageUrl}
                width={270}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
