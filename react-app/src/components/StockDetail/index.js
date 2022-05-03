import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAStock } from "../../store/stock";
import { useParams } from "react-router-dom";
import StockGraph from "./stockGraph";
import TransactionForm from "../Transaction";
import "./index.css";
import { getAllAssets } from "../../store/asset";

const StockDetail = () => {
  let dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  let stock = useSelector((state) => state.stocks[id]);
  let user = useSelector((state) => state.session.user);
  console.log(user);

  useEffect(() => {
    dispatch(getAStock(id));
  }, [dispatch]);

  return (
    <div className="stockDetailContainer">
      <h2>{stock?.long_name}</h2>
      <h2>{stock?.ticker}</h2>
      <p>${stock?.i_price}</p>
      <StockGraph />
      <div>
        <TransactionForm />
      </div>
      <div>
        <div className="stockEquity">
          Your Equity
          <div>$12,496.87</div>
        </div>
        <div className="stockInfo">
          About
          <p>{stock?.info1} Bussin Bussin Corp</p>
          <p>
            {stock?.info2} Bussin Bussin, Co. engages in the design,
            manufacture, and sale of smartphones, personal computers, tablets,
            wearables and accessories, and other varieties of related services.
            It operates through the following geographical segments: Americas,
            Europe, Greater China, Japan, and Rest of Asia Pacific. View more
          </p>
          <p>
            {stock?.info3}CEO Timothy Donald Cook Employees 154,000 Headquarters
            Cupertino, California Founded 1976
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
