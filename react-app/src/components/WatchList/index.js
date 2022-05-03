import './index.css'
import {useHistory} from 'react-router-dom'

const WatchList = ({ stocks }) => {
    const history = useHistory()
    console.log(stocks)
    return (
        <div>
            <div className='stocks-list'>
                {Object.values(stocks).map((stock) => (
                    <div key={stock?.id} className="stock-box" onClick={() => {
                        history.push(`/stocks/${stock?.id}`)
                    }}>
                        <div>
                            <h2 className="stock-ticker">{stock?.ticker}</h2>
                            <h2 className='stock-price'>${stock?.i_price}</h2>
                        </div>
                        <div className="note-card-content-box">
                            <p>{stock?.long_name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default WatchList