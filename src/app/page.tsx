"use client";
import { useEffect, useState } from "react";

import Tokens from "@/components/Tokens";
import Chart from "@/components/Chart";

import CustomTerminal from "@/components/CustomTerminal";

export default function Home() {
  const [terminalDone, setTerminalDone] = useState(false);

  return (
    <div className="mx-auto max-w-[1440px] px-8 flex flex-col gap-8 py-24">
      <div className="header">
        <p className="font-bold text-6xl italic mb-4">$365 coin</p>
        <p>
          365 is a year-long on-chain performance by an artist deploying one
          token per day on Pump.fun. A reflection on creation, decay, and the
          permanence of digital memory.
        </p>
        <a
          href="https://twitter.com/r3ktsatoshi"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted-foreground hover:underline block"
        >
          Follow the project on Twitter
        </a>
      </div>
      <CustomTerminal onComplete={(done) => setTerminalDone(done)} />
      <div className="container flex flex-col space-y-8">
        <Chart />
        {/* <div className="container space-y-8 flex flex-col md:items-end">
          <div className="toto">toto</div>
        </div> */}
        <Tokens />
      </div>
    </div>
  );
}
