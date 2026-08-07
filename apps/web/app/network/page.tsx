'use client';

import { motion } from 'framer-motion';
import AdvancedGlobe from '../../components/NetworkGlobe';
import { COUNTRIES, COUNTRY_COUNT } from '../../lib/countries';

const networkStats = [
  { label: 'Routes', value: COUNTRIES.map((c) => c.id).join(' • ') },
  { label: 'Latency', value: '14ms' },
  { label: 'Nodes', value: `${COUNTRY_COUNT} active / V4` },
  { label: 'Uptime', value: '99.99%' },
];

const systemLogs = [
  'Tracking Vector: LOS_JNB_ACC_NBO_KGL',
  'Protocol: V4.0.2 Secure // TLS 1.3',
  'Engine: WebGL 2.0 // Render_04',
  'Status: Mainnet Liquidity Synced',
];

export default function NetworkPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3efe8] pt-40 text-[#111111]">
      {/* Background system */}
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#f7f3ec_0%,#f0ebe2_44%,#e9e2d7_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_14%,rgba(8,39,220,0.08),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(254,0,156,0.06),transparent_20%),radial-gradient(circle_at_56%_60%,rgba(8,39,220,0.05),transparent_28%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(0,0,0,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.055)_1px,transparent_1px)] [background-size:74px_74px]" />
      <div className="absolute inset-y-0 left-[7.5%] w-px bg-black/10" />
      <div className="absolute inset-y-0 right-[7.5%] w-px bg-black/10" />
      <div className="absolute left-0 right-0 top-[13%] h-px bg-black/8" />
      <div className="absolute left-0 right-0 bottom-[10%] h-px bg-black/8" />

      {/* Header */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 xl:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-4 py-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-[#0827dc]">
                  Infrastructure / live map
                </span>
              </div>

              <h1 className="leading-[0.82] tracking-[-0.08em] text-black">
                <span className="block text-[14vw] font-black uppercase md:text-[10vw] lg:text-[7.2vw]">
                  Our Global
                </span>
                <span className="block text-[14vw] font-black uppercase text-[#0827dc] md:text-[10vw] lg:text-[7.2vw]">
                  Network.
                </span>
              </h1>
            </motion.div>
          </div>

          <div className="lg:col-span-5 lg:pb-4">
            <div className="max-w-md border-l-2 border-[#fe009c] pl-6">
              <p className="text-base leading-relaxed text-black/62 md:text-[1.08rem]">
                A real-time view of the regional rails, system routes, and
                infrastructure logic that help connect digital assets to local
                payout pathways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Globe stage */}
      <section className="relative z-10 mx-auto mt-14 max-w-7xl px-6 md:px-10 xl:px-12">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-black/8 bg-[#fffdf8] shadow-[0_30px_100px_rgba(0,0,0,0.08)]">
          {/* Stage background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(8,39,220,0.10),transparent_28%),radial-gradient(circle_at_75%_25%,rgba(254,0,156,0.06),transparent_20%),linear-gradient(180deg,#fdfbf7_0%,#f4efe7_100%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />

          <div className="relative grid min-h-[560px] lg:grid-cols-[1fr_300px]">
            {/* Globe */}
            <div className="relative min-h-[460px] lg:min-h-[560px]">
              <div className="absolute inset-0">
                <AdvancedGlobe />
              </div>

              {/* top label */}
              <div className="pointer-events-none absolute left-6 top-6 md:left-8 md:top-8">
                <div className="rounded-full border border-black/8 bg-white/88 px-4 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.05)]">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-black/42">
                    Local precision / global scale
                  </span>
                </div>
              </div>
            </div>

            {/* Right status rail */}
            <aside className="relative border-t border-black/8 bg-white/58 p-6 lg:border-l lg:border-t-0 lg:p-8">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#0827dc]">
                  System nominal
                </span>
              </div>

              <div className="mt-8 space-y-4">
                {networkStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.25rem] border border-black/8 bg-[#fffdf8] px-4 py-4"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-black/34">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold tracking-[-0.02em] text-black/80">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] bg-[#0827dc] p-5 text-white shadow-[0_20px_60px_rgba(8,39,220,0.22)]">
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/56">
                  Liquidity sync
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/82">
                  Monitoring route health and syncing available liquidity across
                  supported regions in real time.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom narrative */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-10 xl:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-semibold leading-[1] tracking-[-0.05em] text-black md:text-5xl">
              Local precision.
              <span className="block text-[#0827dc]">Global reach.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/62 md:text-lg">
              Infinitswap is designed to route transactions through the most
              appropriate local rails available, helping bridge the space between
              digital assets and traditional bank payout infrastructure with more
              clarity and speed.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[2rem] border border-black/8 bg-[#fffdf8] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.05)]">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.30em] text-black/36">
                System log
              </p>

              <div className="mt-5 space-y-3 border-l border-black/10 pl-4">
                {systemLogs.map((log) => (
                  <p
                    key={log}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/48"
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}