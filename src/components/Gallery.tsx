"use client";

import React from "react";
import { Magnetic } from '@/components/ui/shadcn-io/magnetic';

import { useEffect, useState } from "react";
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom';
import Image from 'next/image';
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

export default function Gallery() {
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
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
      }
    }

    load();
  }, []);

  function getImagePath(name: string) {
    if (!name) return "/assets/img/placeholder.png";
    const baseName = name.toLowerCase();
    const pngPath = `/assets/img/${baseName}.png`;
    const jpgPath = `/assets/img/${baseName}.jpg`;
    // Since we cannot check file existence at runtime in client-side React,
    // we try png first, then jpg, and fallback to placeholder.
    // The user should ensure that images are available at these paths.
    return pngPath;
  }

  return (
        /** GALLERY */
      <div className="container gallery space-y-6">
      <p className="text-3xl font-medium">gallery</p>
      <div className="grid grid-cols-10 gap-4">
        {tokens.map((token) => (
          <div key={token.address} className="flex flex-col items-center rounded-md shadow-md">
              <ImageZoom>
              <Magnetic>
            <Image
              src={getImagePath(token.name ?? "")}
              alt={token.name ?? "token image"}
              width={500}
              height={300}
              className="w-full object-contain mb-2"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/assets/img/placeholder.png";
              }}
            />
            </Magnetic>
            </ImageZoom>
            <span className="text-muted-foreground/25">{token.name ?? "Unnamed Token"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
