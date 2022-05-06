const GET_TRANSACTION = "transaction/GET_TRANSACTION";
const POST_TRANSACTION = "transaction/POST_TRANSACTION";
const PUT_TRANSACTION = "transaction/PUT_TRANSACTION";

const getTransaction = (transaction) => {
  return {
    type: GET_TRANSACTION,
    payload: transaction,
  };
};

const createATransaction = (transaction) => {
  return {
    type: POST_TRANSACTION,
    payload: transaction,
  };
};

const updateATransaction = (transaction) => {
  return {
    type: PUT_TRANSACTION,
    payload: transaction,
  };
};

export const getAllTransactions = () => async (dispatch) => {
  const response = await fetch(`/api/transactions/`);

  if (response.ok) {
    const transactions = await response.json();
    dispatch(getTransaction(transactions));
    return response;
  }
};

export const addATransaction = (data, id) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${id}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const transaction = await response.json();
    dispatch(createATransaction(transaction));
    return response;
  }
};

export const sellTransaction = (data, id) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${id}/sell`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const transaction = await response.json();
    dispatch(updateATransaction(transaction));
    return response;
  }
};

export const cashoutTransaction = (data, id) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${id}/cashout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const transaction = await response.json();
    dispatch(updateATransaction(transaction));
    return response;
  }
};

const transactionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TRANSACTION:
      const getAllTransactions = {};
      action.payload.transactions.forEach((transactions) => {
        getAllTransactions[transactions.id] = transactions;
      });
      return getAllTransactions;
    case POST_TRANSACTION: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case PUT_TRANSACTION: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default transactionReducer;
