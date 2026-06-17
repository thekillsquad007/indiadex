const stats = [
  { value: "100+", label: "Cryptocurrencies" },
  { value: "20+", label: "Chains supported" },
  { value: "0.75%", label: "Flat swap fee" },
  { value: "0%", label: "Custody risk" },
];

export default function Stats() {
  return (
    <section className="py-14 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
