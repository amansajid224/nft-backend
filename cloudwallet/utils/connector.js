import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
export const injected = new InjectedConnector({
  supportedChainIds: [1339],
});

// Options for the WalletConnect provider
const walletConnectOptions = {
  rpc: {
    1: process.env.NEXT_PUBLIC_RPC_URL,
  },
  qrcode: true,
};

// Create the WalletConnect connector
export const walletConnectConnector = new WalletConnectConnector(
  walletConnectOptions
);
