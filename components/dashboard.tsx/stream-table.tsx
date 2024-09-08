"use client";

import { StreamResponse } from "@/app/api/streams/route";
import {
  Chip,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import SearchIcon from "../icons/search";

dayjs.extend(relativeTime);

const ROWS_PER_PAGE = 20;
const getStreamData = async (url: string) => {
  const request = await fetch(url, {
    method: "GET",
  });

  return request.json();
};

export function StreamTable() {
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [searchInputValue, setInputValue] = useState("");
  const [sortBy, setSortBy] = useState("streamId");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");

  const { data, isLoading } = useSWR<StreamResponse>(
    `http://localhost:3000/api/streams?page=${page}&filter=${filterValue}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
    getStreamData,
    {
      keepPreviousData: true,
    }
  );

  const pages = useMemo(() => {
    return data?.totalRows ? Math.ceil(data.totalRows / ROWS_PER_PAGE) : 0;
  }, [data?.totalRows]);

  const getColorBySubscription = (subscriptionName: string) => {
    switch (subscriptionName) {
      case "Basic":
        return "warning";
      case "Premium":
        return "secondary";
      default:
        return "default";
    }
  };

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

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by artist, album or song..."
            startContent={<SearchIcon />}
            value={searchInputValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [searchInputValue, onSearchChange, onClear]);

  const loadingState =
    isLoading || data?.items.length === 0 ? "loading" : "idle";

  if (!data) {
    return null;
  }

  return (
    <Table
      aria-label="Stream table with pagination"
      isStriped
      topContent={topContent}
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="artist">Artist</TableColumn>
        <TableColumn key="song">Song</TableColumn>
        <TableColumn key="user">User</TableColumn>
        <TableColumn key="date">Date streamed</TableColumn>
        <TableColumn key="subscriptuon">Subscription</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.items ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow key={item.streamId}>
            <TableCell>
              <User
                avatarProps={{ radius: "lg", src: item.albumCoverImageUrl }}
                description={item.albumName}
                name={item.artistName}
              />
            </TableCell>
            <TableCell>{item.trackName}</TableCell>
            <TableCell>{item.userName}</TableCell>
            <TableCell>{dayjs(item.streamDate).format("YYYY-MM-DD")}</TableCell>
            <TableCell>
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
  );
}
