import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllTransactions } from '../../store/transaction';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faDoorOpen, faHome } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

import WatchList from '../WatchList';
import SearchBar from '../SearchBar';
import QuickView from '../Dashboard/QuickView';
import HexaMenu from '../Dashboard/HexaMenu';
import WalletFormModal from '../WalletForm/WalletFormModal';
import LPieChart from '../Dashboard/LPieChart';
import AssetChart from '../Dashboard/PieChart';
import BiggestChange from '../Dashboard/BiggestChange';

import { logout } from '../../store/session';
import { getAllStocks } from '../../store/stock';
import { getAWallet } from '../../store/wallet';


const UserTransactionHistory = () => {
    const dispatch = useDispatch()

    const wallet = useSelector((state) => state.wallet);

    const transactionsObj = useSelector((state) => state.transactions)
    const transactions = Object.values(transactionsObj)

    const stocksObj = useSelector((state) => state.stocks)
    const stocks = Object.values(stocksObj)

    const user = useSelector((state) => state.session.user);

    const history = useHistory();
    // console.log(transactions)
    // console.log(stocksObj)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        dispatch(getAllTransactions());
        dispatch(getAWallet());
        dispatch(getAllStocks());
    }, [dispatch]);

    // const matchingStock = (stocks) => {
    //     let result = stocks?.filter(stock => {
    //         // return stock.id === transaction.asset.stock_id
    //     })
    //     return result?.ticker
    // }
    const onLogout = async (e) => {
        await dispatch(logout());
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
                        <div className="profile-icon-box-menu" onClick={onLogout}>
                            <FontAwesomeIcon
                                icon={faDoorOpen}
                                className="profile-icon"
                            />
                        </div>
                        <div className="profile-icon-box-home" onClick={() => history.push('/home')}>
                            <FontAwesomeIcon
                                icon={faHome}
                                className="profile-icon"
                            />
                        </div> */}
                    </div>
                    <h2 className="dashboard-username">{user?.username}</h2>
                    <SearchBar />
                </div>
                <div className="dashboard-content-box">
                    <div className="dashboard-content-navbar"></div>
                    <div className="dashboard-content">
                        <div className="dashboard-content-box1">
                            <div className="wallet-box">
                                <h2>Wallet</h2>
                                <WalletFormModal />
                                <div>
                                    <p>$</p>
                                    <p>{wallet[1]?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                </div>
                            </div>
                            <div className="asset-box">
                                <h2>Assets</h2>
                                <AssetChart className="asset-chart" />
                                <div className="asset-box-large">
                                    <div>
                                        <LPieChart className="large-asset-chart" />
                                    </div>
                                </div>
                            </div>
                            <div className="asset-box">
                                <h2>Recent Changes</h2>
                                <BiggestChange />
                            </div>
                        </div>
                        <div className='my-transactions-wrapper'>
                            <h2>Recent Transactions:</h2>
                            <div className='my-transaction-info'>
                                {transactions.map((transaction) => (
                                    <div className='my-transaction-items' key={transaction.id}>
                                        <div id='my-transaction-top-items'>
                                            <div className='my-transaction-items-1'>Company: {stocksObj[transaction?.asset?.stock_id]?.long_name}</div>
                                            <div className='my-transaction-toggle'>
                                                <div className='my-transaction-items-2' id={(transaction?.price_at_transaction * transaction?.num_shares).toFixed(2) > 0 ? 'red' : 'green'}>
                                                    {(transaction?.price_at_transaction * transaction?.num_shares).toFixed(2) > 0
                                                        ? `-  $${(transaction?.price_at_transaction * transaction?.num_shares).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                                                        : `+  $${Math.abs((transaction?.price_at_transaction * transaction?.num_shares).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}`}
                                                </div>
                                                <div id={'plus-' + transaction?.id} onClick={() => setToggle(!toggle)}>( + )</div>
                                            </div>
                                        </div>
                                        {toggle ? (
                                            <div>
                                                <div id='my-transaction-bottom-items'>
                                                    <div>
                                                        <div className='my-transaction-items-3'>Current Price Per Share: ${transaction?.price_at_transaction.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                                        <div className='my-transaction-items-4' id={transaction?.num_shares > 0 ? 'red' : 'green'}>
                                                            {transaction?.num_shares > 0 ? 'Shares Purchased: ' : 'Shares Sold: '}
                                                            {Math.abs(transaction?.num_shares)}
                                                        </div>
                                                        <div className='my-transaction-items-5'>Total Shares Owned: ****</div>
                                                    </div>
                                                    <div>
                                                        <div className='my-transaction-items-6'>User:  {transaction?.user?.username}</div>
                                                        <div className='my-transaction-items-7'>Date & Time: ****</div>
                                                    </div>
                                                </div>
                                                <div className='blank'></div>
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <QuickView />
                        </div>
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
    )
}

export default UserTransactionHistory;
