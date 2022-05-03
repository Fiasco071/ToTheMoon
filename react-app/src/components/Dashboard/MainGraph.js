import React, { PureComponent } from "react";
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



// export const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// export const dataFunc = async () => {
//   const response = await fetch(`/api/stocks/test`);
//   const simData = await response.json();
// }

// let data = []
// for (let i = 0; i <= 252; i++) {
//   let obj = {}
//   obj["name"] = i
//   obj["price"] = simData.sim_data[i]
//   data.push(obj)
// }



const MainGraph = () => {

  const simData = useSelector(state => state.simData)
  const dataArr = simData.sim_data;
  // console.log(dataArr)
  const data = [];
  dataArr?.forEach((pieceOfData, i) => {
    const plotObj = {
      name: i+1,
      uv: pieceOfData
    }
    data.push(plotObj)
  })

  // {
  //   name: "Day 1",
  //   uv: 4000
  // }
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
        <YAxis />
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



// export default class MainGraph extends PureComponent {
//   // constructor(data){
//   //   super(data)
//   // }
//   static demoUrl = "https://codesandbox.io/s/tiny-area-chart-uw0k8";

//   render() {
//     return (
//       <ResponsiveContainer width="100%" height="100%">
//         <AreaChart
//           width={730}
//           height={250}
//           data={data}
//           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//         >
//           <defs>
//             <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//             </linearGradient>
//             {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
//                             <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
//                         </linearGradient> */}
//           </defs>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Tooltip />
//           <Area
//             type="monotone"
//             dataKey="uv"
//             stroke="#8884d8"
//             fillOpacity={1}
//             fill="url(#colorUv)"
//           />
//           {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
//         </AreaChart>
//       </ResponsiveContainer>
//     );
//   }
// }

export default MainGraph
