import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export const subscriptions = [
  {
    name: "Basic",
    price: 9.99,
  },
  {
    name: "Premium",
    price: 14.99,
  },
];

const freeUsers: Prisma.UserCreateInput[] = [];
const basicUsers: Prisma.UserCreateInput[] = [];
const premiumUsers: Prisma.UserCreateInput[] = [];

for (let i = 0; i < 3000; i++) {
  premiumUsers.push({
    email: `${faker.number.int(10000)}-${faker.internet.email()}`,
    name: faker.person.fullName(),
    linkedinUser: `${faker.internet.userName()}-${faker.number.int(10000)}`,
  });
}

for (let i = 0; i < 4500; i++) {
  basicUsers.push({
    email: `${faker.number.int(10000)}-${faker.internet.email()}`,
    name: faker.person.fullName(),
    linkedinUser: `${faker.internet.userName()}-${faker.number.int(10000)}`,
  });
}

for (let i = 0; i < 1000; i++) {
  freeUsers.push({
    email: `${faker.number.int(10000)}-${faker.internet.email()}`,
    name: faker.person.fullName(),
    linkedinUser: `${faker.internet.userName()}-${faker.number.int(10000)}`,
  });
}

export const users = {
  freeUsers,
  basicUsers,
  premiumUsers,
};
