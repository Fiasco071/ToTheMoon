import React, { PureComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const MainGraph = () => {

  const simData = useSelector(state => state.simData)
  const dataArr = simData.sim_data;
  const stock_price = useSelector(state => Object.values(state.stocks).filter(stock => stock.id == 1)[0]?.i_price)
  const [data, setData] = useState()

  
  const dataset = [];
  if (dataArr) {
    Object.values(dataArr)[0].forEach((pieceOfData, i) => {
     let cur_price = pieceOfData  
      if (cur_price < 0) cur_price = 0
      const plotObj = {
        name: i+1,
        uv: cur_price
      }
      dataset.push(plotObj)
    })
    dataset[0].uv = stock_price
  }

  let i = 252;

  useEffect(() => {
    setData(dataset.slice(0,i))
    const loop = setInterval(() => {
      i+=1;
      setData(dataset.slice(0,i))
    },3000)
    return () => clearInterval(loop);
  }, [])


  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                      </linearGradient> */}
        </defs>
        <XAxis dataKey="name" />
        <YAxis type="number" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
}


export default MainGraph
