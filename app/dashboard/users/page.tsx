"use client";

import SearchIcon from "@/components/icons/search";
import {
  Chip,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { useState } from "react";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col w-full min-h-screen px-8 py-4">
      <h1 className="text-2xl drop-shadow-md mb-6">Users</h1>
      <div className="flex flex-col gap-3">
        <Table
          color="secondary"
          isStriped
          defaultSelectedKeys={[]}
          selectionMode="single"
          aria-label="Users table"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={10}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          topContent={
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
              value=""
              onClear={() => {}}
              onValueChange={() => {}}
            />
          }
        >
          <TableHeader>
            <TableColumn>USER</TableColumn>
            <TableColumn>COUNTRY</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>
                <User
                  avatarProps={{
                    radius: "lg",
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  description="tonyreichert@example.com"
                  name="Tony Reichert"
                />
              </TableCell>
              <TableCell>United State</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Zoey Lang</TableCell>
              <TableCell>China</TableCell>
              <TableCell>
                <Chip color="danger" size="sm">
                  Inactive
                </Chip>
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Jane Fisher</TableCell>
              <TableCell>United State</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>Julio Barrios</TableCell>
              <TableCell>Uruguay</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
