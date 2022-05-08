import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllTransactions } from "../../store/transaction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faDoorOpen, faHome } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useHistory } from "react-router-dom";

import WatchList from "../WatchList";
import SearchBar from "../SearchBar";
// import QuickView from '../Dashboard/QuickView';
import HexaMenu from "../Dashboard/HexaMenu";
import WalletFormModal from "../WalletForm/WalletFormModal";
import WalletFormModalWithdraw from "../WalletWithdraw/WalletModal";
import LPieChart from "../Dashboard/LPieChart";
import AssetChart from "../Dashboard/PieChart";
import BiggestChange from "../Dashboard/BiggestChange";
import NewsWheel from "../Dashboard/NewsWheel";

import { logout } from "../../store/session";
import { getAllStocks } from "../../store/stock";
import { getAWallet } from "../../store/wallet";
import { getAllAssets } from "../../store/asset";

const UserTransactionHistory = () => {
  const dispatch = useDispatch();

  const wallet = useSelector((state) => state.wallet);
  const assets = useSelector((state) => state.assets);

  const transactionsObj = useSelector((state) => state.transactions);
  const transactions = Object.values(transactionsObj);

  const stocksObj = useSelector((state) => state.stocks);
  const stocks = Object.values(stocksObj);

  const user = useSelector((state) => state.session.user);

  const history = useHistory();

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(getAllTransactions());
    dispatch(getAWallet());
    dispatch(getAllStocks());
    dispatch(getAllAssets());
  }, [dispatch]);

  const onLogout = async (e) => {
    await dispatch(logout());
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
                    {wallet[1]?.amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
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
                <h2>Recent Changes</h2>
                <BiggestChange />
              </div>
            </div>
            <div className="my-transactions-wrapper">
              <div className="my-transaction-header">
                <h2>Recent Transactions:</h2>
                <button
                  className="my-transaction-details-btn"
                  onClick={() => setToggle(!toggle)}
                >
                  {toggle ? "Less Details" : "More Details"}
                </button>
              </div>
              <div className="my-transaction-info">
                {transactions.reverse().map((transaction) => (
                  <div className="my-transaction-items" key={transaction?.id}>
                    <div id="my-transaction-top-items">
                      <NavLink
                        to={`/stocks/${
                          stocksObj[transaction?.asset?.stock_id]?.id
                        }`}
                        className="my-transaction-items-1"
                      >
                        Company:{" "}
                        {stocksObj[transaction?.asset?.stock_id]?.long_name}
                      </NavLink>
                      <div className="my-transaction-toggle">
                        <div
                          className="my-transaction-items-2"
                          id={
                            (
                              transaction?.price_at_transaction *
                              transaction?.num_shares
                            ).toFixed(2) > 0
                              ? "red"
                              : "green"
                          }
                        >
                          {(
                            transaction?.price_at_transaction *
                            transaction?.num_shares
                          ).toFixed(2) > 0
                            ? `-  $${(
                                transaction?.price_at_transaction *
                                transaction?.num_shares
                              )
                                .toFixed(2)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                            : `+  $${Math.abs(
                                (
                                  transaction?.price_at_transaction *
                                  transaction?.num_shares
                                )
                                  .toFixed(2)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              )}`}
                        </div>
                      </div>
                    </div>
                    {toggle ? (
                      <div>
                        <div id="my-transaction-bottom-items">
                          <div>
                            <div className="my-transaction-items-3">
                              Current Price Per Share: $
                              {transaction?.price_at_transaction
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                            <div
                              className="my-transaction-items-4"
                              id={transaction?.num_shares > 0 ? "red" : "green"}
                            >
                              {transaction?.num_shares > 0
                                ? "Shares Purchased: "
                                : "Shares Sold: "}
                              {Math.abs(transaction?.num_shares).toFixed(2)}
                            </div>
                            <div className="my-transaction-items-5">
                              Total Shares Owned:{" "}
                              {transaction?.asset?.num_shares}
                            </div>
                          </div>
                          <div>
                            <div className="my-transaction-items-6">
                              User: {transaction?.user?.username}
                            </div>
                            <div className="my-transaction-items-7">
                              {transaction?.created_at.split(" ")[0]}{" "}
                              {transaction?.created_at.split(" ")[2]}{" "}
                              {transaction?.created_at.split(" ")[1]},{" "}
                              {transaction?.created_at.split(" ")[3]} at{" "}
                              {Number(
                                transaction?.created_at
                                  .split(" ")[4]
                                  .split(":")[0]
                              ) <= 12
                                ? transaction?.created_at
                                    .split(" ")[4]
                                    .split(":")[0]
                                : Number(
                                    transaction?.created_at
                                      .split(" ")[4]
                                      .split(":")[0]
                                  ) - 12}
                              :
                              {
                                transaction?.created_at
                                  .split(" ")[4]
                                  .split(":")[1]
                              }
                            </div>
                          </div>
                        </div>
                        <div className="blank"></div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            {/* 
                        <div>
                            <QuickView />
                        </div> */}
          </div>
          <div className="dashboard-watchlist-box">
            <WatchList stocks={stocksObj} />
          </div>
        </div>
      </div>
    </div>

    // <div>
    //     <h2>Recent Transactions:</h2>
    //     {transactions.map((transaction) => (
    //         <div key={transaction.id}>
    //             <div>Price: {transaction?.price_at_transaction}</div>
    //             <div>Shares: {transaction?.num_shares}</div>
    //             <div>User: {transaction?.user?.username}</div>
    //             <div>Stock Name: {stocksObj[transaction?.asset?.stock_id]?.long_name}</div>
    //             {/* {stocks.filter((stock) => (
    //                 <div key={stock.id}>
    //                     <div></div>
    //                 </div>
    //             ))} */}
    //         </div>
    //     ))}
    // </div>
  );
};

export default UserTransactionHistory;
