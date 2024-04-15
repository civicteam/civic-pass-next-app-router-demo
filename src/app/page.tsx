'use client';
import {CivicPassProvider} from "@/app/components/CivicPassProvider";
import {IdentityButton} from "@civic/solana-gateway-react";
import WalletProvider from "@/app/components/WalletProvider";
import WalletMultiButton from "@/app/components/WalletMultiButton";

export default async function Home() {
    return (
        <WalletProvider>
            <CivicPassProvider>
                <div className="flex min-h-screen items-center justify-center">
                    <main className="flex flex-col items-center justify-between p-6 max-h-[200px]">
                        <WalletMultiButton/>
                        <IdentityButton/>
                    </main>
                </div>
            </CivicPassProvider>
        </WalletProvider>
    )
};