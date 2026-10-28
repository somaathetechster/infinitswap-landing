const countries = ["Nigeria", "Ghana", "Tanzania", "South Africa", "Rwanda", "Uganda", "Kenya"];

export default function CountriesSection() {
  return (
    <section id="countries" className="bg-[#0A0A0A] py-24 md:py-32">
      <div className="section-wrap">
        <h2 className="display max-w-[640px] text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-.05em] text-white">
          Available in seven markets.
        </h2>
        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
          {countries.map((name) => (
            <li
              key={name}
              className="display border-b border-white/[.07] pb-5 text-[clamp(22px,3vw,30px)] font-semibold text-[#EDEDED]"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
