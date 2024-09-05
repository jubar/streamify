import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import artistData from "./artist-albums-tracks";
import { subscriptions, users } from "./users-subscriptions";

const prisma = new PrismaClient();

async function main() {
  // Create the subscriptions
  for (const subscription of subscriptions) {
    await prisma.subscription.create({
      data: subscription,
    });
  }

  // Get the subscriptions to use them in the users creation
  const premiumSubscription = await prisma.subscription.findFirst({
    where: { name: "Premium" },
  });

  const basicSubscription = await prisma.subscription.findFirst({
    where: { name: "Basic" },
  });

  // Create the free users
  for (const user of users.freeUsers) {
    await prisma.user.create({
      data: user,
    });
  }

  // Create the basic users
  for (const user of users.basicUsers) {
    await prisma.user.create({
      data: {
        ...user,
        UserSubscription: {
          create: {
            subscriptionId: basicSubscription!.id,
            createdAt: faker.date.between({
              from: "2024-01-01T00:00:00.000Z",
              to: "2024-09-01T00:00:00.000Z",
            }),
          },
        },
      },
    });
  }

  // Create the premium users
  for (const user of users.premiumUsers) {
    await prisma.user.create({
      data: {
        ...user,
        UserSubscription: {
          create: {
            subscriptionId: premiumSubscription!.id,
            createdAt: faker.date.between({
              from: "2024-01-01T00:00:00.000Z",
              to: "2024-09-01T00:00:00.000Z",
            }),
          },
        },
      },
    });
  }

  // Update the subscriptions dates to calculate the revenue.
  const allUserSubscriptions = await prisma.userSubscription.findMany();

  for (const userSubscription of allUserSubscriptions) {
    await prisma.userSubscription.update({
      where: {
        id: userSubscription.id,
      },
      data: {
        createdAt: faker.date.between({
          from: "2024-01-01T00:00:00.000Z",
          to: "2024-09-01T00:00:00.000Z",
        }),
      },
    });
  }

  // We need to make sure to have some subscriptions for this month for the cards.
  // TODO: Jubar -> Implement this part.

  // Create artists, albums and tracks
  for (const artist of artistData) {
    await prisma.artist.create({
      data: artist,
    });
  }

  // I'll create here some streaming data for charts and cards.
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
