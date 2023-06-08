

const Network = {
    '0x1': {
        chainId: '0xaa36a7',
        chainType: '2',
        chainName: 'ETH sepolia',
        shortName: 'ETH',

        rpcUrls: ['https://rpc.sepolia.org'],
        blockExplorerUrls: ['https://sepolia.etherscan.io'],
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
        },
    },
    '0x89': {
        chainId: '0x89',
        chainType: '2',
        chainName: 'Polygon Mainnet',
        shortName: 'MATIC',

        rpcUrls: ['https://polygon.llamarpc.com'],
        blockExplorerUrls: ['https://polygonscan.com'],
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
        },
    },
};
export {  Network,};
