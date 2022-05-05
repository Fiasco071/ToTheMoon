import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import './BiggestChange.css'


const BiggestChange = () => {
    const stocksObj = useSelector(state => state.stocks)
    const stocks = Object.values(stocksObj)

    const randomNum = (num) => {
        return Math.floor(Math.random() * num)
    }

    // const randomNamePicker = (stocks) => {
    //     const random = randomNum(stocks?.length);
    //     for (let i = 0; i < stocks?.length; i++) {
    //         let stock = stocks[i]
    //         if (i === random) {
    //             // console.log("Randomly selected --", random, "Matching index --", i)
    //             return stock?.long_name
    //         }
    //     }
    //     // return stocks[7]?.long_name
    //     // return randomNamePicker(stocks)
    // }

    const randomNamePicker = (stocks) => {
        const picked = []
        const random = randomNum(stocks?.length)
        let random2 = randomNum(stocks?.length)
        if (random === random2) {
            if (random2 === 0) {
                random2 += 1
            } else {
                random2 -= 1
            }
        }
        for (let i = 0; i < stocks.length; i++) {
            // console.log(random)
            let stock = stocks[i]
            // console.log(stock.long_name)
            if (i === random) {
                // console.log("Randomly selected first --", random, "Matching index --", i)
                picked.push(stock?.long_name)
            }
            if (i === random2) {
                // console.log("Randomly selected second --", random2, "Matching index --", i)
                picked.push(stock?.long_name)
            }
        }
        // return randomNamePicker(stocks)
        return [picked.join('*')]; // returns [ stock0, stock1]****
    }

    return (
        <div>
            {randomNamePicker(stocks).map(stockName => (
                <div key={"1"}>
                    <div className='recent-change-wrapper'>
                        <div>{stockName.split('*')[0]}</div>
                        <div className='arrow-up'></div>
                    </div>
                    <div className='recent-change-wrapper'>
                        <div>{stockName.split('*')[1]}</div>
                        <div className='arrow-down'></div>
                    </div>
                </div>
            ))}
            {/* <div className='recent-change-wrapper'>
                <div>{randomNamePicker(stocks)}</div>
                <div className='arrow-up'></div>
            </div>
            <div className='recent-change-wrapper'>
                <div>{randomNamePicker(stocks)}</div>
                <div className='arrow-down'></div>
            </div> */}
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
