import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { sellTransaction } from "../../store/transaction";
import { getAStock } from "../../store/stock";
import { getAllAssets } from "../../store/asset";

const SellTransactionForm = ({ prop }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  let stock = useSelector((state) => state.stocks[id]);
  let user = useSelector((state) => state.session.user);
  const assets = useSelector((state) => state.assets);
  const simData = useSelector(state => state.simData)

  const dataArr = simData.sim_data;
  const stock_price = useSelector(state => Object.values(state.stocks).filter(stock => stock.id == id)[0]?.i_price)
  const [price, setPrice] = useState();

  const dataset = [];
  if (dataArr) {
    Object.values(dataArr)[id-1].forEach((pieceOfData, i) => {
     let cur_price = pieceOfData  
      if (cur_price < 0) cur_price = 0
      const plotObj = {
        name: i+1,
        uv: cur_price
      }
      dataset.push(plotObj)
    })
    dataset[0].uv = stock_price
  }

  let i = 252;

  useEffect(() => {
    setPrice(dataset.slice(0,i)[dataset.slice(0,i).length - 1].uv.toFixed(2))
    const loop = setInterval(() => {
      i+=1;
      setPrice(dataset.slice(0,i)[dataset.slice(0,i).length - 1].uv.toFixed(2))
    },3000)
    return () => clearInterval(loop);
  }, [])


  let assetOwned = [];
  Object.values(assets).forEach((asset) => {
    if (asset.stock?.id == id) {
      assetOwned.push(asset);
    }
  });

  const [isOwned, setIsOwned] = useState(true);
  const [num_shares, setNumShares] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    dispatch(getAStock(id));
  }, [dispatch]);

  useEffect(() => {
    const errors = [];

    if (num_shares <= 0) {
      errors.push("You must sell at least 1 share");
    }

    if (assetOwned[0]?.num_shares < num_shares) {
      errors.push("You cannot sell more shares than you own");
    }
    setValidationErrors(errors);
  }, [num_shares, totalPrice, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setShowErrors(true);
    prop.setNewTransaction(!prop.newTransaction);

    const transaction = {
      num_shares,
      price_at_transaction: price,
    };
    if (validationErrors.length === 0) {
      let newTransaction;
      newTransaction = await dispatch(sellTransaction(transaction, id));
      setNumShares("");
      setTotalPrice(0);
      setHasSubmitted(false);
      setValidationErrors([]);
      dispatch(getAllAssets());
      if (newTransaction) {
        history.push(`/home`);
      }
    }
  };

  return (
    <div className="transaction-form-container">
      <div>
        {showErrors && (
          <ul className="errors">
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-inner">
          <input
            className="transaction-form-input"
            type="number"
            step=".01"
            placeholder="Shares"
            value={num_shares}
            onChange={(e) => setNumShares(e.target.value)}
          ></input>
          {!assetOwned[0]?.num_shares && (
            <h4 className="form-text">Total Shares Owned 0</h4>
          )}
          {assetOwned[0]?.num_shares > 0 && (
            <h4 className="form-text">
              Total Shares Owned {assetOwned[0]?.num_shares}
            </h4>
          )}
          <h4 className="form-text">Market Price ${price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
          <h4 className="form-text">
            Total Price ${(price * num_shares).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h4>
        </div>
        <button className="order-btn" type="submit">
          Sell Your Order
        </button>
      </form>
    </div>
  );
};
export default SellTransactionForm;
