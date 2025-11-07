import cas from "./data.json";

export async function GET() {
  try {
    // On s'assure d'avoir un tableau de strings et on limite à 365 entrées
    const addresses = (cas as string[]).filter(Boolean).slice(0, 365);

    const results: any[] = [];

    for (const address of addresses) {
      try {
        const res = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${address}`,
          { next: { revalidate: 30 } }
        );

        if (!res.ok) {
          results.push({
            address,
            error: "Failed to fetch price",
          });
          continue;
        }

        const data = await res.json();
        const pair = data?.pairs?.[0];

        results.push({
          address,
          name: pair?.baseToken?.name ?? "Unknown",
          symbol: pair?.baseToken?.symbol ?? "???",
          priceUsd: pair?.priceUsd ?? null,
          priceChange24h: pair?.priceChange?.h24 ?? null,
          volume24h: pair?.volume?.h24 ?? null,
          liquidityUsd: pair?.liquidity?.usd ?? null,
          marketCap: pair?.fdv ?? null,
          dex: pair?.dexId ?? null,
          url: pair?.url ?? null,
          lastUpdated: new Date().toISOString(),
          pairCreatedAt: pair?.pairCreatedAt
            ? new Date(pair.pairCreatedAt).toISOString()
            : null,
        });
      } catch (err) {
        results.push({
          address,
          error: "Exception during fetch",
        });
      }
    }

    return Response.json({ tokens: results });
  } catch (err) {
    console.error("Error in token-price route:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}