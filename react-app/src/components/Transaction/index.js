import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addATransaction } from "../../store/transaction";
import { getAStock } from "../../store/stock";

const TransactionForm = ({ prop }) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  let stock = useSelector((state) => state.stocks[id]);
  let user = useSelector((state) => state.session.user);
  const assets = useSelector((state) => state.assets);

  const [isOwned, setIsOwned] = useState(true);
  const [num_shares, setNumShares] = useState(0);
  const [price_at_transaction, setPriceAtTransaction] = useState(
    stock?.i_price
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  let assetOwned = [];
  Object.values(assets).forEach((asset) => {
    if (asset.stock?.id == id) {
      assetOwned.push(asset);
    }
  });

  useEffect(() => {
    dispatch(getAStock(id));
  }, [dispatch]);

  useEffect(() => {
    const errors = [];
    if (user?.wallet?.amount < num_shares * price_at_transaction) {
      errors.push("Insufficient funds");
    }
    if (num_shares <= 0) {
      errors.push("Must buy at least 1 share");
    }
    setValidationErrors(errors);
  }, [num_shares, totalPrice, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    prop.setNewTransaction(!prop.newTransaction);

    const transaction = {
      num_shares,
      price_at_transaction,
    };

    let newTransaction;

    newTransaction = await dispatch(addATransaction(transaction, id));
    setNumShares(0);
    setPriceAtTransaction(stock?.i_price);
    setTotalPrice(0);
    setHasSubmitted(false);
    setValidationErrors([]);
  };

  return (
    <div className="transaction-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-inner">
          <input
            className="transaction-form-input"
            type="number"
            step=".01"
            min="0"
            placeholder="Number of Shares"
            value={num_shares}
            onChange={(e) => setNumShares(e.target.value)}
          ></input>
          <h4 className="form-text">
            Total Shares Owned {assetOwned[0]?.num_shares}
          </h4>
          <h4 className="form-text">Market Price ${stock?.i_price}</h4>
          <h4 className="form-text">
            Total Price ${(stock?.i_price * num_shares).toFixed(2)}
          </h4>
        </div>
        <button
          className="order-btn"
          type="submit"
          disabled={validationErrors.length > 0}
        >
          Make an Order
        </button>
      </form>
    </div>
  );
};
export default TransactionForm;
