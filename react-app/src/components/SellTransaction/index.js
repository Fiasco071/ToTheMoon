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

  let assetOwned = [];
  Object.values(assets).forEach((asset) => {
    if (asset.stock?.id == id) {
      assetOwned.push(asset);
    }
  });

  const [isOwned, setIsOwned] = useState(true);
  const [num_shares, setNumShares] = useState("");
  const [price_at_transaction, setPriceAtTransaction] = useState(
    stock?.i_price
  );
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
      price_at_transaction,
    };
    if (validationErrors.length === 0) {
      let newTransaction;
      newTransaction = await dispatch(sellTransaction(transaction, id));
      setNumShares("");
      setPriceAtTransaction(stock?.i_price);
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
          <h4 className="form-text">
            Total Shares Owned {assetOwned[0]?.num_shares}
          </h4>
          <h4 className="form-text">Market Price ${stock?.i_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
          <h4 className="form-text">
            Total Price ${(stock?.i_price * num_shares).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
