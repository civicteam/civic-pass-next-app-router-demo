import {Connection, Keypair, Transaction} from "@solana/web3.js";

const connection = new Connection(process.env.PRIVATE_RPC ?? "https://api.devnet.solana.com");
const keypair = Keypair.fromSecretKey(Buffer.from(process.env.PAYER_SECRET_KEY ?? '', 'base64'));

/**
 * WARNING: This is a simple demo example. Not to be used in production.
 * In general, you should check that you trust the transaction before signing it.
 */
export const POST = async (request: Request) => {
    // parse the request into a transaction
    const {transaction} = await request.json() as { transaction: string };

    console.log(transaction);

    const parsedTransaction = Transaction.from(Buffer.from(transaction, 'base64'));
    parsedTransaction.partialSign(keypair);

    console.log("Blockhash", parsedTransaction.recentBlockhash);

    // sign and send the transaction
    const signature = await connection.sendRawTransaction(parsedTransaction.serialize(), {
        // preflightCommitment: "finalized"
        // skipPreflight: true
    });

    // serialise the transaction and return it
    return new Response(JSON.stringify({ signature }));
}