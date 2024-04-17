'use client';
import { DynamicWidget, useDynamicContext } from "../lib/dynamic";
import {CivicPassProvider} from "@/app/context/CivicPassProvider";
import {IdentityButton} from "@civic/ethereum-gateway-react";

export default function Home() {
    return (
        <CivicPassProvider>
            <div className="flex min-h-screen items-center justify-center">
                <main className="flex flex-col items-center justify-between p-6 max-h-[200px]">
                    <DynamicWidget/>
                    <IdentityButton/>
                </main>
            </div>
        </CivicPassProvider>
    )
};