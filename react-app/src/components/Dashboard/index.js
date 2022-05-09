import "./index.css";
// import LogoutButton from '../auth/LogoutButton';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faDoorOpen, faHome, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAWallet } from "../../store/wallet";
//, addAWallet removed from "../../store/wallet" import to remove console warnings
import { logout } from "../../store/session";
import { getAllStocks } from "../../store/stock";
import AssetChart from "./PieChart";
import LPieChart from "./LPieChart";
import WalletFormModal from "../WalletForm/WalletFormModal";
import MainGraph from "./MainGraph";
import WatchList from "../WatchList";
import { getAllAssets } from "../../store/asset";
import { getAllSimData } from "../../store/simulation_data";
import QuickView from "./QuickView";
import { useHistory } from "react-router-dom";
import SearchBar from "../SearchBar";
import BiggestChange from "./BiggestChange";
import UserTransactionHistory from "../UserTransactions";
import { getAllTransactions } from "../../store/transaction";
import HexaMenu from "./HexaMenu.js";
import WalletFormModalWithdraw from "../WalletWithdraw/WalletModal";
import iconImage from "../../img/icon.png";
import NewsWheel from "./NewsWheel";
import WatchlistView from "../WatchlistView";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef(null);
  const [flag, setFlag] = useState("stock list");
  
  const user = useSelector((state) => state.session.user);
  const wallet = useSelector((state) => state.wallet);
  const stocks = useSelector((state) => state.stocks);
  const assets = useSelector((state) => state.assets);

  useEffect(() => {
    dispatch(getAWallet());
    dispatch(getAllStocks());
    dispatch(getAllAssets());
    dispatch(getAllTransactions());
  }, [dispatch]);


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
        <div className="dashboard-content-box">
          <div className="dashboard-content-navbar">
            <h2>News</h2>
            <NewsWheel />
          </div>
          <div className="dashboard-content">
            <div className="dashboard-content-box1">
              <div className="wallet-box">
                <WalletFormModalWithdraw />
                <h2 className="wallet-title">Wallet</h2>
                <WalletFormModal />
                <div>
                  <p className="wallet-title">$</p>
                  <p className="wallet-title">
                    {Object.values(wallet)[0]?.amount}
                  </p>
                </div>
                {/* <div className='add-button'><FontAwesomeIcon icon={faArrowUp} className='add-icon' /></div> */}
              </div>
              <div className="asset-box">
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
              <div className="asset-box">
                <h2>Recent Changes</h2>
                <BiggestChange />
              </div>
            </div>
            <div className="dashboard-content-box2">
              <div>
                <MainGraph />
              </div>
            </div>
            <div className="dashboard-content-box3">
              <div className="quickview-container">
                <QuickView />
              </div>
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

export default Dashboard;
