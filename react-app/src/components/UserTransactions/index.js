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
import { logout } from '../../store/session';
import { getAllStocks } from '../../store/stock';
import HexaMenu from '../Dashboard/HexaMenu';


const UserTransactionHistory = () => {
    const dispatch = useDispatch()
    const transactionsObj = useSelector((state) => state.transactions)
    const transactions = Object.values(transactionsObj)

    const stocksObj = useSelector((state) => state.stocks)
    const stocks = Object.values(stocksObj)

    const user = useSelector((state) => state.session.user);

    const history = useHistory();
    console.log(transactions)
    console.log(stocksObj)

    useEffect(() => {
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

    useEffect(() => {
        dispatch(getAllTransactions())
    }, [dispatch])


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
                        <div className='my-transactions-wrapper'>
                            <h2>Recent Transactions:</h2>
                            <div className='my-transaction-info'>
                                {transactions.map((transaction) => (
                                    <div className='my-transaction-items' key={transaction.id}>
                                        <div id='my-transaction-top-items'>
                                            <div className='my-transaction-items-1'>Company: {stocksObj[transaction?.asset?.stock_id]?.long_name}</div>
                                            <div className='my-transaction-items-2' id={(transaction?.price_at_transaction * transaction?.num_shares).toFixed(2) > 0 ? 'green' : 'red'}>
                                                Transaction: ${(transaction?.price_at_transaction * transaction?.num_shares).toFixed(2)}
                                            </div>
                                            <div>( + )</div>
                                        </div>
                                        <div id='my-transaction-bottom-items'>
                                            <div className='my-transaction-items-3'>Current Price Per Share: ${transaction?.price_at_transaction}</div>
                                            <div className='my-transaction-items-4' id={transaction?.num_shares > 0 ? 'green' : 'red'}>
                                            {transaction?.num_shares > 0 ? 'Shares Purchased: ' : 'Shares Sold: '}
                                                {transaction?.num_shares}
                                                </div>
                                            <div className='my-transaction-items-5'>User: {transaction?.user?.username}</div>
                                        </div>
                                        <div className='blank'></div>
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
