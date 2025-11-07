"use client";


import { useEffect, useState } from "react";

type Token = {
  address: string;
  name?: string;
  symbol?: string;
  priceUsd?: string | null;
  priceChange24h?: string | number | null;
  volume24h?: string | number | null;
  liquidityUsd?: string | number | null;
  marketCap?: string | number | null;
  dex?: string | null;
  url?: string | null;
  lastUpdated?: string | null;
  pairCreatedAt?: string | null;
  error?: string;
};

export default function Home() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/token-price");
        if (!res.ok) {
          throw new Error("Failed to fetch /api/token-price");
        }
        const json = await res.json();
        setTokens(json.tokens ?? []);
      } catch (e: any) {
        console.error(e);
        setError(e?.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="mx-auto max-w-[1440px] px-8 py-24">
      <p className="font-bold text-md mb-4">
        $365 coin 4ztyXrk7YLUwJ56o1sAXMm7UM1xc4idF45HUcqM3pump
      </p>

      {loading && (
        <p className="text-sm text-muted-foreground">Loading tokens…</p>
      )}

      {error && !loading && (
        <p className="text-sm text-red-400">Error: {error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {tokens.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No tokens found in /api/token-price.
            </p>
          )}

          {tokens.map((token) => (
            <div
              key={token.address}
              className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold">
                    {token.name ?? "Unknown"}{" "}
                    {token.symbol && (
                      <span className="text-xs text-muted-foreground">
                        (${token.symbol})
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground break-all">
                    {token.address}
                  </div>
                </div>
                {token.priceUsd && (
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-400">
                      ${Number(token.priceUsd).toFixed(6)}
                    </div>
                    {token.priceChange24h !== null &&
                      token.priceChange24h !== undefined && (
                        <div
                          className={`text-xs ${
                            Number(token.priceChange24h) >= 0
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {Number(token.priceChange24h).toFixed(2)}% 24h
                        </div>
                      )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <div className="uppercase">MC</div>
                  <div className="text-white">
                    {token.marketCap != null
                      ? `$${Number(token.marketCap).toLocaleString()}`
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="uppercase">Vol 24h</div>
                  <div className="text-white">
                    {token.volume24h != null
                      ? `$${Number(token.volume24h).toLocaleString()}`
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="uppercase">Liquidity</div>
                  <div className="text-white">
                    {token.liquidityUsd != null
                      ? `$${Number(token.liquidityUsd).toLocaleString()}`
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="uppercase">DEX</div>
                  <div className="text-white">
                    {token.dex ?? "-"}
                  </div>
                </div>
              </div>

              {token.url && (
                <a
                  href={token.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs text-emerald-400 hover:underline"
                >
                  View on Dexscreener
                </a>
              )}

              {token.error && (
                <p className="mt-2 text-xs text-red-400">
                  Error: {token.error}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
