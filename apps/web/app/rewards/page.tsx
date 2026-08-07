import type { Metadata } from 'next';
import ModulePage from '../../components/shared/ModulePage';
import type { StepItem } from '../../components/shared/StepCard';
import { waLink, WA_PREFILL } from '../../lib/whatsapp';

export const metadata: Metadata = {
  title: 'Rewards — Infinitswap',
  description:
    'Earn points on deposits, savings and swaps, earn on every friend you refer, and redeem for fee discounts, cashback or bonus USDT.',
};

const REWARDS: StepItem[] = [
  {
    id: '01',
    tag: 'Earn',
    micro: 'EveryMoveCounts',
    title: 'Points on activity',
    detail:
      'Deposits, savings contributions, bill payments and swaps all earn points automatically. There is nothing to opt into — if you were going to do it anyway, it counts.',
  },
  {
    id: '02',
    tag: 'Earn',
    micro: 'BringAFriend',
    title: 'Referral earnings',
    detail:
      'Share your code and earn when the people you invite actually transact, not just when they sign up. The reward keeps paying as they keep using the account.',
  },
  {
    id: '03',
    tag: 'Redeem',
    micro: 'SpendThePoints',
    title: 'Discounts and cashback',
    detail:
      'Put points against transaction fees, take them as cashback into your wallet, or convert them to bonus USDT. Redemption happens in the same chat as everything else.',
  },
  {
    id: '04',
    tag: 'Structure',
    micro: 'NoSeparateApp',
    title: 'Part of your balance',
    detail:
      'No loyalty app, no separate login, no points that expire in a drawer somewhere. Your rewards sit next to your money and you can check them by asking.',
  },
];

export default function RewardsPage() {
  return (
    <ModulePage
      eyebrow="Rewards / module 05"
      titleTop="You Already Use It."
      titleBottom="Get Paid For It."
      intro="Earn points on deposits, savings, and swaps. Invite a friend and earn when they transact. Redeem points for fee discounts, cashback, or bonus USDT — no separate loyalty app, it's just part of your balance."
      items={REWARDS}
      cardFooterLabel="Rewards module"
      cardStatusLabel="Earning active"
      facts={[
        { label: 'Earn on', value: 'Deposits · Savings · Bills · Swaps' },
        { label: 'Referrals', value: 'Paid when your invite transacts' },
        { label: 'Redeem for', value: 'Fee discounts · Cashback · Bonus USDT' },
      ]}
      ctaHref={waLink(WA_PREFILL.rewards)}
      ctaLabel="See your rewards"
      ctaNote="Ask for your balance and your code in one message."
      statusLeft="Rewards module / points accruing"
      statusRight="Referral programme open"
    />
  );
}
