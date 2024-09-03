import VerifiedIcon from "@/components/icons/verified";
import {
  Avatar,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-8 py-4">
      <h1>Dashboard page, the dashboard</h1>

      <span>
        Total users & active users | Total streams | revenue | Top artists{" "}
      </span>

      <div className="gap-6 flex flex-1 w-full ">
        <div className="flex flex-col gap-6 flex-1">
          <div className="grid grid-cols-3 gap-6">
            <Card className="flex-1 bg-gradient-to-tr from-blue-700/60 via-purple-300 to-pink-500/25 h-[150px] drop-shadow-md">
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <h3 className="text-white font-medium text-large drop-shadow-md">
                  13k active users
                </h3>
                <h4 className="text-white/80 text-sm  drop-shadow-md">
                  from 16.3k total users
                </h4>
              </CardHeader>
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <Button
                  className="text-tiny text-white bg-black/20"
                  variant="flat"
                  color="default"
                  radius="lg"
                  size="sm"
                >
                  View all users
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex-1 bg-gradient-to-tr from-blue-700/60 via-purple-300 to-pink-500/25 h-[150px]  drop-shadow-md">
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <h3 className="text-white font-medium text-large  drop-shadow-md">
                  Revenue
                </h3>
                <h4 className="text-white/80 text-sm  drop-shadow-md">
                  This month 7.8k USD | Last month 6.9k USD
                </h4>
              </CardHeader>
            </Card>

            <Card className="flex-1 bg-gradient-to-tr from-blue-700/60 via-purple-300 to-pink-500/25 h-[150px]  drop-shadow-md">
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <h3 className="text-white font-medium text-large drop-shadow-md">
                  Streams this month
                </h3>
                <h4 className="text-white/80 text-sm  drop-shadow-md">
                  9 millions of streams from 32 countries
                </h4>
              </CardHeader>

              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <Button
                  className="text-tiny text-white bg-black/20"
                  variant="flat"
                  color="default"
                  radius="lg"
                  size="sm"
                >
                  View all
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex bg-slate-500 rounded-md h-[220px]">
            Aca va a ir un banner
          </div>

          <div>Aca van a ir los graficos</div>
        </div>

        <div className="flex flex-col">
          <Card isFooterBlurred className="flex-2 h-[350px]">
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
                  <p className="text-tiny text-white/80">
                    New single from La tabare
                  </p>
                </div>
              </div>
              <Button radius="full" size="sm">
                Play now
              </Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col gap-6 mt-4">
            <h1 className="text-xl font-bold">Top 5 songs</h1>
            <div className="flex flex-1 rounded-sm">
              <Avatar
                isBordered
                radius="sm"
                className="w-20 h-20"
                src="https://i.scdn.co/image/ab67616d00001e02f877753076ae48397c1a789f"
              />
              <div className="flex flex-col flex-1 ml-4 justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-1 justify-between">
                    <span className="text-lg font-semibold">La salvación</span>
                    <Chip
                      size="sm"
                      endContent={<VerifiedIcon />}
                      variant="flat"
                      color="secondary"
                    >
                      Verified
                    </Chip>
                  </div>
                  <span className="text-md text-slate-500">Arde Bogota</span>
                </div>
                <span className="text-tiny text-violet-500">
                  1.780.536 plays
                </span>
              </div>
            </div>
            <div className="flex flex-1 rounded-sm">
              <Avatar
                isBordered
                radius="sm"
                className="w-20 h-20"
                src="https://i.scdn.co/image/ab67616d00001e025043d72bbdd36cbee49af7c5"
              />
              <div className="flex flex-col flex-1 ml-4 justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-1 justify-between">
                    <span className="text-lg font-semibold">
                      Nada que perder
                    </span>
                    <Chip
                      size="sm"
                      endContent={<VerifiedIcon />}
                      variant="flat"
                      color="secondary"
                    >
                      Verified
                    </Chip>
                  </div>
                  <span className="text-md text-slate-500">Robe</span>
                </div>
                <span className="text-tiny text-violet-500">
                  1.670.986 plays
                </span>
              </div>
            </div>
            <div className="flex flex-1 rounded-sm">
              <Avatar
                isBordered
                radius="sm"
                className="w-20 h-20"
                src="https://i.scdn.co/image/ab67616d00001e024aa4ee69ce84f959ce3636d0"
              />
              <div className="flex flex-col flex-1 ml-4 justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-1 justify-between">
                    <span className="text-lg font-semibold">Hacha</span>
                    <Chip
                      size="sm"
                      endContent={<VerifiedIcon />}
                      variant="flat"
                      color="secondary"
                    >
                      Verified
                    </Chip>
                  </div>
                  <span className="text-md text-slate-500">Rey Toro</span>
                </div>
                <span className="text-tiny text-violet-500">
                  1.660.131 plays
                </span>
              </div>
            </div>

            <div className="flex flex-1 rounded-sm">
              <Avatar
                isBordered
                radius="sm"
                className="w-20 h-20"
                src="https://i.scdn.co/image/ab67616d00001e0251c02a77d09dfcd53c8676d0"
              />
              <div className="flex flex-col flex-1 ml-4 justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-1 justify-between">
                    <span className="text-lg font-semibold">
                      Highway to hell
                    </span>
                    <Chip
                      size="sm"
                      endContent={<VerifiedIcon />}
                      variant="flat"
                      color="secondary"
                    >
                      Verified
                    </Chip>
                  </div>
                  <span className="text-md text-slate-500">AC/DC</span>
                </div>
                <span className="text-tiny text-violet-500">
                  1.600.982 plays
                </span>
              </div>
            </div>

            <div className="flex flex-1 rounded-sm">
              <Avatar
                isBordered
                radius="sm"
                className="w-20 h-20"
                src="	https://i.scdn.co/image/ab67616d00001e02c0e16fbf934a140be545a497"
              />
              <div className="flex flex-col flex-1 ml-4 justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-1 justify-between">
                    <span className="text-lg font-semibold">
                      Amor de Verano
                    </span>
                  </div>
                  <span className="text-md text-slate-500">Marlena</span>
                </div>
                <span className="text-tiny text-violet-500">
                  1.428.1847 plays
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
