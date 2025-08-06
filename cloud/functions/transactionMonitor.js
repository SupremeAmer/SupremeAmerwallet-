import { Client, Databases } from 'node-appwrite';
import { ethers } from 'ethers';

export default async ({ req, res, log, error }) => {
  const { txHash, network } = JSON.parse(req.body);

  try {
    let status = 'pending';
    let provider;
    
    if (network === 'ETH') {
      provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
    } else if (network === 'BSC') {
      provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    } else {
      throw new Error('Unsupported network');
    }
    
    const receipt = await provider.getTransactionReceipt(txHash);
    
    if (receipt) {
      status = receipt.status === 1 ? 'confirmed' : 'failed';
    }
    
    // Update transaction in database
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);
    
    await databases.updateDocument(
      'wallet_db', 
      'transactions', 
      txHash, 
      { status }
    );

    return res.json({ status });
  } catch (err) {
    error(err.message);
    return res.json({ error: err.message }, 500);
  }
};