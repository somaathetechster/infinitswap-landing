"use client";
import { useState } from "react";
import Reveal from "./Reveal";
const questions = [
  ["What is Infinitswap?", "Infinitswap is a financial platform that helps you hold, convert and spend USDT and stablecoins in local currencies across supported African markets. It works through WhatsApp, so you can manage everyday payments in a conversation."],
  ["Is Infinitswap a bank?", "No. Infinitswap is not a bank. It connects you with payment services and tools for moving money; regulated payment providers handle the relevant payment services."],
  ["Who holds my funds?", "Funds move through the payment providers involved in your transaction. Infinitswap does not hold your money in a proprietary ledger."],
  ["Who provides the payment services?", "Payment services are provided by regulated payment providers and licensed partners. The specific provider can depend on your country and the service you use."],
  ["What fees apply?", "Fees depend on the service, currency and payment provider. You will see the rate and any applicable fee before you confirm a transaction."],
  ["How does crypto-to-cash conversion work?", "Tell Infinitswap the amount of USDT and local currency you want. You receive a live quote, confirm it in WhatsApp, and the local currency is sent to your linked account."],
  ["How long do transactions normally take?", "Many transactions complete in seconds or a few minutes. Timing can vary with the payment provider, bank and local network."],
  ["What happens if a transaction fails?", "You will see an update in the chat and your funds will not be treated as completed. Contact support if a reversal or follow-up is needed."],
  ["How is my information protected?", "We use security controls designed to protect your information and transaction. Private keys are never shared, and support will not ask for your password or secret keys."],
  ["Which countries are currently supported?", "Support currently includes Nigeria, Ghana, Tanzania and South Africa, with more markets expanding. Availability can differ by feature."],
  ["Can I spend USDT directly in Africa?", "Yes, where the relevant payment service is available. You can use USDT to pay for everyday services or convert it into the local currency you need."],
  ["Can I convert USDT to Naira?", "Yes. Request a USDT to Naira quote in WhatsApp, review the rate and confirm when you are ready."],
  ["Can I use USDT to pay bills?", "Yes. You can pay for services such as airtime, data, electricity and cable TV through WhatsApp in supported markets."],
  ["Is USDT the same as the US dollar?", "No. USDT is a digital token designed to track the value of the US dollar. Its price can vary and it is not the same as holding US dollars in a bank account."],
];
export default function FAQ() { const [active, setActive] = useState<number | null>(0); return <section id="faq" className="section-wrap py-20 md:py-28"><Reveal><p className="mb-4 text-sm font-semibold text-[#6C3FE8]">Questions, answered</p><h2 className="display text-3xl font-bold tracking-[-.04em] sm:text-4xl">What you should know before you start.</h2><div className="mt-10 divide-y divide-[#dcd0ed] border-y border-[#dcd0ed]">{questions.map(([question, answer], index) => <div key={question}><h3><button className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C3FE8]" aria-expanded={active === index} onClick={() => setActive(active === index ? null : index)}><span>{question}</span><span className="text-2xl font-normal text-[#6C3FE8]">{active === index ? "−" : "+"}</span></button></h3>{active === index && <p className="max-w-[760px] pb-5 pr-8 leading-7 text-[#5A4E6E]">{answer}</p>}</div>)}</div></Reveal></section>; }
