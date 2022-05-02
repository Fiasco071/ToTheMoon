import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAWallet, addAWallet } from '../../store/wallet'
import './index.css'


const WalletForm = () => {
    const dispatch = useDispatch();

    const redux_wallet = useSelector((state) => state.wallet);
    const currentUser = useSelector((state) => state.session.user);

    const [amount, setAmount] = useState(0.00);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    


    useEffect(() => {
        const errors = [];
        if (amount < 0) errors.push("Please enter a valid amount.");
        setValidationErrors(errors);
    }, [amount])

    const cashoutWallet = async (e) => {
        e.preventDefault();
        // console.log(redux_wallet[1].amount * -1)
        const wallet = {
            amount: redux_wallet[1].amount * -1 
        };
        await dispatch(addAWallet(wallet));
    }

    const submitForm = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if (validationErrors.length) return alert("Your submit has errors, cannot submit!");

        const wallet = {
            amount: amount
        };
        console.log("-----------CURRENT WALLET AMT:", +currentUser.wallet.amount)
        console.log("-----------CHANGE WALLET AMT:", amount)
        console.log("-----------CHANGE WALLET AMT:", +currentUser.wallet.amount + +amount)
        // Will need to construct Thunk and dispatch calls
        // await dispatch(somesortofcreatethunkactioncall(wallet));

        if (validationErrors.length === 0) {
                let update = await dispatch(addAWallet(wallet));
                if (update) {
                    // history.push(``);
                }
        }

        setAmount(0.00);
        setValidationErrors([]);
        setHasSubmitted(false);

    }


    return (
        <div>
            <a onClick={cashoutWallet}>CASHOUT</a>
             <form onSubmit={(e) => submitForm(e)}>
                    <h3 className="wallet-form-title">Wallet</h3>
                    <div className='wallet-form-input-box'>
                        <p> Add funds </p>
                        <input
                            name="amount"
                            className='wallet-form-input'
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                            >
                        </input>
                    </div>
                    <button className="button">Submit</button>
                </form>
        </div>
    );
}

export default WalletForm
