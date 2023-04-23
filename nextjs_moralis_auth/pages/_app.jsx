import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
// Supported chains: https://wagmi.sh/react/chains#supported-chains
import { mainnet, goerli } from 'wagmi/chains';
import { SessionProvider } from 'next-auth/react';

const { provider, webSocketProvider } = configureChains([mainnet, goerli], [publicProvider()]);

const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider
});

function MyApp({ Component, pageProps }) {
    return (
        <WagmiConfig client={client}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <Component {...pageProps} />
            </SessionProvider>
        </WagmiConfig>
    );
}

export default MyApp;
