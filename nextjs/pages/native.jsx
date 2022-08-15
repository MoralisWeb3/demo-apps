import Moralis from 'moralis';

function Native({ nativeBalance, address }) {
    return (
        <div>
            <h3>Wallet: {address}</h3>
            <h3>Native Balance: {nativeBalance} ETH</h3>
        </div>
    );
}

export async function getServerSideProps(context) {
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

    const address = '0x...';

    const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
        address,
    });

    return {
        props: { address, nativeBalance: nativeBalance.result.balance.ether },
    };
}

export default Native;
