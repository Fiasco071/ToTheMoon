import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllStocks, getAStock } from "../../store/stock";
import { useHistory, useParams } from "react-router-dom";
import StockGraph from "./stockGraph";
import TransactionForm from "../Transaction";
import { logout } from "../../store/session";
import WatchList from "../WatchList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faDoorOpen, faHome } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { getAllAssets } from "../../store/asset";
import SellTransactionForm from "../SellTransaction/index";
import CashoutStockForm from "../CashoutStock";

const StockDetail = () => {
  let dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const stocks = useSelector((state) => state.stocks);
  const stock = useSelector((state) => state.stocks[id]);
  const user = useSelector((state) => state.session.user);
  const assets = useSelector((state) => state.assets);

  const [isShown, setIsShown] = useState(1);
  const [isCashedOut, setIsCashedOut] = useState(false);
  const [newTransaction, setNewTransaction] = useState(false);
  const prop = { newTransaction, setNewTransaction, isShown, setIsShown }

  let assetOwned = []
  Object.values(assets).forEach(asset => {
    if (asset.stock?.id == id) {
      assetOwned.push(asset)
    }
  });

  
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  useEffect(() => {
    dispatch(getAStock(id));
    dispatch(getAllStocks());
    dispatch(getAllAssets());
  }, [dispatch, newTransaction]);

  const changeTransactionBuy = () => {
    setIsCashedOut(false);
    setIsShown(1);
  };

  const changeTransactionSell = () => {
    setIsCashedOut(false);
    setIsShown(2);
  };

  const showCashout = () => {
    setIsCashedOut(true);
    setIsShown(3)
  };

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
            <div className="profile-icon-box-home">
              <FontAwesomeIcon
                icon={faHome}
                className="profile-icon"
                onClick={() => history.push('/home')}
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
              <div className="transactions-form-container">
                <div className="transactions-btns">
                  <button
                    onClick={() => {
                      changeTransactionBuy();
                    }}
                  >
                    Buy
                  </button>
                  {assetOwned[0]?.num_shares > 0 && (
                    <button
                      onClick={() => {
                        changeTransactionSell();
                      }}
                    >
                      Sell
                    </button>
                  )}
                  {assetOwned[0]?.num_shares > 0 && (<button onClick={() => {
                    showCashout();
                  }}>
                    Cashout
                  </button>)}
                </div>
                {isCashedOut && <CashoutStockForm prop={prop}/>}
              {isShown === 1 && <TransactionForm prop={prop}/>}
              {isShown === 2 && assetOwned.length > 0 && <SellTransactionForm prop={prop}/>}
            </div>
            </div>
            <div>
              <section className="about-box" height={400}>
                About
                <p>{stock?.info1} Bussin Bussin Corp</p>
                <p>
                  {stock?.info2} Bussin Bussin, Co. engages in the design,
                  manufacture, and sale of smartphones, personal computers,
                  tablets, wearables and accessories, and other varieties of
                  related services. It operates through the following
                  geographical segments: Americas, Europe, Greater China, Japan,
                  and Rest of Asia Pacific. View more
                </p>
                <p>
                  {stock?.info3}CEO Timothy Donald Cook Employees 154,000
                  Headquarters Cupertino, California Founded 1976
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
