import React, { PureComponent } from "react";
import { PieChart, Pie, ResponsiveContainer, LabelList } from "recharts";
//Lab, Sector, Cell removed from recharts import to take away console warnings
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

export default class AssetChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/pie-chart-of-straight-angle-oz0th";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#FB881D"
            label
          />
          <LabelList dataKey="name" position="insideTop" />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
