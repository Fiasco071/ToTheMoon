import React, { PureComponent } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, ResponsiveContainer, Cell, LabelList } from "recharts";
//Lab, Sector, Cell removed from recharts import to take away console warnings


const AssetChart = () => {
  const data = []
  const assets = useSelector(state => state.assets)
  Object.values(assets).forEach(asset => {
    let value = (+asset.stock.i_price * +asset.num_shares)
    let obj = { "name": asset.stock.ticker, "value": value  }
    data.push(obj)
  }) 
  const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE' ];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            innerRadius={0}
            paddingAngle={2}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#FB881D"
            label
          >
{data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>

          <LabelList dataKey="name" position="insideTop" />
        </PieChart>
      </ResponsiveContainer>
    );
}

export default AssetChart