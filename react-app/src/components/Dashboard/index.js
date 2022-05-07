import "./index.css";
// import LogoutButton from '../auth/LogoutButton';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faDoorOpen, faHome, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
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

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const wallet = useSelector((state) => state.wallet);
  const stocks = useSelector((state) => state.stocks);
  const assets = useSelector((state) => state.assets);

  useEffect(() => {
    dispatch(getAWallet());
    dispatch(getAllStocks());
    dispatch(getAllAssets());
    dispatch(getAllSimData());
    dispatch(getAllTransactions());
  }, [dispatch]);

  // const menu_icons =[
  //   [faUser, "menu", "onLogout" ],
  //   [faDoorOpen, "home", "history.push('/home')"]
  //   [faMoneyBill, "transactionpage", "history.push('/my-transactions')"]
  // ]

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <div className="dashboard-title-bar">
          <div className="profile-icon-box-wrapper">
            <HexaMenu />
          </div>

          <h2 className="dashboard-username">{user?.username}</h2>
          <SearchBar />
        </div>
        <div className="dashboard-content-box">
          <div className="dashboard-content-navbar"></div>
          <div className="dashboard-content">
            <div className="dashboard-content-box1">
              <div className="wallet-box">
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
                        <div className="asset-detail-info-box-child">
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
                          <div>
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
                <h2>Recent Change</h2>
                <BiggestChange />
              </div>
            </div>
            <div className="dashboard-content-box2">
              <div>
                <MainGraph />
              </div>
            </div>
            <div className="dashboard-content-box3">
              <div>
                <QuickView />
              </div>
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

export default Dashboard;
