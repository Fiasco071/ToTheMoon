import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
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
import WalletFormModal from "../WalletForm/WalletFormModal";
import WalletFormModalWithdraw from "../WalletWithdraw/WalletModal";
import LPieChart from "../Dashboard/LPieChart";
import AssetChart from "../Dashboard/PieChart";
import BiggestChange from "../Dashboard/BiggestChange";
import StockWatchlist from "../StockWatchlist";
import { getAWatchlist } from "../../store/watchlist";
import WatchlistView from "../WatchlistView/index.js";
import NewsWheel from "../Dashboard/NewsWheel";
import iconImage from "../../img/icon.png";

const StockDetail = () => {
  let dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const stocks = useSelector((state) => state.stocks);
  const stock = useSelector((state) => state.stocks[id]);
  const user = useSelector((state) => state.session.user);
  const assets = useSelector((state) => state.assets);
  const wallet = useSelector((state) => state.wallet);
  const simData = useSelector(state => state.simData)
  const dataArr = simData.sim_data;
  const stock_price = Object.values(stocks).filter(stock => stock.id == id)[0]?.i_price
  const [price, setPrice] = useState();


  const [isShown, setIsShown] = useState(1);
  const [isCashedOut, setIsCashedOut] = useState(false);
  const [newTransaction, setNewTransaction] = useState(false);
  const [flag, setFlag] = useState("stock list");

  const ref = useRef(null);

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

  const dataset = [];
  if (dataArr) {
    Object.values(dataArr)[id-1].forEach((pieceOfData, i) => {
     let cur_price = pieceOfData  
      if (cur_price < 0) cur_price = 0
      const plotObj = {
        name: i+1,
        uv: cur_price
      }
      dataset.push(plotObj)
    })
    dataset[0].uv = stock_price
  }

  let i = 252;

  useEffect(() => {
    setPrice(dataset.slice(0,i)[dataset.slice(0,i).length - 1].uv.toFixed(2).toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    const loop = setInterval(() => {
      i+=1;
      setPrice(dataset.slice(0,i)[dataset.slice(0,i).length - 1].uv.toFixed(2).toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    },3000)
    return () => clearInterval(loop);
  }, [id])

  useEffect(() => {
    dispatch(getAStock(id));
    dispatch(getAllStocks());
    dispatch(getAllAssets());
    dispatch(getAWallet());
    dispatch(getAWatchlist());
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

  const handleClickS = () => {
    setFlag("stock list");
    ref.current.classList.add("selected");
  };

  const handleClickW = () => {
    setFlag("watch list");
    ref.current.classList.add("selected");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <div className="dashboard-title-bar">
          <div className="profile-icon-box-wrapper">
            <HexaMenu />
          </div>
          <h2 className="dashboard-username">{user?.username}</h2>
          <SearchBar />
          <img className="nav-iconImage" src={iconImage} />
          <p className="nav-iconImage-text">To The Moon</p>
        </div>
        <div className="dashboard-content-box stock-content">
          <div className="dashboard-content-navbar">
            <h2>News</h2>
            <NewsWheel />
          </div>
          <div className="dashboard-content stock-details-content">
            <div className="stock-details-box1">
              <div className="wallet-box stock-wallet">
                <WalletFormModalWithdraw />
                <h2 className="wallet-title">Wallet</h2>
                <WalletFormModal />
                <div>
                  <p className="wallet-title">$</p>
                  <p className="wallet-title">
                    {wallet[1]?.amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              </div>
              <div className="asset-box stock-percentage">
                <h2>Assets</h2>
                <AssetChart className="asset-chart" />
                <div className="asset-box-large">
                  <div>
                    <LPieChart className="large-asset-chart" />
                    <p>Asset Break-Down</p>
                    <div className="asset-detail-info-box">
                      {Object.values(assets).map((asset) => (
                        <div
                          className="asset-detail-info-box-child"
                          key={asset.id}
                        >
                          <p>{asset.stock.ticker}</p>
                          <p>{asset.num_shares} shares </p>
                          <p>
                            Calculated at current price $
                            {(asset.num_shares * asset.stock.i_price)
                              .toFixed(2)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </p>
                        </div>
                      ))}
                      <div className="asset-percentage-box">
                        <p className="percentage-box-title">% Break-Down</p>
                        {Object.values(assets).map((asset) => (
                          <div key={asset.id}>
                            <p>
                              {asset.stock.ticker} -{" "}
                              {(
                                ((asset.num_shares * asset.stock.i_price) /
                                  Object.values(assets)
                                    ?.map(
                                      (asset) =>
                                        asset.num_shares * asset.stock.i_price
                                    )
                                    ?.reduce((acc, next) => acc + next)) *
                                100
                              ).toFixed(1)}
                              %
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="asset-box stock-asset">
                <h2>Recent Changes</h2>
                <BiggestChange />
              </div>
            </div>
            <div className="stockDetailContainer">
              <div className="company-name-header">
                <h3>Company Name</h3>
                <h2>{stock?.long_name}</h2>
              </div>
              <div className="ticker-header">
                <h3>Ticker</h3>
                <h2>{stock?.ticker}</h2>
              </div>
              <div className="market-price-header">
                <h3>Current Price Per Share</h3>
                <h2>
                  $
                  {price}
                </h2>
              </div>
              {assetOwned[0]?.num_shares > 0 && (
                <div className="equity-header">
                  <h3>Your Equity</h3>
                  <h2>
                    $
                    {(stock?.i_price * assetOwned[0]?.num_shares)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </h2>
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
            <div className="p-container">
              <button
                onClick={handleClickS}
                ref={ref}
                className={flag === "stock list" ? "selected" : null}
              >
                Stock List
              </button>
              <button
                onClick={handleClickW}
                ref={ref}
                className={flag === "watch list" ? "selected" : null}
              >
                Watch List
              </button>
            </div>
            {flag === "stock list" && <WatchList stocks={stocks} />}
            {flag === "watch list" && <WatchlistView />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
