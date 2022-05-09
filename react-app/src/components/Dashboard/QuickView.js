import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import QuickViewGraph from "./QuickViewGraph";
import "./qv.css";


const QuickView = () => {
  const assets = useSelector((state) => state.assets);
  const history = useHistory();
  // const simData = useSelector(state => state.simData)
  // const dataArr = simData.sim_data;
  // const [price, setPrice] = useState();

  // const dataset = [];
  // if (dataArr) {
  //   Object.values(dataArr)[id-1].forEach((pieceOfData, i) => {
  //    let cur_price = pieceOfData  
  //     if (cur_price < 0) cur_price = 0
  //     const plotObj = {
  //       name: i+1,
  //       uv: cur_price
  //     }
  //     dataset.push(plotObj)
  //   })
  //   dataset[0].uv = stock_price
  // }
  
  // let i = 252

  // useEffect(() => {
  //   setInterval(() => {
  //     i+=1;
  //     setPrice(dataset.slice(0,i)[dataset.slice(0,i).length - 1].uv)
  //   },3000)
  // })

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
              {asset.stock.ticker}
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
