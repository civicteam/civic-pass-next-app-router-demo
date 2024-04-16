'use client';

import {useDynamicContext} from "../../lib/dynamic";
import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {JsonRpcSigner, TransactionRequest} from "ethers";
import {GatewayProvider} from "@civic/ethereum-gateway-react";

const PAYER = process.env.NEXT_PUBLIC_PAYER ?? "";
const UNIQUENESS_PASS = "uniqobk8oGh4XBLMqM68K8M2zNu3CdYX7q5go7whQiv";
const CAPTCHA_PASS = "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6";
const DUMMY_PASS = "tgnuXXNMDLK8dy7Xm1TdeGyc95MDym4bvAQCwcW21Bf";

// handle BigInt serialization
const serializer = (key: string, value: any) =>
    typeof value === 'bigint'
        ? value.toString()
        : value // return everything else unchanged

export const CivicPassProvider: FC<PropsWithChildren> = ({ children }) => {
    const { primaryWallet } = useDynamicContext();
    const [signer, setSigner] = useState<JsonRpcSigner>();
    useEffect(
        () => {
            primaryWallet?.connector.ethers?.getSigner().then(setSigner)
        },
        [primaryWallet]
    );

    // call the backend to sign and send the transaction
    const handleTransaction = async (request: TransactionRequest) => {
        const responsePromise = await fetch('/api', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(request, serializer),
        });
        return responsePromise.json();
    };

    return (
        <GatewayProvider
            wallet={{
                signer,
                address: primaryWallet?.address
            }}
            gatekeeperNetwork={DUMMY_PASS}
            payer={PAYER}
            stage={"dev"}
            handleTransaction={handleTransaction}
        >
            {children}
        </GatewayProvider>
    )
};