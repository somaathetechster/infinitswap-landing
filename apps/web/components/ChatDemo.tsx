import WhatsAppMockup from "./WhatsAppMockup";

function Bubble({ side, time, children }: { side: "left" | "right"; time: string; children: React.ReactNode }) {
  return (
    <div className={side === "right" ? "wa-row justify-end" : "wa-row justify-start"}>
      <div className={"wa-bubble " + (side === "right" ? "wa-user" : "wa-bot")}>
        {children}
        <div className="wa-time">{time}{side === "right" && <span className="ml-1 text-[#53BDEB]">✓✓</span>}</div>
      </div>
    </div>
  );
}

export default function ChatDemo() {
  return (
    <section id="why" className="bg-[#0A0A0A] py-24 md:py-32">
      <div className="section-wrap grid items-center gap-14 lg:grid-cols-[1fr_minmax(0,460px)]">
        <div>
          <h2 className="display max-w-[560px] text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-.05em] text-white">
            Why a conversation.
          </h2>
          <div className="mt-8 max-w-[520px] space-y-5 text-[17px] leading-[1.65] text-[#9A9A9A]">
            <p>Every app makes you learn its menus, fill its forms, and hunt for the right button. A conversation asks for none of that.</p>
            <p>You say what you mean. The AI understands it, confirms exactly what it will do, and only then executes — the same way you&apos;d instruct a person you trust.</p>
            <p className="text-[#EDEDED]">No app. No dashboard. No learning curve.</p>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <WhatsAppMockup glowIntensity="medium">
            <div className="flex min-h-full flex-col gap-2">
              <Bubble side="left" time="10:41">Hey 👋 what do you need?</Bubble>
              <Bubble side="right" time="10:41">Send ₵200 to Kwame for the generator fuel</Bubble>
              <Bubble side="left" time="10:41">Kwame Mensah — MTN MoMo, 024&#8226;&#8226;321.<br /><strong>Sending ₵200. Confirm?</strong></Bubble>
              <Bubble side="right" time="10:42">Yes</Bubble>
              <Bubble side="left" time="10:42">Done ✅ Kwame has the ₵200. I&apos;ve saved the receipt here for you.</Bubble>
              <span className="wa-confirm"><span className="h-2 w-2 rounded-full bg-[#22C55E]" />Payment confirmed</span>
            </div>
          </WhatsAppMockup>
        </div>
      </div>
    </section>
  );
}
