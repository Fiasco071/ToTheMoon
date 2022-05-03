const GET_STOCKS = "stocks/GET_STOCKS";
const GET_STOCK = "stock/GET_STOCK";

const getStocks = (stocks) => {
  return {
    type: GET_STOCKS,
    payload: stocks,
  };
};

const getStock = (stock) => {
  return {
    type: GET_STOCK,
    payload: stock,
  };
};

export const getAllStocks = () => async (dispatch) => {
  const response = await fetch(`/api/stocks/`);

  if (response.ok) {
    const stocks = await response.json();
    dispatch(getStocks(stocks["stocks"]));
    return response;
  }
};

export const getAStock = (id) => async (dispatch) => {
  const response = await fetch(`/api/stocks/${id}`);

  if (response.ok) {
    const stock = await response.json();
    dispatch(getStock(stock));
    return response;
  }
};

const stockReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_STOCKS: {
      const newState = {};
      action.payload.forEach((stock) => (newState[stock.id] = stock));
      return newState;
    }
    case GET_STOCK: {
      return { ...state, [action.payload.id]: action.payload };
    }
    default:
      return state;
  }
};

export default stockReducer;
