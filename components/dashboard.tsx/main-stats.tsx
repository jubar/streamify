import StatsCard from "../ui/stats-card";

export default function MainStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <StatsCard
        title="13k active users"
        subtitle="from 16.3k total users"
        viewAllLink="/dashboard/users"
      />

      <StatsCard
        title="Revenue"
        subtitle="This month 7.8k USD | Last month 6.9k USD"
      />

      <StatsCard
        title="Streams this month"
        subtitle="9 millions of streams from 32 countries"
        viewAllLink="/dashboard/streams"
      />
    </div>
  );
}
