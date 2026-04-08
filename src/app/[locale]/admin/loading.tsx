export default function AdminLoading() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-8 w-52 bg-[#7c3aed]/5 rounded-xl" />
        <div className="h-4 w-80 bg-[#7c3aed]/5 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(124,58,237,0.12)' }}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-2">
                <div className="h-3 w-24 bg-[#7c3aed]/5 rounded" />
                <div className="h-8 w-28 bg-[#7c3aed]/5 rounded-lg" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#7c3aed]/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
