const GET_SIM_DATA = 'simulation/GET_DATA'

const getSimData = (data) => {
    return {
        type: GET_SIM_DATA,
        payload: data
    }
}

export const getAllSimData = () => async (dispatch) => {
 const response = await fetch(`/api/stocks/test`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getSimData(data));
        return response;
    }
};

const simReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SIM_DATA: {
            const newState = { ...action.payload}
            return newState;
        }
        default:
            return state;
    }
}

export default simReducer;
