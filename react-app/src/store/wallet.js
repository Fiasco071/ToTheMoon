const GET_WALLET = 'wallet/GET_WALLET'
const POST_WALLET = 'wallet/POST_WALLET'


const getAWallet = (wallet) => {
    return {
        type: GET_WALLET,
        payload: wallet
    }
}

const
