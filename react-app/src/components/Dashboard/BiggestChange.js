import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import './BiggestChange.css'


const BiggestChange = () => {
    const stocksObj = useSelector(state => state.stocks)
    const stocks = Object.values(stocksObj)
   
    const randomNum = (num) => {
        return Math.floor(Math.random() * num)
    }
    
    const randomNamePicker = (stocks) => {
        for (let i = 0; i < stocks?.length; i++) {
                const random = randomNum(stocks?.length);
            let stock = stocks[i]
            if (i === random) {
                // console.log("Randomly selected --", random, "Matching index --", i)
                return stock?.long_name
            } 
        }
        return stocks[7]?.long_name
        // return randomNamePicker(stocks)
    }

    return (
        <div>
            <div className='recent-change-wrapper'>
                <div>{randomNamePicker(stocks)}</div>
                <div className='arrow-up'></div>
            </div>
            <div className='recent-change-wrapper'>
                <div>{randomNamePicker(stocks)}</div>
                <div className='arrow-down'></div>
            </div>
        </div>
    )
}

// const BiggestChange = () => {
//     const stocksObj = useSelector(state => state.stocks)
//     const stocks = Object.values(stocksObj)
//     console.log(stocks)

//     return (
//         <div>
//             <div className='recent-change-wrapper'>
//                 <div>{stocks[7]?.long_name}</div>
//                 <div className='arrow-up'></div>
//             </div>
//             <div className='recent-change-wrapper'>
//                 <div>{stocks[5]?.long_name}</div>
//                 <div className='arrow-down'></div>
//             </div>
//         </div>
//     )
// }

export default BiggestChange
