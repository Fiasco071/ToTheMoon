import './index.css'
import LogoutButton from '../auth/LogoutButton';

const Dashboard = () => {
    return (

        <div className='dashboard-wrapper'>
            
            <div className='dashboard'>
                <div className='dashboard-title-bar'>
                    <LogoutButton />
                </div>
                <div className='dashboard-content-box'>
                    <div className='dashboard-content-navbar'>

                    </div>
                    <div className='dashboard-content'>
                        <div className='dashboard-content-box1'>
                            <div>Wallet</div>
                            <div>Asset</div>
                            <div>Recent Transaction</div>
                        </div>
                        <div className='dashboard-content-box2'>
                            <div>Graph</div>
                        </div>
                        <div className='dashboard-content-box3'>
                            <div>Portfolio</div>
                        </div>
                    </div>
                    <div className='dashboard-watchlist-box'>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard