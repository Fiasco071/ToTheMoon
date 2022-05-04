import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { addATransaction } from "../../store/transaction";
import { getAStock } from "../../store/stock";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  let stock = useSelector((state) => state.stocks[id]);
  let user = useSelector((state) => state.session.user);
  // console.log(user.wallet.amount);

  const [isOwned, setIsOwned] = useState(true);
  const [num_shares, setNumShares] = useState(0);
  const [price_at_transaction, setPriceAtTransaction] = useState(
    stock?.i_price
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getAStock(id));
  }, [dispatch]);

  useEffect(() => {
    const errors = [];
    if (user?.wallet?.amount < num_shares * price_at_transaction) {
      errors.push("Insufficient funds");
    }
    if (num_shares < 1) {
      errors.push("Must buy at least 1 share");
    }
    setValidationErrors(errors);
  }, [num_shares, totalPrice, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
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

    history.push(`/home`);
  };

  return (
    <div className="transaction-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Number of Shares"
          value={num_shares}
          onChange={(e) => setNumShares(e.target.value)}
        ></input>
        <p>Market Price ${stock?.i_price}</p>
        <p>Total Price ${stock?.i_price * num_shares}</p>
        <button type="submit" disabled={validationErrors.length > 0}>
          Make an Order
        </button>
      </form>
    </div>
  );
};
export default TransactionForm;
