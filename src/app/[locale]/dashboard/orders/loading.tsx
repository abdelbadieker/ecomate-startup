export default function OrdersLoading() {
  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-52 bg-white/5 rounded-xl" />
          <div className="h-4 w-80 bg-white/5 rounded-lg" />
        </div>
        <div className="h-10 w-32 bg-white/5 rounded-xl" />
      </div>
      <div className="flex gap-6 flex-1 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-80 flex-shrink-0 flex flex-col">
            <div className="h-6 w-24 bg-white/5 rounded-lg mb-4" />
            <div className="flex-1 bg-white/[0.01] rounded-2xl p-3 border border-[var(--border-c)] flex flex-col gap-3">
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="rounded-2xl p-4 bg-white/[0.02] border border-[var(--border-c)]">
                  <div className="flex justify-between mb-2"><div className="h-4 w-20 bg-white/5 rounded" /><div className="h-4 w-16 bg-white/5 rounded" /></div>
                  <div className="h-4 w-28 bg-white/5 rounded mb-2" />
                  <div className="h-3 w-16 bg-white/5 rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
