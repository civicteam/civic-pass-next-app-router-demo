import {JsonRpcProvider, TransactionRequest, Wallet} from 'ethers';

const provider = new JsonRpcProvider(process.env.PRIVATE_RPC);
const wallet = new Wallet(process.env.PAYER_SECRET_KEY ?? "").connect(provider);

export const POST = async (request: Request) => {
  const transactionRequest = await request.json() as TransactionRequest;

  // Sign and send the transaction
  // WARNING - Do NOT sign arbitrary transactions sent from an unsecured client. Your funds may be at risk.
  // This code is for demonstration purposes only
  const transactionResponse = await wallet.sendTransaction(transactionRequest);

  // Send back the transaction response
  return new Response(JSON.stringify(transactionResponse));
};