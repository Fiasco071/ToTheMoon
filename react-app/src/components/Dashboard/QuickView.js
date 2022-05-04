import { useSelector } from "react-redux";
import QuickViewGraph from "./QuickViewGraph";
import "./qv.css"

const QuickView = () => {
    const assets = useSelector(state => state.assets)

    return (
        <div className="port-quickview-wrapper">
            {Object.values(assets).map(asset => (
                <div className="port-quickview-box">
                    <h2>{asset.stock.ticker}</h2>
                    <div className="qv-text-boxes">
                        <p>Price</p>
                        <p className="qv-value">${asset.stock.i_price}</p>
                    </div>
                    <div className="qv-text-boxes">
                        <p>Shares</p>
                        <p className="qv-value two">{asset.num_shares}</p>
                    </div>

                    <div className="port-quickview-large-box">
                        <h2>{asset.stock.ticker} ${asset.stock.i_price * asset.num_shares}</h2>
                 
                            <QuickViewGraph className='qvl-chart' />
                        
                        <div className="port-qv-info-box">
                            <div className="qv-text-lboxes">
                                <p>Price</p>
                                <p className="qvl-value">${asset.stock.i_price}</p>
                            </div>
                            <div className="qv-text-lboxes">
                                <p>Shares</p>
                                <p className="qvl-value two">{asset.num_shares}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default QuickView