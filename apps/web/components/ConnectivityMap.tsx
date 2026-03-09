'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND_BLUE = '#0827dc';
const BRAND_MAGENTA = '#fe009c';
const BRAND_CYAN = '#00d9ff';

type NodeItem = {
  id: string;
  label: string;
  region: string;
  status: string;
  rate: string;
  x: number;
  y: number;
  accent: string;
};

const NODES: NodeItem[] = [
  {
    id: 'NG',
    label: 'Nigeria',
    region: 'West Africa',
    status: 'Operational',
    rate: '1,520 NGN',
    x: 33,
    y: 44,
    accent: BRAND_CYAN,
  },
  {
    id: 'GH',
    label: 'Ghana',
    region: 'West Africa',
    status: 'Active',
    rate: '14.2 GHS',
    x: 24,
    y: 34,
    accent: BRAND_MAGENTA,
  },
  {
    id: 'TZ',
    label: 'Tanzania',
    region: 'East Africa',
    status: 'Active',
    rate: '2,600 TZS',
    x: 67,
    y: 42,
    accent: BRAND_CYAN,
  },
  {
    id: 'SA',
    label: 'South Africa',
    region: 'Southern Africa',
    status: 'High Liquidity',
    rate: '18.9 ZAR',
    x: 57,
    y: 72,
    accent: BRAND_MAGENTA,
  },
  {
    id: 'HUB',
    label: 'Global Hub',
    region: 'Liquidity Hub',
    status: 'Master Node',
    rate: 'N/A',
    x: 49,
    y: 16,
    accent: '#ffffff',
  },
];

const CONNECTIONS: Array<[string, string]> = [
  ['NG', 'HUB'],
  ['GH', 'NG'],
  ['NG', 'SA'],
  ['SA', 'TZ'],
  ['TZ', 'HUB'],
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function curvedPath(a: NodeItem, b: NodeItem) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const curve = Math.max(6, Math.min(16, Math.hypot(dx, dy) * 0.18));
  const cx = mx;
  const cy = my - curve;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

function NodeCard({
  node,
  active,
  hovered,
  onEnter,
  onLeave,
  onClick,
}: {
  node: NodeItem;
  active: boolean;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const visible = active || hovered;

  return (
    <>
      <motion.button
        type="button"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${node.x}%`, top: `${node.y}%` }}
        animate={{
          scale: active ? 1.08 : hovered ? 1.04 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        <div className="relative flex items-center justify-center">
          <motion.span
            className="absolute rounded-full"
            style={{ backgroundColor: node.accent }}
            animate={{
              width: visible ? 56 : 38,
              height: visible ? 56 : 38,
              opacity: visible ? 0.18 : 0.1,
            }}
            transition={{ duration: 0.25 }}
          />

          <motion.span
            className="absolute rounded-full border"
            style={{
              borderColor: node.accent,
              boxShadow: `0 0 26px ${node.accent}55`,
            }}
            animate={{
              width: [34, 46, 34],
              height: [34, 46, 34],
              opacity: [0.28, 0.08, 0.28],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <span
            className="relative block h-4 w-4 rounded-full border border-white/20"
            style={{
              backgroundColor: node.accent,
              boxShadow: `0 0 18px ${node.accent}`,
            }}
          />
        </div>
      </motion.button>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute z-20 -translate-x-1/2"
            style={{
              left: `${node.x + 7}%`,
              top: `${node.y - 2}%`,
            }}
          >
            <div className="min-w-[176px] rounded-2xl border border-white/12 bg-black/72 px-4 py-4 shadow-[0_0_30px_rgba(0,217,255,0.10)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[15px] font-semibold tracking-[-0.03em] text-white">
                  {node.label}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-emerald-400">
                  Online
                </span>
              </div>

              <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.22em] text-white/38">
                {node.region}
              </p>

              <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-white">
                {node.rate}
              </p>

              <div className="mt-3 border-t border-white/8 pt-3">
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                  {node.status}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ConnectivityMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeIds = useMemo(() => {
    if (!selectedId) return new Set<string>(NODES.map((n) => n.id));
    const ids = new Set<string>([selectedId]);
    CONNECTIONS.forEach(([a, b]) => {
      if (a === selectedId || b === selectedId) {
        ids.add(a);
        ids.add(b);
      }
    });
    return ids;
  }, [selectedId]);

  return (
    <section className="relative min-h-[88svh] overflow-hidden bg-[#02030a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(8,39,220,0.18),transparent_24%),radial-gradient(circle_at_80%_35%,rgba(254,0,156,0.14),transparent_22%),linear-gradient(180deg,#03040a_0%,#05070f_55%,#02030a_100%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* HUD */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.42em] text-white/34">
              Orchestration network / live map
            </p>
            <div className="mt-4 h-px w-40 overflow-hidden bg-white/8">
              <motion.div
                animate={{ x: ['-100%', '220%'] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'linear' }}
                className="h-full w-1/3 bg-[#00d9ff]"
              />
            </div>
          </div>

          <div className="text-right">
            <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-white/24">
              Integrity / 99.98%
            </p>
            <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.24em] text-white/24">
              Mode / network view
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="rounded-full border border-white/10 bg-white/6 px-5 py-3 backdrop-blur-md">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/46">
              {selectedId
                ? 'Node focused / click node again to reset'
                : 'Hover nodes to inspect / click to focus'}
            </span>
          </div>
        </div>
      </div>

      {/* Main map stage */}
      <div className="absolute inset-0 z-0">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="lineGradientA" x1="0%" x2="100%">
              <stop offset="0%" stopColor={BRAND_CYAN} stopOpacity="0.95" />
              <stop offset="100%" stopColor={BRAND_MAGENTA} stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {CONNECTIONS.map(([startId, endId], i) => {
            const a = getNode(startId);
            const b = getNode(endId);
            const isActive =
              !selectedId || startId === selectedId || endId === selectedId;

            return (
              <g key={`${startId}-${endId}-${i}`}>
                <motion.path
                  d={curvedPath(a, b)}
                  fill="none"
                  stroke="url(#lineGradientA)"
                  strokeWidth="0.22"
                  strokeOpacity={isActive ? 0.8 : 0.16}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: i * 0.08 }}
                />
                {isActive && (
                  <motion.circle
                    r="0.55"
                    fill={BRAND_CYAN}
                    filter="url(#blur)"
                    animate={{
                      offsetDistance: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.18,
                    }}
                    style={{
                      offsetPath: `path('${curvedPath(a, b)}')`,
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        <div className="absolute inset-0">
          {NODES.map((node) => {
            const active = activeIds.has(node.id);
            const hovered = hoveredId === node.id;

            return (
              <NodeCard
                key={node.id}
                node={node}
                active={active}
                hovered={hovered}
                onEnter={() => setHoveredId(node.id)}
                onLeave={() => setHoveredId(null)}
                onClick={() =>
                  setSelectedId((prev) => (prev === node.id ? null : node.id))
                }
              />
            );
          })}
        </div>
      </div>

      {/* Typography */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 text-center">
        <h2 className="leading-[0.8] tracking-[-0.08em] text-white/84">
          <span className="block text-[14vw] font-black uppercase md:text-[10vw]">
            Borderless
          </span>
          <span className="block bg-gradient-to-r from-[#00d9ff] via-white to-[#fe009c] bg-clip-text text-[14vw] font-black uppercase italic text-transparent md:text-[10vw]">
            Payments.
          </span>
        </h2>
      </div>
    </section>
  );
}