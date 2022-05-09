import './hexamenu.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faDoorOpen, faHome, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import { removeWalletonLogout } from '../../store/wallet';

const HexaMenu = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    

    const onLogout = async (e) => {
        await dispatch(logout());
        await dispatch(removeWalletonLogout())
      };

    return (
        <>
            <div className="profile-icon-box">
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
            </div>
            <div className="profile-icon-box-transactionpage" onClick={() => history.push('/my-transactions')}>
                <FontAwesomeIcon
                    icon={faReceipt}
                    className="profile-icon"
                />
            </div>
        </>
    );
}

export default HexaMenu