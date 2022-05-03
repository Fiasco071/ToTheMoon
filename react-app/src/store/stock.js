const GET_STOCKS = 'stocks/GET_STOCKS'

const getStocks = (stocks) => {
    return {
        type: GET_STOCKS,
        payload: stocks
    }
}


export const getAllStocks = () => async (dispatch) => {
    const response = await fetch(`/api/stocks/`)

    if (response.ok) {
        const stocks = await response.json();
        dispatch(getStocks(stocks["stocks"]));
        return response;
    }
};


const stockReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_STOCKS: {
            const newState = {}
            action.payload.forEach(stock => newState[stock.id] = stock)
            return newState;
        }
        default:
            return state;
    }
}


export default stockReducer;
