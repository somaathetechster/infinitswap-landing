import type { Metadata } from 'next';
import ModulePage from '../../components/shared/ModulePage';
import type { StepItem } from '../../components/shared/StepCard';
import { waLink, WA_PREFILL } from '../../lib/whatsapp';

export const metadata: Metadata = {
  title: 'Savings — Infinitswap',
  description:
    'Round-up, goal, flexible and locked savings that earn interest, all set up in a WhatsApp chat.',
};

const PLANS: StepItem[] = [
  {
    id: '01',
    tag: 'Plan type',
    micro: 'RoundUpTheChange',
    title: 'Round-up savings',
    detail:
      'Every payment you make rounds up to the nearest note, and the difference goes straight into savings. You save without deciding to — the amounts are small enough not to hurt and frequent enough to add up.',
  },
  {
    id: '02',
    tag: 'Plan type',
    micro: 'NameYourTarget',
    title: 'Goal savings',
    detail:
      'Set a target and a date — rent, school fees, a trip — and Infinitswap works out what to put aside and when. Progress comes back to you in chat, so you always know how close you are.',
  },
  {
    id: '03',
    tag: 'Plan type',
    micro: 'StayFlexible',
    title: 'Soft savings',
    detail:
      'A separate balance that still earns, but that you can pull back into your wallet the moment you need it. For money you want out of the way, not out of reach.',
  },
  {
    id: '04',
    tag: 'Plan type',
    micro: 'CommitAndForget',
    title: 'Locked savings',
    detail:
      'Choose a term and the balance is sealed until it matures, at the highest interest rate we offer. Built for the goals that only work if you cannot touch the money early.',
  },
];

export default function SavingsPage() {
  return (
    <ModulePage
      eyebrow="Savings / module 02"
      titleTop="Money That Grows"
      titleBottom="While You Sleep."
      intro="Round-up savings, fixed goals, or a locked balance earning real interest — pick what fits, and Infinitswap does the disciplined part for you. From soft savings you can pull anytime to hard-locked plans built for long-term goals."
      items={PLANS}
      cardFooterLabel="Savings module"
      cardStatusLabel="Plan active"
      facts={[
        { label: 'Plan types', value: 'Round-up · Goal · Soft · Locked' },
        { label: 'Interest', value: 'Accrues daily, paid on maturity' },
        { label: 'Currencies', value: 'Local wallets and USDT' },
      ]}
      ctaHref={waLink(WA_PREFILL.savings)}
      ctaLabel="Start a savings goal"
      ctaNote="Set it up in one chat. No forms, no app."
      statusLeft="Savings module / interest accruing"
      statusRight="All plans operational"
    />
  );
}
