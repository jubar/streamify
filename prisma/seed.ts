import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
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
      data: {
        ...user,
        createdAt: faker.date.between({
          from: "2024-01-01T00:00:00.000Z",
          to: dayjs().toISOString(),
        }),
      },
    });
  }

  // Create the basic users
  for (const user of users.basicUsers) {
    const createdAt = faker.date.between({
      from: "2024-01-01T00:00:00.000Z",
      to: dayjs().toISOString(),
    });
    await prisma.user.create({
      data: {
        ...user,
        createdAt,
        UserSubscription: {
          create: {
            subscriptionId: basicSubscription!.id,
            createdAt,
          },
        },
      },
    });
  }

  // Create the premium users
  for (const user of users.premiumUsers) {
    const createdAt = faker.date.between({
      from: "2024-01-01T00:00:00.000Z",
      to: dayjs().toISOString(),
    });
    await prisma.user.create({
      data: {
        ...user,
        createdAt,
        UserSubscription: {
          create: {
            subscriptionId: premiumSubscription!.id,
            createdAt,
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
          from: "2024-06-01T00:00:00.000Z", // I'm setting the date to June 2024 to have more data to calculate the revenue.
          to: dayjs().toISOString(),
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
  const allUserIds = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  const allTrackIds = await prisma.track.findMany({
    select: {
      id: true,
    },
  });

  for (let i = 0; i < 20000; i++) {
    await prisma.stream.create({
      data: {
        userId: faker.helpers.arrayElement(allUserIds).id,
        trackId: faker.helpers.arrayElement(allTrackIds).id,
        createdAt: faker.date.between({
          from: "2024-01-01T00:00:00.000Z",
          to: dayjs().toISOString(),
        }),
      },
    });
  }
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
