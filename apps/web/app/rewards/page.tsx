import type { Metadata } from 'next';
import ModulePage from '../../components/shared/ModulePage';
import type { StepItem } from '../../components/shared/StepCard';
import { waLink, WA_PREFILL } from '../../lib/whatsapp';

export const metadata: Metadata = {
  title: 'Rewards — Infinitswap',
  description:
    'Earn points and cashback through campaigns, challenges and eligible activity, plus referral rewards — redeemable for fee discounts, cashback, partner rewards or bonus USDT.',
};

const REWARDS: StepItem[] = [
  {
    id: '01',
    tag: 'Earn',
    micro: 'CampaignsAndChallenges',
    title: 'Campaigns and challenges',
    detail:
      'Points and cashback are earned through campaigns, challenges, and eligible activity rather than on every transaction by default. When a campaign is running, the qualifying actions and the reward are stated up front in chat.',
  },
  {
    id: '02',
    tag: 'Earn',
    micro: 'WhatCanQualify',
    title: 'Qualifying activity',
    detail:
      'Deposits, trading and swaps, savings contributions and referrals can all qualify. Which of them count, and at what rate, depends on the campaign live at the time — ask and the bot will tell you what is currently earning.',
  },
  {
    id: '03',
    tag: 'Earn',
    micro: 'BringAFriend',
    title: 'Referral rewards',
    detail:
      'Share your referral code and earn when the people you invite actually transact, not merely when they sign up. Your code, your invite count and what they have earned you are all viewable in chat.',
  },
  {
    id: '04',
    tag: 'Redeem',
    micro: 'SpendThePoints',
    title: 'Discounts and cashback',
    detail:
      'Put points against transaction fees, take them as cashback into your wallet, spend them on partner rewards, or convert them to bonus USDT. Redemption happens in the same chat as everything else.',
  },
  {
    id: '05',
    tag: 'Structure',
    micro: 'NoSeparateApp',
    title: 'Part of your balance',
    detail:
      'No loyalty app, no separate login, no points stranded in a drawer somewhere. Your rewards balance sits next to your money and you can check it by asking.',
  },
];

export default function RewardsPage() {
  return (
    <ModulePage
      eyebrow="Rewards / module 05"
      titleTop="You Already Use It."
      titleBottom="Get Paid For It."
      intro="Earn points and cashback through campaigns, challenges, and eligible activity — deposits, savings, and swaps can all qualify. Invite a friend and earn when they transact. Redeem points for fee discounts, cashback, partner rewards, or bonus USDT — no separate loyalty app, it's just part of your balance."
      items={REWARDS}
      cardFooterLabel="Rewards module"
      cardStatusLabel="Earning active"
      facts={[
        { label: 'Earned through', value: 'Campaigns · Challenges · Eligible activity' },
        { label: 'Referrals', value: 'Paid when your invite transacts' },
        { label: 'Redeem for', value: 'Fee discounts · Cashback · Partner rewards · Bonus USDT' },
      ]}
      ctaHref={waLink(WA_PREFILL.rewards)}
      ctaLabel="See your rewards"
      ctaNote="Ask for your balance and your code in one message."
      statusLeft="Rewards module / points accruing"
      statusRight="Referral programme open"
    />
  );
}
