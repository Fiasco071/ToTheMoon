import "./index.css";
import { useHistory } from "react-router-dom";
import WatchListButton from "../StockWatchlist";
import { useDispatch, useSelector } from "react-redux";
import { addAWatch, delAWatch } from "../../store/watchlist";


const WatchList = ({ stocks }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist);
  const user = useSelector((state) => state.session.user);

  return (
    <div>
      <div className="stocks-list">
        {Object.values(stocks).map((stock) => (
          <div
            key={stock?.id}
            className="stock-box"
            onClick={() => {
              history.push(`/stocks/${stock?.id}`);
            }}
          >
            <div>
              <h2 className="stock-ticker">{stock?.ticker}</h2>
              <h2 className="stock-price">${stock?.i_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
            </div>
            <div className="quickadd-stockln-box">
              <div>
                {!Object.values(watchlist)?.filter(
                  (watch) => watch?.user_id == user?.id && watch?.stock_id == stock?.id
                )[0] && (
                    <button onClick={() => dispatch(addAWatch({
                      user_id: user?.id,
                      stock_id: stock?.id,
                    }, stock?.id))} className="quickadd-button">
                      +
                    </button>
                  )}
                {Object.values(watchlist)?.filter(
                  (watch) => watch?.user_id == user?.id && watch?.stock_id == stock?.id
                )[0] && (
                    <button onClick={() => dispatch(delAWatch(Object.values(watchlist)?.filter(
                      (watch) => watch?.user_id == user?.id && watch?.stock_id == stock?.id
                    )[0]?.id))} className="quickadd-button remove">
                      -
                    </button>
                  )}
              </div>
              <p className="stock-lname">{stock?.long_name}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
