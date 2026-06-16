export type CountryMeta = {
  code: string;
  name: string;
  flag: string;
  fiatCode: string;
  fiatSymbol: string;
  description: string;
  paymentMethods: string;
};

export const COUNTRIES: CountryMeta[] = [
  {
    code: "india",
    name: "India",
    flag: "IN",
    fiatCode: "INR",
    fiatSymbol: "₹",
    description: "Buy and sell crypto in India with INR using UPI (Google Pay, PhonePe, Paytm) or bank transfer (IMPS/NEFT).",
    paymentMethods: "UPI, Google Pay, PhonePe, Paytm, IMPS, NEFT, debit/credit card",
  },
  {
    code: "united-states",
    name: "United States",
    flag: "US",
    fiatCode: "USD",
    fiatSymbol: "$",
    description: "Buy and sell crypto in the United States with USD using ACH bank transfer or debit/credit card.",
    paymentMethods: "ACH bank transfer, debit/credit card, Apple Pay",
  },
  {
    code: "united-kingdom",
    name: "United Kingdom",
    flag: "GB",
    fiatCode: "GBP",
    fiatSymbol: "£",
    description: "Buy and sell crypto in the UK with GBP using Faster Payments or debit/credit card.",
    paymentMethods: "Faster Payments, debit/credit card, Apple Pay",
  },
  {
    code: "europe",
    name: "Europe",
    flag: "EU",
    fiatCode: "EUR",
    fiatSymbol: "€",
    description: "Buy and sell crypto in the EU with EUR using SEPA bank transfer or debit/credit card.",
    paymentMethods: "SEPA bank transfer, debit/credit card, Apple Pay",
  },
  {
    code: "australia",
    name: "Australia",
    flag: "AU",
    fiatCode: "AUD",
    fiatSymbol: "A$",
    description: "Buy and sell crypto in Australia with AUD using PayID or debit/credit card.",
    paymentMethods: "PayID, debit/credit card",
  },
  {
    code: "canada",
    name: "Canada",
    flag: "CA",
    fiatCode: "CAD",
    fiatSymbol: "C$",
    description: "Buy and sell crypto in Canada with CAD using Interac e-Transfer or debit/credit card.",
    paymentMethods: "Interac e-Transfer, debit/credit card",
  },
  {
    code: "singapore",
    name: "Singapore",
    flag: "SG",
    fiatCode: "SGD",
    fiatSymbol: "S$",
    description: "Buy and sell crypto in Singapore with SGD using bank transfer or debit/credit card.",
    paymentMethods: "Bank transfer, debit/credit card",
  },
  {
    code: "uae",
    name: "UAE",
    flag: "AE",
    fiatCode: "AED",
    fiatSymbol: "د.إ",
    description: "Buy and sell crypto in the UAE with AED using bank transfer or debit/credit card.",
    paymentMethods: "Bank transfer, debit/credit card",
  },
  {
    code: "japan",
    name: "Japan",
    flag: "JP",
    fiatCode: "JPY",
    fiatSymbol: "¥",
    description: "Buy and sell crypto in Japan with JPY using bank transfer or debit/credit card.",
    paymentMethods: "Bank transfer, debit/credit card",
  },
  {
    code: "brazil",
    name: "Brazil",
    flag: "BR",
    fiatCode: "BRL",
    fiatSymbol: "R$",
    description: "Buy and sell crypto in Brazil with BRL using PIX instant payment or debit/credit card.",
    paymentMethods: "PIX, debit/credit card",
  },
];

export function findCountryBySlug(slug: string): CountryMeta | undefined {
  return COUNTRIES.find((c) => c.code === slug);
}
