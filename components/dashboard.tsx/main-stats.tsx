import {
  getRevenueBySubscriptions,
  getTotalActiveUsers,
  getTotalStreamsThisMonth,
  getTotalUsers,
} from "@/lib/api";
import dayjs from "dayjs";
import numbro from "numbro";
import StatsCard from "../ui/stats-card";

export default async function MainStats() {
  const activeDateStg = dayjs().subtract(30, "day").toISOString();

  const totalUsers = await getTotalUsers();
  const totalActiveUsers = await getTotalActiveUsers(activeDateStg);
  const streamsThisMonth = await getTotalStreamsThisMonth();
  const prevRevenue = await getRevenueBySubscriptions(false);
  const currRevenue = await getRevenueBySubscriptions(true);

  const formattedTotalUsers = numbro(totalUsers).format({
    average: true,
    mantissa: 1,
  });

  const formattedTotalActiveUsers = numbro(totalActiveUsers).format({
    average: true,
    mantissa: 1,
  });

  const formattedstreamsThisMonth = numbro(streamsThisMonth).format({
    thousandSeparated: true,
  });

  const formattedPrevRevenue = numbro(prevRevenue).format({
    average: true,
    mantissa: 2,
  });

  const formattedCurrRevenue = numbro(currRevenue).format({
    average: true,
    mantissa: 2,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <StatsCard
        title={`${formattedTotalActiveUsers} active users`}
        subtitle={`from ${formattedTotalUsers} total users`}
        viewAllLink="/dashboard/users"
      />

      <StatsCard
        title={`Subscription's revenue`}
        subtitle={`$${formattedCurrRevenue} vs $${formattedPrevRevenue} from previous month`}
      />

      <StatsCard
        title={`${formattedstreamsThisMonth} Streams this month`}
        subtitle="550 more than last month"
      />
    </div>
  );
}
