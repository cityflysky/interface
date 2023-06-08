const getters = {
    isConnected: state => state.app.isConnected,
    account: state => state.app.account,
    chainId:state => state.app.chainId,
    currentTheme:state => state.app.currentTheme,
    baseUrl:state=>state.baseUrl,
    ethBalance:state=>state.app.ethBalance,
    usdtBalance:state=>state.app.usdtBalance,
    web3:state=>state.app.web3,
    isSign:state=>state.app.isSign,
    usdtDecimal:state=>state.app.usdtDecimal,
}
export default getters
