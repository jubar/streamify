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
    <Card className="relative flex-1 flex-col justify-between bg-violet-400/30 h-[150px] xl:h-[170px] drop-shadow-sm rounded-lg border-[1px] border-slate-100/10">
      <CardHeader className="flex-col !items-start">
        <h3
          role="heading"
          className="text-slate-700 font-medium text-large drop-shadow-sm"
        >
          {title}
        </h3>
        <h4 className="text-slate-700 text-sm  drop-shadow-sm">{subtitle}</h4>
      </CardHeader>
      {viewAllLink && (
        <CardFooter className="flex w-full justify-end">
          <Button
            role="link"
            as={Link}
            href={viewAllLink}
            className="text-tiny text-slate-700"
            variant="flat"
            color="secondary"
            radius="md"
            size="sm"
          >
            View all
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
