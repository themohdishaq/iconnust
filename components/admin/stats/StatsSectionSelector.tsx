'use client';

export default function StatsSectionSelector() {
  const options = [
    { label: 'Home', value: '#home-page-live-impact-engine' },
    { label: 'Innovation', value: '#innovation-impact-tiles' },
    { label: 'IP Breakdown', value: '#ip-area-breakdown' },
    { label: 'IPs Filed', value: '#ips-filed-by-year' },
    { label: 'IPs Awarded', value: '#ips-awarded-by-year' },
    { label: 'Financial', value: '#financial-chart' },
    { label: 'Tech Place', value: '#homepage-tech-place-cards' },
  ];

  return (
    <div className="mb-6 flex items-center gap-2">
      <label htmlFor="stats-section-select" className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">
        Jump to
      </label>
      <select
        id="stats-section-select"
        defaultValue="#home-page-live-impact-engine"
        onChange={(event) => {
          const targetSelector = event.target.value;
          const target = document.querySelector(targetSelector);
          const scrollContainer = document.querySelector('main');

          if (target && scrollContainer) {
            const containerTop = scrollContainer.getBoundingClientRect().top;
            const targetTop = target.getBoundingClientRect().top - containerTop + scrollContainer.scrollTop;
            scrollContainer.scrollTo({ top: targetTop, behavior: 'smooth' });
          }
        }}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
