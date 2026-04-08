export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-72 bg-white/5 rounded-xl" />
        <div className="h-4 w-96 bg-white/5 rounded-lg" />
      </div>

      {/* KPI Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl p-6 bg-white/[0.02] border border-[var(--border-c)]">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-2">
                <div className="h-3 w-24 bg-white/5 rounded" />
                <div className="h-8 w-32 bg-white/5 rounded-lg" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/5" />
            </div>
            <div className="h-3 w-28 bg-white/5 rounded" />
          </div>
        ))}
      </div>

      {/* Chart + Feed skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl p-6 bg-white/[0.02] border border-[var(--border-c)]">
          <div className="h-6 w-40 bg-white/5 rounded-lg mb-6" />
          <div className="h-[300px] bg-white/[0.01] rounded-xl" />
        </div>
        <div className="lg:col-span-1 rounded-2xl p-6 bg-white/[0.02] border border-[var(--border-c)]">
          <div className="h-6 w-28 bg-white/5 rounded-lg mb-6" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 rounded-full bg-white/5" />
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="h-3 w-24 bg-white/5 rounded" />
                  <div className="h-2.5 w-40 bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
