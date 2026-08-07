// Single source of truth for the supported-country footprint.
// Previously duplicated (and drifting) across ConnectivityMap, NetworkGlobe,
// the Navbar currency chips and the /network page — which is why the site
// variously claimed 4 countries in three different combinations.

export type Country = {
  /** ISO-ish node id used by the connectivity map's connection graph. */
  id: string;
  name: string;
  currency: string;
  region: string;
  /** Indicative payout rate per 1 USDT, shown as a live-ish figure. */
  rate: string;
  status: string;
  /** Airport-style code for the Navbar's system-status clocks, e.g. "LOS". */
  cityCode: string;
  /** IANA zone backing that clock. */
  timeZone: string;
  /** Globe placement. */
  lat: number;
  lng: number;
  /** Flat connectivity-map placement, in percent of the frame. */
  x: number;
  y: number;
};

export const COUNTRIES: Country[] = [
  {
    id: 'NG',
    name: 'Nigeria',
    currency: 'NGN',
    region: 'West Africa',
    rate: '1,520 NGN',
    status: 'Operational',
    cityCode: 'LOS',
    timeZone: 'Africa/Lagos',
    lat: 9.08,
    lng: 8.67,
    x: 30,
    y: 44,
  },
  {
    id: 'GH',
    name: 'Ghana',
    currency: 'GHS',
    region: 'West Africa',
    rate: '14.2 GHS',
    status: 'Active',
    cityCode: 'ACC',
    timeZone: 'Africa/Accra',
    lat: 7.94,
    lng: -1.02,
    x: 20,
    y: 33,
  },
  {
    id: 'ZA',
    name: 'South Africa',
    currency: 'ZAR',
    region: 'Southern Africa',
    rate: '18.9 ZAR',
    status: 'High Liquidity',
    cityCode: 'JNB',
    timeZone: 'Africa/Johannesburg',
    lat: -30.55,
    lng: 22.93,
    x: 55,
    y: 76,
  },
  {
    id: 'TZ',
    name: 'Tanzania',
    currency: 'TZS',
    region: 'East Africa',
    rate: '2,600 TZS',
    status: 'Active',
    cityCode: 'DAR',
    timeZone: 'Africa/Dar_es_Salaam',
    lat: -6.37,
    lng: 34.89,
    x: 70,
    y: 54,
  },
  {
    id: 'KE',
    name: 'Kenya',
    currency: 'KES',
    region: 'East Africa',
    rate: '129 KES',
    status: 'Active',
    cityCode: 'NBO',
    timeZone: 'Africa/Nairobi',
    lat: -1.29,
    lng: 36.82,
    x: 76,
    y: 41,
  },
  {
    id: 'UG',
    name: 'Uganda',
    currency: 'UGX',
    region: 'East Africa',
    rate: '3,700 UGX',
    status: 'Active',
    cityCode: 'KLA',
    timeZone: 'Africa/Kampala',
    lat: 1.37,
    lng: 32.29,
    x: 64,
    y: 36,
  },
  {
    id: 'RW',
    name: 'Rwanda',
    currency: 'RWF',
    region: 'East Africa',
    rate: '1,340 RWF',
    status: 'Active',
    cityCode: 'KGL',
    timeZone: 'Africa/Kigali',
    lat: -1.94,
    lng: 29.87,
    x: 58,
    y: 48,
  },
];

/** Currency codes, for the Navbar chips and any rate rail. */
export const CURRENCIES = COUNTRIES.map((c) => c.currency);

/** Prose list, e.g. "Nigeria, Ghana, … and Rwanda". */
export const COUNTRY_LIST = COUNTRIES.map((c) => c.name).join(', ');

export const COUNTRY_COUNT = COUNTRIES.length;
