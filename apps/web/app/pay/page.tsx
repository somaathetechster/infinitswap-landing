import type { Metadata } from 'next';
import ModulePage from '../../components/shared/ModulePage';
import type { StepItem } from '../../components/shared/StepCard';
import { waLink, WA_PREFILL } from '../../lib/whatsapp';
import { COUNTRY_LIST, COUNTRY_COUNT } from '../../lib/countries';

export const metadata: Metadata = {
  title: 'Pay & Bills — Infinitswap',
  description:
    'Airtime, data, electricity, water, cable TV and betting wallets — paid in a WhatsApp message or automated on autopay, across seven African countries.',
};

const BILLS: StepItem[] = [
  {
    id: '01',
    tag: 'Category',
    micro: 'StayConnected',
    title: 'Airtime and data',
    detail:
      'Top up any number on any supported network — yours or someone else’s — straight from your wallet balance. Send the number, pick the bundle, done.',
  },
  {
    id: '02',
    tag: 'Category',
    micro: 'KeepTheLightsOn',
    title: 'Electricity and water',
    detail:
      'Buy prepaid units or settle a postpaid account and get the token back in the same chat, so there is nothing to copy across from another app.',
  },
  {
    id: '03',
    tag: 'Category',
    micro: 'KeepWatching',
    title: 'Internet and cable',
    detail:
      'Renew home broadband, and cable packages like DSTV, GOtv and Startimes, by account or decoder number. Put the subscription on autopay once and the renewal stops being something you have to remember.',
  },
  {
    id: '04',
    tag: 'Category',
    micro: 'FeesAndFilings',
    title: 'Education and government',
    detail:
      'Pay school and exam fees, and settle government charges and levies where the biller is supported, with a reference you can keep — the kind of payment that usually means a queue and a morning off work.',
  },
  {
    id: '05',
    tag: 'Category',
    micro: 'FundTheWallet',
    title: 'Betting wallets',
    detail:
      'Fund a betting account by ID without leaving the conversation, with the same balance and the same limits as every other payment you make.',
  },
  {
    id: '06',
    tag: 'Automation',
    micro: 'SetItAndForgetIt',
    title: 'Bills on autopay',
    detail:
      'Put any recurring bill on a schedule — weekly, monthly, or on a date you pick. Infinitswap reminds you before it charges, pays on the day, retries if a rail is down or your balance is short, and tells you either way, so a missed payment is never a silent one.',
  },
];

export default function PayPage() {
  return (
    <ModulePage
      eyebrow="Bills / module 03"
      titleTop="Never Miss"
      titleBottom="A Bill Again."
      intro="Airtime, data, electricity, water, cable, betting — paid in a chat message, or automated so it happens without you. Across Nigeria, Ghana, South Africa, Tanzania, Kenya, Uganda, and Rwanda."
      items={BILLS}
      cardFooterLabel="Bills module"
      cardStatusLabel="Rail active"
      facts={[
        { label: `Countries (${COUNTRY_COUNT})`, value: COUNTRY_LIST },
        { label: 'Pay from', value: 'Any local wallet balance' },
        { label: 'Autopay', value: 'Reminder, charge, retry, receipt' },
      ]}
      ctaHref={waLink(WA_PREFILL.bills)}
      ctaLabel="Pay a bill"
      ctaNote="One message. Receipt back in the same chat."
      statusLeft="Bills module / 7 country rails"
      statusRight="All billers operational"
    />
  );
}
