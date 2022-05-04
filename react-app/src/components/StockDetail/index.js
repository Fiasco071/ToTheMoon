import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllStocks, getAStock } from "../../store/stock";
import { useParams } from "react-router-dom";
import StockGraph from "./stockGraph";
import TransactionForm from "../Transaction";
import { logout } from "../../store/session";
import WatchList from "../WatchList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { getAllAssets } from "../../store/asset";

const StockDetail = () => {
  let dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  const stocks = useSelector((state) => state.stocks);
  const stock = useSelector((state) => state.stocks[id]);
  const user = useSelector((state) => state.session.user);
  console.log(user);

  const onLogout = async (e) => {
    await dispatch(logout());
  };

  useEffect(() => {
    dispatch(getAStock(id));
    dispatch(getAllStocks());
    dispatch(getAllAssets());
  }, [dispatch]);

  return (
      <div className="dashboard-wrapper">
        <div className="dashboard">
          <div className="dashboard-title-bar">
            <div className="profile-icon-box-wrapper">
              <div className="profile-icon-box">
                <FontAwesomeIcon icon={faUser} className="profile-icon" />
              </div>
              <div className="profile-icon-box-menu">
                <FontAwesomeIcon
                  icon={faDoorOpen}
                  className="profile-icon"
                  onClick={onLogout}
                />
              </div>
            </div>
            <h2 className="dashboard-username">{user?.username}</h2>
          </div>
          <div className="dashboard-content-box">
            <div className="dashboard-content-navbar"></div>
            <div className="dashboard-content stock-details-content">
              <div className="stockDetailContainer">
                <h2>{stock?.long_name}</h2>
                <h2>{stock?.ticker}</h2>
                <p>${stock?.i_price}</p>
                <div>
                    Your Equity
                    <div>$12,496.87</div>
                  </div>
              </div>
            <div className="graph-container">
                <div className="stock-graph">
                    <StockGraph />
                </div>
                  <TransactionForm />
                </div>
                <div>
                    <section className="about-box" height={400}>
                      About
                      <p>{stock?.info1} Bussin Bussin Corp</p>
                      <p>
                        {stock?.info2} Bussin Bussin, Co. engages in the design,
                        manufacture, and sale of smartphones, personal computers, tablets,
                        wearables and accessories, and other varieties of related services.
                        It operates through the following geographical segments: Americas,
                        Europe, Greater China, Japan, and Rest of Asia Pacific. View more
                      </p>
                      <p>
                        {stock?.info3}CEO Timothy Donald Cook Employees 154,000 Headquarters
                        Cupertino, California Founded 1976
                      </p>
                    </section>
              </div>
          </div>
            <div className="dashboard-watchlist-box">
              <WatchList stocks={stocks} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
