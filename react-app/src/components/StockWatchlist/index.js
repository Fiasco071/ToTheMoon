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

  console.log(id);

  const user = useSelector((state) => state.session.user);

  const watchlist = useSelector((state) => state.watchlist);

  console.log(watchlist);

  const [clicked, setClicked] = useState(false);

  const buttonToggle = () => {
    setClicked(!clicked);
  };

  const watch = {
    user_id: user?.id,
    stock_id: id,
  };

  useEffect(() => {
    clicked ? dispatch(addAWatch(watch, id)) : dispatch(delAWatch(watch));
  }, [clicked]);

  return (
    <>
      {clicked == false && (
        <button onClick={buttonToggle} className="watchlist-button">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
      {clicked == true && (
        <button onClick={buttonToggle} className="watchlist-button">
          <FontAwesomeIcon icon={faMinus} />
        </button>
      )}
    </>
  );
};
export default WatchListButton;
