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
import HexaMenu from "../Dashboard/HexaMenu";
import SearchBar from "../SearchBar";
import { getAWallet } from "../../store/wallet";

const StockDetail = () => {
  let dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const stocks = useSelector((state) => state.stocks);
  const stock = useSelector((state) => state.stocks[id]);
  const user = useSelector((state) => state.session.user);
  const assets = useSelector((state) => state.assets);
  const wallet = useSelector((state) => state.wallet);

  const [isShown, setIsShown] = useState(1);
  const [isCashedOut, setIsCashedOut] = useState(false);
  const [newTransaction, setNewTransaction] = useState(false);
  const prop = { newTransaction, setNewTransaction, isShown, setIsShown };

  let assetOwned = [];
  Object.values(assets).forEach((asset) => {
    if (asset.stock?.id == id) {
      assetOwned.push(asset);
    }
  });
  const getWallet = async () => {
    await dispatch(getAWallet());
  };

  const onLogout = async (e) => {
    await dispatch(logout());
  };

  useEffect(() => {
    dispatch(getAStock(id));
    dispatch(getAllStocks());
    dispatch(getAllAssets());
    dispatch(getAWallet());
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
    setIsShown(3);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <div className="dashboard-title-bar">
          <div className="profile-icon-box-wrapper">
            <HexaMenu />
            {/* <div className="profile-icon-box">
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
                onClick={() => history.push("/home")}
              />
            </div> */}
          </div>
          <h2 className="dashboard-username">{user?.username}</h2>
          <SearchBar />
        </div>
        <div className="dashboard-content-box">
          <div className="dashboard-content-navbar"></div>
          <div className="dashboard-content stock-details-content">
            <div className="stockDetailContainer">
              <div className="company-name-header">
                <h2>Company Name</h2>
                <h3>{stock?.long_name}</h3>
              </div>
              <div className="ticker-header">
                <h2>Ticker</h2>
                <h3>{stock?.ticker}</h3>
              </div>
              <div className="market-price-header">
                <h2>Current Price Per Share</h2>
                <h3>
                  $
                  {stock?.i_price
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h3>
              </div>
              {assetOwned[0]?.num_shares > 0 && (
                <div className="equity-header">
                  <h2>Your Equity</h2>
                  <h3>
                    $
                    {(stock?.i_price * assetOwned[0]?.num_shares)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </h3>
                </div>
              )}
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
                      getWallet();
                    }}
                  >
                    Buy
                  </button>
                  {assetOwned[0]?.num_shares > 0 && (
                    <button
                      onClick={() => {
                        changeTransactionSell();
                        getWallet();
                      }}
                    >
                      Sell
                    </button>
                  )}
                  {assetOwned[0]?.num_shares > 0 && (
                    <button
                      onClick={() => {
                        showCashout();
                        getWallet();
                      }}
                    >
                      Cashout
                    </button>
                  )}
                </div>
                {isCashedOut && <CashoutStockForm prop={prop} />}
                {isShown === 1 && <TransactionForm prop={prop} />}
                {isShown === 2 && assetOwned.length > 0 && (
                  <SellTransactionForm prop={prop} />
                )}
              </div>
            </div>

            <div className="about-box">
              About
              <p>{stock?.info1}</p>
              <div className="stockInfoBox">
                <p>{stock?.info2}</p>
              </div>
              <p>{stock?.info3}</p>
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
