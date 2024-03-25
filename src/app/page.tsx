'use client';
import { DynamicWidget, useDynamicContext } from "../lib/dynamic";
import {CivicPassProvider} from "@/app/context/CivicPassProvider";
import {IdentityButton} from "@civic/ethereum-gateway-react";

export default async function Home() {
    return (
        <CivicPassProvider>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <DynamicWidget/>
                <IdentityButton/>
            </main>
        </CivicPassProvider>
    )
};