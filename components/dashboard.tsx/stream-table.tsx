"use client";

import { StreamResponseItem } from "@/app/api/streams/route";
import {
  Chip,
  Input,
  Pagination,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import SearchIcon from "../icons/search";

dayjs.extend(relativeTime);

const ROWS_PER_PAGE = 10;

export function StreamTable() {
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState("streamDate");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");
  const [items, setItems] = useState<StreamResponseItem[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/streams?page=${page}&perPage=${ROWS_PER_PAGE}&filter=${filterValue}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    );
    const data = await response.json();

    setItems(data.items);
    setTotalRows(data.totalRows);

    console.log("TOTAL ROWS: ", data.totalRows);
    console.log("TOTAL PAGES: ", Math.ceil(data.totalRows / ROWS_PER_PAGE));
    const pages = Math.ceil(data.totalRows / ROWS_PER_PAGE) ?? 0;
    setTotalPages(pages > 0 ? pages - 1 : 0);

    setIsLoading(false);
  }, [page, filterValue, sortBy, sortDirection]);

  const getColorBySubscription = useCallback((subscriptionName: string) => {
    switch (subscriptionName) {
      case "Basic":
        return "warning";
      case "Premium":
        return "secondary";
      default:
        return "default";
    }
  }, []);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const sortChangeHanlder = useCallback((sortDescriptor: SortDescriptor) => {
    setSortBy(sortDescriptor.column as string);
    setSortDirection(sortDescriptor.direction === "ascending" ? "ASC" : "DESC");
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[60%]"
            placeholder="Search by artist, album or song..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear]);

  const bottomContent = useMemo(() => {
    if (totalPages > 0) {
      const from = (page - 1) * ROWS_PER_PAGE + 1;
      const to = from + ROWS_PER_PAGE - 1;

      return (
        <div className="flex w-full flex-col md:flex-row gap-4 justify-between items-center">
          <Chip
            variant="bordered"
            radius="sm"
            size="lg"
            classNames={{
              base: "bg-default-100 border-none h-[38px] text-sm",
            }}
            className="text-violet-400 shadow-sm"
          >
            {`Displaying from ${from} to ${to} items`}
          </Chip>

          <Pagination
            isCompact
            showControls
            color="secondary"
            page={page}
            total={totalPages}
            onChange={(page) => setPage(page)}
          />
        </div>
      );
    }

    return null;
  }, [totalPages, page]);

  return (
    <div className="flex mt-10 flex-col">
      <h3
        role="heading"
        className="text-slate-700 font-medium text-3xl drop-shadow-sm"
      >
        Streamed songs metrics
      </h3>

      <p className="text-slate-600 text-md mt-4 mb-6">
        The streamed metrics provides real-time insights into key metrics
        related on how users listen to the different artists, albums and tracks.
        music streaming activities.The table also highlights user engagement
        with each track and artist, along with subscription status to assess how
        premium users interact with the platform. This visual overview helps
        identify top-performing songs, trending artists, and active user
        behavior, enabling data-driven decisions to optimize content and user
        experience.
      </p>

      <Table
        aria-label="Stream table with pagination"
        isStriped
        topContent={topContent}
        bottomContent={bottomContent}
        sortDescriptor={{
          column: sortBy,
          direction: sortDirection === "ASC" ? "ascending" : "descending",
        }}
        onSortChange={sortChangeHanlder}
      >
        <TableHeader>
          <TableColumn key="artistName" allowsSorting={true}>
            Artist
          </TableColumn>
          <TableColumn key="trackName" allowsSorting={true}>
            Song
          </TableColumn>
          <TableColumn key="userName" allowsSorting={true}>
            User
          </TableColumn>
          <TableColumn key="streamDate" allowsSorting={true}>
            Date streamed
          </TableColumn>
          <TableColumn key="subscription">Subscription</TableColumn>
        </TableHeader>
        <TableBody
          items={items}
          emptyContent={"No data were found"}
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item.streamId}>
              <TableCell>
                <Link href={`/artists/${item.artistId}`}>
                  <User
                    avatarProps={{ radius: "lg", src: item.albumCoverImageUrl }}
                    description={item.albumName}
                    name={item.artistName}
                  />
                </Link>
              </TableCell>
              <TableCell>{item.trackName}</TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>
                <Tooltip
                  color="secondary"
                  content={dayjs(item.streamDate).format("MMMM D, YYYY h:mm A")}
                >
                  {dayjs(item.streamDate).fromNow()}
                </Tooltip>
              </TableCell>
              <TableCell className="text-right">
                <Chip
                  size="sm"
                  color={getColorBySubscription(item.subscriptionName)}
                >
                  {item.subscriptionName}
                </Chip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
