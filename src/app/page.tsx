"use client";

import {IdentityButton} from "@civic/solana-gateway-react";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";

export default async function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <main className="flex flex-col items-center justify-between p-6 max-h-[200px]">
                <WalletMultiButton/>
                <IdentityButton/>
            </main>
        </div>
    )
};