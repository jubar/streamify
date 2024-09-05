import prisma from "@/prisma/db";
import dayjs from "dayjs";
import numbro from "numbro";
import StatsCard from "../ui/stats-card";

export default async function MainStats() {
  const totalUsers = await prisma.user.count();

  /**
   * This function returns the revenue of the current month or the previous month.
   * @param {boolean} thisMonth - If true, it will return the revenue of the current month. If false,
   * it will return the revenue of the previous month.
   * @returns {string} - The revenue formatted as a string.
   */
  const getRevenue = async (thisMonth: boolean) => {
    const today = dayjs().toISOString();
    const firstDayThisMonth = dayjs().startOf("month").toISOString();
    const firstDayLastMonth = dayjs()
      .subtract(1, "month")
      .startOf("month")
      .toISOString();
    const lastDayLastMonth = dayjs()
      .subtract(1, "month")
      .endOf("month")
      .toISOString();

    const from = thisMonth ? firstDayThisMonth : firstDayLastMonth;
    const to = thisMonth ? dayjs().toISOString() : lastDayLastMonth;

    const previousSubscriptions = await prisma.userSubscription.findMany({
      where: {
        createdAt: {
          gte: from,
          lt: to,
        },
      },
      include: {
        // I'm including only the needed fields.
        subscription: {
          select: {
            price: true,
          },
        },
      },
    });

    const revenue = previousSubscriptions.reduce(
      (acc, userSubscription) => acc + userSubscription.subscription.price,
      0
    );

    return numbro(revenue).format({
      average: true,
      mantissa: 2,
    });
  };

  const prevRevenue = await getRevenue(false);
  const currRevenue = await getRevenue(true);
  const allUsers = numbro(totalUsers).format({
    average: true,
    mantissa: 1,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <StatsCard
        title="13k active users"
        subtitle={`from ${allUsers} total users`}
        viewAllLink="/dashboard/users"
      />

      <StatsCard
        title="Revenue"
        subtitle={`This month ${currRevenue} USD | Last month ${prevRevenue} USD`}
      />

      <StatsCard
        title="Streams this month"
        subtitle="9 millions of streams from 32 countries"
        viewAllLink="/dashboard/streams"
      />
    </div>
  );
}
