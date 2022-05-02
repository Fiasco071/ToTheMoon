import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import './index.css'


const WalletForm = () => {
    const currentUser = useSelector((state) => state.session.user);
    const [amount, setAmount] = useState();
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


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

        setAmount(0.00);
        setValidationErrors([]);
        setHasSubmitted(false);
    }

    useEffect(() => {
        const errors = [];
        if (amount < 0) errors.push("Please enter a valid amount.");
        setValidationErrors(errors);
    }, [amount])


    return (
        <div>
             <form onSubmit={(e) => submitForm(e)} method="POST" action="/api/wallet/add">
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