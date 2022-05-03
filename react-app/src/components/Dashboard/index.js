import './index.css'
import LogoutButton from '../auth/LogoutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAWallet, addAWallet } from '../../store/wallet';
import { getAllStocks } from "../../store/stock";
import AssetChart from './PieChart'
import WalletFormModal from '../WalletForm/WalletFormModal';
import MainGraph from './MainGraph';
import WatchList from '../WatchList';

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const wallet = useSelector(state => state.wallet);
    const stocks = useSelector(state => state.stocks)

    useEffect(() => {
        dispatch(getAWallet())
        dispatch(getAllStocks())
    }, [dispatch]);

    return (

        <div className='dashboard-wrapper'>

            <div className='dashboard'>
                <div className='dashboard-title-bar'>
                    <div className='profile-icon-box-wrapper'>
                        <div className='profile-icon-box'>
                            <FontAwesomeIcon icon={faUser} className='profile-icon' />
                        </div>
                    </div>
                    <h2 className='dashboard-username'>{user?.username}</h2>
                </div>
                <div className='dashboard-content-box'>
                    <div className='dashboard-content-navbar'>

                    </div>
                    <div className='dashboard-content'>
                        <div className='dashboard-content-box1'>
                            <div className='wallet-box'>
                                <h2>Wallet</h2>
                                    <WalletFormModal />
                                <div>
                                    <p>$</p><p>{wallet[1]?.amount}</p>
                                </div>
                                {/* <div className='add-button'><FontAwesomeIcon icon={faArrowUp} className='add-icon' /></div> */}

                            </div>
                            <div className='asset-box'>
                                <h2>Assets</h2>
                                <AssetChart className='asset-chart'/>
                            </div>
                            <div className='recent-box'><h2>Recent</h2>
                            {/* <WalletForm /> */}
                            </div>
                        </div>
                        <div className='dashboard-content-box2'>
                            <div>
                                <MainGraph />
                            </div>
                        </div>
                        <div className='dashboard-content-box3'>
                            <div></div>
                        </div>
                    </div>
                    <div className='dashboard-watchlist-box'>
                         <WatchList stocks={stocks} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard
