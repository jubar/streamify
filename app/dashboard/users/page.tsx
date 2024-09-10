"use client";

import SearchIcon from "@/components/icons/search";
import { faker } from "@faker-js/faker";
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
import { useCallback, useState } from "react";

interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
  country: string;
  status: "Active" | "Inactive";
  subscription: "Basic" | "Free" | "Premium";
}

export default function UsersPage() {
  const [page, setPage] = useState<number>(1);

  const getRandomUsers = useCallback(() => {
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        id: faker.string.uuid(),
        avatar: faker.image.urlPicsumPhotos({ width: 50, height: 50 }),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        country: faker.location.country(),
        status: faker.helpers.arrayElement(["Active", "Inactive"]),
        subscription: faker.helpers.arrayElement(["Basic", "Free", "Premium"]),
      });
    }
    return users;
  }, []);

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

  return (
    <div className="flex flex-col w-full max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] lg:min-h-screen lg:max-h-screen px-8 py-4 overflow-hidden overflow-y-auto">
      <h1 className="text-2xl drop-shadow-md mb-6">Users</h1>
      <p className="text-slate-600 text-md mt-4 mb-6">
        <strong>IMPORTANT:</strong> This page is just a mockup. It doesn&apos;t
        have any real data, data is generated any time you enter the page.
        <br />
        The idea is to visually complete the experience of the dashboard.
      </p>

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
            <TableColumn>User</TableColumn>
            <TableColumn>Country</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Subscription</TableColumn>
          </TableHeader>
          <TableBody>
            {getRandomUsers().map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>
                  <User
                    avatarProps={{
                      radius: "lg",
                      src: user.avatar,
                    }}
                    description={user.email}
                    name={user.name}
                  />
                </TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>
                  <Chip
                    color={user.status === "Active" ? "success" : "danger"}
                    size="sm"
                  >
                    {user.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip
                    color={getColorBySubscription(user.subscription)}
                    size="sm"
                  >
                    {user.status}
                  </Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
