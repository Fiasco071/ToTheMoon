const GET_WALLET = "wallet/GET_WALLET";
const POST_WALLET = "wallet/POST_WALLET";
const REMOVE_WALLET = "wallet/REMOVE_WALLET";

const getWallet = (wallet) => {
  return {
    type: GET_WALLET,
    payload: wallet,
  };
};

const addWallet = (wallet) => {
  return {
    type: POST_WALLET,
    payload: wallet,
  };
};

const removeWallet = () => {
  return {
    type: REMOVE_WALLET,
  };
};

export const getAWallet = () => async (dispatch) => {
  const response = await fetch(`/api/wallet/`);

  if (response.ok) {
    const wallet = await response.json();
    dispatch(getWallet(wallet));
    return response;
  }
};

export const addAWallet = (data) => async (dispatch) => {
  const response = await fetch(`/api/wallet/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const wallet = await response.json();
    dispatch(addWallet(wallet));
    return response;
  }
};

export const walletWithdraw = (data) => async (dispatch) => {
  const response = await fetch(`/api/wallet/minus`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const wallet = await response.json();
    dispatch(addWallet(wallet));
    return response;
  }
};
export const cashMeOutside = () => async (dispatch) => {
  const response = await fetch(`/api/wallet/del`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const wallet = await response.json();
    dispatch(addWallet(wallet));
    return response;
  }
};

export const removeWalletonLogout = () => async (dispatch) => {
  dispatch(removeWallet());
  return "hello";
};

const walletReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_WALLET: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case POST_WALLET: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case REMOVE_WALLET: {
      return {};
    }
    default:
      return state;
  }
};

export default walletReducer;
