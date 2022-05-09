import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
// import { addATransaction } from "../../store/transaction";
import { getAStock } from "../../store/stock";
import { getAllAssets } from "../../store/asset";
import { cashoutTransaction } from "../../store/transaction";

const CashoutStockForm = ({ prop }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  const stock = useSelector((state) => state.stocks[id]);
  const user = useSelector((state) => state.session.user);
  const assets = useSelector((state) => state.assets);

  let assetOwned = [];
  Object.values(assets).forEach((asset) => {
    if (asset.stock?.id == id) {
      assetOwned.push(asset);
    }
  });

  const [price_at_transaction, setPriceAtTransaction] = useState(
    stock?.i_price
  );

  const [num_shares, setNum_Shares] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getAStock(id));
    dispatch(getAllAssets());
  }, [dispatch, prop.newTransaction]);

  const getAssets = async () => {
    await dispatch(getAllAssets());
  };

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
    prop.setNewTransaction(!prop.newTransaction);

    const transaction = {
      num_shares: assets[id]?.num_shares,
      price_at_transaction,
    };

    let cashedOutTransaction;

    cashedOutTransaction = await dispatch(cashoutTransaction(transaction, id));
    setPriceAtTransaction(stock?.i_price);
    setNum_Shares(0);
    setTotalPrice(0);
    setHasSubmitted(false);
    setValidationErrors([]);
    history.push(`/home`);
  };

  return (
    <div className="transaction-form-container">
      <form onSubmit={handleSubmit}>
        {!assetOwned[0]?.num_shares && (
          <h4 className="form-text">Total Shares Owned 0</h4>
        )}
        {assetOwned[0]?.num_shares > 0 && (
          <h4 className="form-text">
            Total Shares Owned {assetOwned[0]?.num_shares}
          </h4>
        )}
        <h4>
          Market Price $
          {stock?.i_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h4>
        <h4>
          Total Price $
          {(stock?.i_price * assetOwned[0]?.num_shares)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h4>
        <button onClick={getAssets} className="order-btn" type="submit">
          Cashout Shares
        </button>
      </form>
    </div>
  );
};
export default CashoutStockForm;
