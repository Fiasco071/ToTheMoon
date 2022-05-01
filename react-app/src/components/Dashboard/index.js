import './index.css'
import LogoutButton from '../auth/LogoutButton';

const Dashboard = () => {
    return (
        <div className='dashboard-wrapper'>
            <LogoutButton />
            <div className='dashboard'>
                <div className='content-box-wrapper'>
                    
                </div>
                <div className='watchlist-wrapper'>

                </div>
            </div>
        </div>
    );
}

export default Dashboard