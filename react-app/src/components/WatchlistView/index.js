import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const WatchlistView = () => {
  const history = useHistory();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const watchlist = useSelector((state) => state.watchlist);
  const my_watchlist = Object.values(watchlist)?.filter(
    (watch) => watch?.user_id == user?.id
  );

  const stock_id_arr = [];
  my_watchlist?.forEach((watch) => {
    stock_id_arr.push(watch?.stock_id);
  });

  const stockss = useSelector((state) => state.stocks);
  const stocks = Object.values(stockss)?.filter((stock) =>
    stock_id_arr.includes(stock?.id)
  );
  console.log(stocks);

  return (
    <div>
      <h2 className="watch-list-title">Watch List</h2>
      <div className="stocks-list">
        {stocks?.map((stock) => (
          <div
            key={stock?.id}
            className="stock-box"
            onClick={() => {
              history.push(`/stocks/${stock?.id}`);
            }}
          >
            <div>
              <h2 className="stock-ticker">{stock?.ticker}</h2>
              <h2 className="stock-price">
                $
                {stock?.i_price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h2>
            </div>
            <div>
              <p className="stock-lname">{stock?.long_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistView;
