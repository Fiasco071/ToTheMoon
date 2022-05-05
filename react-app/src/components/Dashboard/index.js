import "./index.css";
// import LogoutButton from '../auth/LogoutButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faDoorOpen, faHome, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
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


const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const wallet = useSelector((state) => state.wallet);
  const stocks = useSelector((state) => state.stocks);

  const onLogout = async (e) => {
    await dispatch(logout());
  };

  useEffect(() => {
    dispatch(getAWallet());
    dispatch(getAllStocks());
    dispatch(getAllAssets());
    dispatch(getAllSimData());
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
            <div className="profile-icon-box">
              <FontAwesomeIcon icon={faUser} className="profile-icon" />
            </div>

            {/* {menu_icons.map((arr)=> (
              <div className={`profile-icon-box-${arr[1]}`} onClick={arr[2]}>
              <FontAwesomeIcon
                icon={arr[0]}
                className="profile-icon"
              />
            </div>
            ))} */}
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
            </div>

            <div className="profile-icon-box-transactionpage" onClick={() => history.push('/my-transactions')}>
              <FontAwesomeIcon
                icon={faMoneyBill}
                className="profile-icon"
              />
            </div>


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
                {/* <div className='add-button'><FontAwesomeIcon icon={faArrowUp} className='add-icon' /></div> */}
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
              <div className="recent-box">
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
