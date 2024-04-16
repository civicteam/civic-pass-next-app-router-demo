import {Connection, Keypair, Transaction} from "@solana/web3.js";

const connection = new Connection(process.env.PRIVATE_RPC ?? "https://api.devnet.solana.com", "processed");
const keypair = Keypair.fromSecretKey(Buffer.from(process.env.PAYER_SECRET_KEY ?? '', 'base64'));

/**
 * WARNING: This is a simple demo example. Not to be used in production.
 * In general, you should check that you trust the transaction before signing it.
 */
export const POST = async (request: Request) => {
    // parse the request into a transaction
    const {transaction} = await request.json() as { transaction: string };

    const parsedTransaction = Transaction.from(Buffer.from(transaction, 'base64'));
    parsedTransaction.partialSign(keypair);

    // sign and send the transaction
    // WARNING - Do NOT sign arbitrary transactions sent from an unsecured client. Your funds may be at risk.
    // This code is for demonstration purposes only
    const signature = await connection.sendRawTransaction(parsedTransaction.serialize(), {
        preflightCommitment: "processed"
    });

    const blockhash = await connection.getLatestBlockhash();
    console.log("Waiting for confirm...")
    await connection.confirmTransaction({ signature, ...blockhash });
    console.log("Confirmed")

    // serialise the transaction and return it
    return new Response(JSON.stringify({ signature }));
}
