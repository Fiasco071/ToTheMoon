import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { cashMeOutside, addAWallet } from "../../store/wallet";
import "./index.css";

const WalletForm = ({ prop }) => {
  const dispatch = useDispatch();

  const redux_wallet = useSelector((state) => state.wallet);
  const currentUser = useSelector((state) => state.session.user);

  const [amount, setAmount] = useState(0.0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const errors = [];
    if (amount < 0) errors.push("Please enter a valid amount.");
    setValidationErrors(errors);
  }, [amount]);

  const cashoutWallet = async (e) => {
    e.preventDefault();
    await dispatch(cashMeOutside());
    prop.setShowModal(false);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    setShowErrors(true);

    const wallet = {
      amount: amount,
    };


    if (validationErrors.length === 0) {
      let update = await dispatch(addAWallet(wallet));
      if (update) {
        setValidationErrors([]);
        setHasSubmitted(false);
        prop.setShowModal(false);
      }
    }
  };

  return (
    <div className="wallet-form-box">
      <form onSubmit={(e) => submitForm(e)}>
        <h3 className="wallet-form-title">Wallet</h3>
        <div className="wallet-form-input-box">
          <p> Add funds </p>
          <p> Invest In </p>
          <p> Amount </p>

          <select className="dollar-input">
            <option>Dollars</option>
          </select>

          <input
            name="amount"
            className="wallet-form-input"
            type="number"
            step="0.01"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder="0.00"
          ></input>
        </div>
        <div>
          {showErrors && (
            <ul className="errors wallet-error">
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="wallet-button">
          SUBMIT
        </button>
      </form>
      <a className="cashout-link" onClick={cashoutWallet}>
        CASHOUT
      </a>
    </div>
  );
};

export default WalletForm;
