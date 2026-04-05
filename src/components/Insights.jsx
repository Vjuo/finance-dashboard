export default function Insights({ transactions }) {
  const categoryData = Object.values(
    transactions.reduce((acc, curr) => {
      if (curr.type === "expense") {
        acc[curr.category] = acc[curr.category] || { name: curr.category, value: 0 };
        acc[curr.category].value += curr.amount;
      }
      return acc;
    }, {})
  );

  const highest = categoryData.sort((a, b) => b.value - a.value)[0];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
      <h2 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Insights</h2>
      {highest ? (
        <p className="text-gray-700 dark:text-gray-300">Highest Spending: {highest.name} (₹ {highest.value})</p>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">No insights available</p>
      )}
    </div>
  );
}