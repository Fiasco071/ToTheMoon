const GET_WATCHLIST = "watchlist/GET_WATCHLIST";
const ADD_WATCH = "watchlist/ADD_WATCH";
const DEL_WATCH = "watchlist/DEL_WATCH";

const getWatchlist = (watchlist) => {
  return {
    type: GET_WATCHLIST,
    payload: watchlist,
  };
};

const addWatch = (watch) => {
  return {
    type: ADD_WATCH,
    payload: watch,
  };
};

const delWatch = (id) => {
  return {
    type: DEL_WATCH,
    payload: id,
  };
};

export const getAWatchlist = () => async (dispatch) => {
  const response = await fetch(`/api/watchlist/`);
  if (response.ok) {
    const watchlist = await response.json();
    dispatch(getWatchlist(watchlist));
    return response;
  }
};

export const addAWatch = (data, id) => async (dispatch) => {
  const response = await fetch(`/api/watchlist/add/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const watch = await response.json();
    dispatch(addWatch(watch));
    return response;
  }
};

export const delAWatch = (id) => async (dispatch) => {
  const response = await fetch(`/api/watchlist/del/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(delWatch(id));
  }
};

const watchlistReducer = (state = [], action) => {
  switch (action.type) {
    case GET_WATCHLIST: {
      const getAll = {};
      action.payload.watchlist.forEach((watch) => {
        getAll[watch.id] = watch;
      });
      return getAll;
    }
    case ADD_WATCH: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DEL_WATCH: {
      const newState = {};
      delete newState[action.payload];
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default watchlistReducer;
