"use client";

import { Button, Slider } from "@nextui-org/react";
import { NextIcon } from "../icons/next";
import { PauseCircleIcon } from "../icons/pause";
import { PreviousIcon } from "../icons/previous";
import { RepeatOneIcon } from "../icons/repeat";
import { ShuffleIcon } from "../icons/shuffle";

export default function Player() {
  return (
    <div className="flex flex-col w-full max-w-[500px] mt-2">
      <div className="flex w-full items-center justify-center">
        <Button
          isIconOnly
          className="data-[hover]:bg-foreground/10"
          radius="full"
          variant="light"
        >
          <RepeatOneIcon className="text-foreground/80" />
        </Button>
        <Button
          isIconOnly
          className="data-[hover]:bg-foreground/10"
          radius="full"
          variant="light"
        >
          <PreviousIcon />
        </Button>
        <Button
          isIconOnly
          className="w-auto h-auto data-[hover]:bg-foreground/10"
          radius="full"
          variant="light"
        >
          <PauseCircleIcon size={54} />
        </Button>
        <Button
          isIconOnly
          className="data-[hover]:bg-foreground/10"
          radius="full"
          variant="light"
        >
          <NextIcon />
        </Button>
        <Button
          isIconOnly
          className="data-[hover]:bg-foreground/10"
          radius="full"
          variant="light"
        >
          <ShuffleIcon className="text-foreground/80" />
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-tiny">1:23</p>
        <Slider
          aria-label="Music progress"
          className="mx-2"
          classNames={{
            track: "bg-default-500/30",
            thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
          }}
          color="foreground"
          defaultValue={33}
          size="sm"
        />
        <p className="text-tiny text-foreground/50">4:32</p>
      </div>
    </div>
  );
}
