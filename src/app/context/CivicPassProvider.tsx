'use client';

import { useDynamicContext } from "../../lib/dynamic";
import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {JsonRpcSigner} from "ethers";
import {GatewayProvider} from "@civic/ethereum-gateway-react";

const UNIQUENESS_PASS = "uniqobk8oGh4XBLMqM68K8M2zNu3CdYX7q5go7whQiv";

export const CivicPassProvider: FC<PropsWithChildren> = ({ children }) => {
    const { primaryWallet } = useDynamicContext();
    const [signer, setSigner] = useState<JsonRpcSigner>();
    useEffect(
        () => {
            primaryWallet?.connector.ethers?.getSigner().then(setSigner)
        },
        [primaryWallet]
    );

    return (
        <GatewayProvider wallet={{
            signer,
            address: primaryWallet?.address
        }} gatekeeperNetwork={UNIQUENESS_PASS}>
            {children}
        </GatewayProvider>
    )
};