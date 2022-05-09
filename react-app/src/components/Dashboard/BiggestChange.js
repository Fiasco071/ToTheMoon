import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./BiggestChange.css";

const BiggestChange = () => {
  const stocksObj = useSelector((state) => state.stocks);
  const stocks = Object.values(stocksObj);

  const randomNum = (num) => {
    return Math.floor(Math.random() * num);
  };

  const randomNamePicker = (stocks) => {
    const picked = [];
    const random = randomNum(stocks?.length);
    let random2 = randomNum(stocks?.length);
    if (random === random2) {
      if (random2 === 0) {
        random2 += 1;
      } else {
        random2 -= 1;
      }
    }
    for (let i = 0; i < stocks.length; i++) {
      let stock = stocks[i];
      if (i === random) {
        picked.push(stock?.ticker);
      }
      if (i === random2) {
        picked.push(stock?.ticker);
      }
    }

    return [picked.join("*")];
  };

  return (
    <div>
      {randomNamePicker(stocks).map((stockName) => (
        <div key={"1"}>
          <div className="recent-change-wrapper">
            <div className="picked">{stockName.split("*")[0]}</div>
            <div className="arrow-up"></div>
            <div className="percentage">
              {randomNum(4)}.{randomNum(100)}%
            </div>
          </div>
          <div className="recent-change-wrapper" id="down-box">
            <div className="picked">{stockName.split("*")[1]}</div>
            <div className="arrow-down"></div>
            <div className="percentage">
              {randomNum(4)}.{randomNum(100)}%
            </div>
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
  );
};

// const BiggestChange = () => {
//     const stocksObj = useSelector(state => state.stocks)
//     const stocks = Object.values(stocksObj)
//

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

export default BiggestChange;
