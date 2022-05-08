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
  const this_watchlist = Object.values(watchlist).find(el => el.user_id == user?.id && el.stock_id == id)


  const [clicked, setClicked] = useState(false);
  if (this_watchlist) {
    setClicked(true)
  }

  const buttonToggle = () => {
    setClicked(!clicked);
  };

  const watch = {
    user_id: user?.id,
    stock_id: id,
  };

  useEffect(() => {
    clicked ? dispatch(addAWatch(watch, id)) : dispatch(delAWatch(this_watchlist?.id));
  }, [clicked]);

  return (
    <>
      {clicked == false && (
        <button onClick={buttonToggle} className="watchlist-button">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
      {this_watchlist && clicked == true && (
        <button onClick={buttonToggle} className="watchlist-button">
          <FontAwesomeIcon icon={faMinus} />
        </button>
      )}
    </>
  );
};
export default WatchListButton;
