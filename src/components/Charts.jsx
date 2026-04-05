import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function Charts({ transactions }) {
  const categoryColors = {
    Food: "#ff6384",
    Transport: "#36a2eb",
    Entertainment: "#ffce56",
    Utilities: "#4bc0c0",
    Healthcare: "#9966ff",
    Other: "#ff9f40"
  };

  const categoryData = Object.values(
    transactions.reduce((acc, curr) => {
      if (curr.type === "expense") {
        acc[curr.category] = acc[curr.category] || { name: curr.category, value: 0 };
        acc[curr.category].value += curr.amount;
        acc[curr.category].fill = categoryColors[curr.category] || "#ccc";
      }
      return acc;
    }, {})
  );

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">

      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
        <h2 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Balance Trend
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={transactions}>
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
        <h2 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Spending Breakdown
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={80}>
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}