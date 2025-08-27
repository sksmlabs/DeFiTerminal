// src/data/chains.ts

import ethIcon from "@/assets/chains/eth.svg"
import bscIcon from "@/assets/chains/bsc.svg"

export type ChainItem = {
  value: string
  label: string
  icon?: string
}

export const chainItems: ChainItem[] = [
    { value: "mainnet", label: "Mainnet", icon: ethIcon},
    { value: "bsc", label: "BSC", icon: bscIcon },
    { value: "solana", label: "Solana" },
    { value: "unichain", label: "Unichain" },
    { value: "polygon", label: "Polygon" },
    { value: "sonic", label: "Sonic" },
    { value: "tac", label: "TAC" },
    { value: "worldchain", label: "Worldchain" },
    { value: "lisk", label: "Lisk" },
    { value: "base", label: "Base" },
  ]