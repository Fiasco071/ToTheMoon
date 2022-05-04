import { useSelector } from "react-redux";
import "./qv.css"

const QuickView = () => {
    const assets = useSelector(state => state.assets)
    
    return (
        <div className="port-quickview-wrapper">
            {Object.values(assets).map(asset => (
                <div className="port-quickview-box">
                    <h2>{asset.stock.ticker}</h2>
                    <div>
                    <p>Price</p>
                    <p className="qv-value">${asset.stock.i_price}</p>
                    </div>
                    <div>
                    <p>Shares</p>
                    <p className="qv-value two">{asset.num_shares}</p>
                    </div>
                </div>   
            ))}
        </div>
    );
}

export default QuickView