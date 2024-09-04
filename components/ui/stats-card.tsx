import { Button, Card, CardFooter, CardHeader } from "@nextui-org/react";
import Link from "next/link";

interface StatsCardProps {
  title: string;
  subtitle: string;
  viewAllLink?: string;
}

export default function StatsCard({
  title,
  subtitle,
  viewAllLink,
}: StatsCardProps) {
  return (
    <Card className="flex-1 bg-gradient-to-tr from-blue-400 via-purple-300 to-pink-200 dark:from-blue-300 dark:via-purple-400 dark:to-pink-300 h-[150px] xl:h-[170px] drop-shadow-lg border-[1px] border-slate-100/10">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <h3
          role="heading"
          className="text-white font-medium text-large drop-shadow-md"
        >
          {title}
        </h3>
        <h4 className="text-white/80 text-sm  drop-shadow-md">{subtitle}</h4>
      </CardHeader>
      {viewAllLink && (
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <Button
            role="link"
            as={Link}
            href={viewAllLink}
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            View all
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
