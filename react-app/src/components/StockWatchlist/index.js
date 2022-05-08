import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { addAWatch } from "../../store/watchlist";
import { delAWatch } from "../../store/watchlist";

const WatchListButton = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector((state) => state.session.user);
  const watchlist = useSelector((state) => state.watchlist);
  const this_watchlist = Object.values(watchlist)?.filter(
    (watch) => watch?.user_id == user?.id && watch?.stock_id == id
  )[0];

  const watch = {
    user_id: user?.id,
    stock_id: id,
  };

  const addToWatchList = () => {
    dispatch(addAWatch(watch, id));
  };

  const deleteFromWatchList = () => {
    dispatch(delAWatch(this_watchlist?.id));
  };

  return (
    <>
      {Object.values(watchlist)?.length == 0 && (
        <button onClick={addToWatchList} className="watchlist-button">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
      {/* {this_watchlist && clicked == true && ( */}
      {Object.values(watchlist)?.length > 0 && (
        <button onClick={deleteFromWatchList} className="watchlist-button">
          <FontAwesomeIcon icon={faMinus} />
        </button>
      )}
      {/* )} */}
    </>
  );
};
export default WatchListButton;
