import type { Metadata } from 'next';
import ModulePage from '../../components/shared/ModulePage';
import type { StepItem } from '../../components/shared/StepCard';
import { waLink, WA_PREFILL } from '../../lib/whatsapp';

export const metadata: Metadata = {
  title: 'Savings — Infinitswap',
  description:
    'Round-up, goal, soft, locked and hard savings that earn interest — flexible withdrawals or a strict lock, all set up in a WhatsApp chat.',
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
      'A separate balance that still earns, but that you can withdraw back into your wallet at any time, with no penalty and no notice period. For money you want out of the way, not out of reach.',
  },
  {
    id: '04',
    tag: 'Plan type',
    micro: 'PickYourTerm',
    title: 'Locked savings',
    detail:
      'Choose a lock period — typically 30, 90 or 180 days — and the balance is sealed until it matures, at a higher rate the longer you commit. If your circumstances change, you can request an early unlock in chat; it releases the funds and forfeits the interest accrued on that plan.',
  },
  {
    id: '05',
    tag: 'Plan type',
    micro: 'NoEarlyExit',
    title: 'Hard savings',
    detail:
      'The strictest option, and the highest interest rate we offer: the balance cannot be unlocked early at all, only at maturity. Built for the goals that only work if the money is genuinely out of reach.',
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
        { label: 'Plan types', value: 'Round-up · Goal · Soft · Locked · Hard' },
        { label: 'Interest', value: 'Accrues daily, paid on maturity — higher the longer you lock' },
        { label: 'Early access', value: 'Anytime on soft · On request on locked · At maturity on hard' },
      ]}
      ctaHref={waLink(WA_PREFILL.savings)}
      ctaLabel="Start a savings goal"
      ctaNote="Set it up in one chat. No forms, no app."
      statusLeft="Savings module / interest accruing"
      statusRight="All plans operational"
    />
  );
}
