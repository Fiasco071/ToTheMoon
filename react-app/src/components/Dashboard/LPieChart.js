
import { useSelector } from "react-redux";
import { PieChart, Pie, ResponsiveContainer, Cell, LabelList } from "recharts";
//Lab, Sector, Cell removed from recharts import to take away console warnings


const LPieChart = () => {
  const data = []
  const assets = useSelector(state => state.assets)
  Object.values(assets).forEach(asset => {
    let value = (+asset.stock.i_price * +asset.num_shares)
    let obj = { "name": asset.stock.ticker, "value": value  }
    data.push(obj)
  }) 
  const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE' ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  


    return (
        <ResponsiveContainer width="150%" height="10%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
}

export default LPieChart