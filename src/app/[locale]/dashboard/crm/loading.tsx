export default function GenericDashboardLoading() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-8 w-56 bg-white/5 rounded-xl" />
        <div className="h-4 w-80 bg-white/5 rounded-lg" />
      </div>
      <div className="rounded-2xl p-6 bg-white/[0.02] border border-[var(--border-c)]">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-72 bg-white/5 rounded-full" />
          <div className="h-8 w-32 bg-white/5 rounded-xl" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.01]">
              <div className="w-10 h-10 rounded-full bg-white/5" />
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="h-4 w-32 bg-white/5 rounded" />
                <div className="h-3 w-48 bg-white/5 rounded" />
              </div>
              <div className="h-4 w-20 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
