export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
      <h3 className="text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">
        ₹ {value}
      </p>
    </div>
  );
}