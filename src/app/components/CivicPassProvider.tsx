'use client';

import React, {FC, PropsWithChildren} from "react";
import {GatewayProvider} from "@civic/solana-gateway-react";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {PublicKey} from "@solana/web3.js";

const UNIQUENESS_PASS = new PublicKey("uniqobk8oGh4XBLMqM68K8M2zNu3CdYX7q5go7whQiv");
const CAPTCHA_PASS = new PublicKey("ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6")
const TEST_CAPTCHA_PASS = new PublicKey("tigoYhp9SpCDoCQmXGj2im5xa3mnjR1zuXrpCJ5ZRmi")
const TEST_LIVENESS_PASS = new PublicKey("tvaaHL9BSgZGLRAqUrx1Fzs2Uneb6BWGdnYuqrFoXm3")
const DUMMY_PASS = new PublicKey("tgnuXXNMDLK8dy7Xm1TdeGyc95MDym4bvAQCwcW21Bf")

const PAYER = new PublicKey(process.env.NEXT_PUBLIC_PAYER ?? "");

export const CivicPassProvider: FC<PropsWithChildren> = ({ children }) => {
    const wallet = useWallet();
    const { connection } = useConnection();

    return (
        <GatewayProvider
            wallet={wallet}
            connection={connection}
            gatekeeperNetwork={DUMMY_PASS}
            cluster="devnet"
            payer={PAYER}
            stage={"dev"}
            handleTransaction={async (transaction) => {
                const serializedTransaction = Buffer.from(transaction.serialize({
                    requireAllSignatures: false,
                })).toString('base64');
                console.log("blockhash", transaction.recentBlockhash)
                const response = await fetch('/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ transaction: serializedTransaction }),
                });
                const { signature } = await response.json();
                return signature;
            }}>
            {children}
        </GatewayProvider>
    )
};