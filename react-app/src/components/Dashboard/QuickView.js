import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import QuickViewGraph from "./QuickViewGraph";
import "./qv.css";
import Slider from "../Slider";

const QuickView = () => {
  const assets = useSelector((state) => state.assets);
  const history = useHistory();
  return (
    <div className="port-quickview-wrapper">
      {Object.values(assets).map((asset) => (
        <div
          key={asset.id}
          className="port-quickview-box"
          onClick={() => history.push(`/stocks/${asset.stock.id}`)}
        >
          <h2>{asset.stock.ticker}</h2>
          <div className="qv-text-boxes">
            <p>Price</p>
            <p className="qv-value">
              $
              {asset.stock.i_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
          <div className="qv-text-boxes">
            <p>Shares</p>
            <p className="qv-value two">{asset.num_shares}</p>
          </div>

          <div className="port-quickview-large-box">
            <h2>
              {asset.stock.ticker} $
              {(asset.stock.i_price * asset.num_shares)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h2>

            <QuickViewGraph className="qvl-chart" id={asset.stock.id}/>

            <div className="port-qv-info-box">
              <div className="qv-text-lboxes">
                <p>Price</p>
                <p className="qvl-value">
                  $
                  {asset.stock.i_price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
              <div className="qv-text-lboxes">
                <p>Shares</p>
                <p className="qvl-value two">{asset.num_shares}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* <Slider /> */}
    </div>
  );
};

export default QuickView;
