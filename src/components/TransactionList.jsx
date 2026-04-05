import { useState } from "react";

export default function TransactionList({ transactions, role, setTransactions }) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    date: "",
    category: "",
    amount: "",
    type: "expense"
  });

  const filtered = transactions.filter(t =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.date || !form.category || !form.amount) return;

    setTransactions(prev => [
      ...prev,
      {
        id: Date.now(),
        ...form,
        amount: Number(form.amount)
      }
    ]);

    setShowModal(false);
    setForm({ date: "", category: "", amount: "", type: "expense" });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow mb-6">

      <h2 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
        Transactions
      </h2>

      <input
        className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          <thead>
            <tr className="text-left text-gray-600 dark:text-gray-300 border-b">
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3 text-right">Amount</th>
              <th className="py-2 px-3 text-right">Type</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(t => (
              <tr
                key={t.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                <td className="py-2 px-3">{t.date}</td>
                <td className="py-2 px-3">{t.category}</td>
                <td className="py-2 px-3 text-right">₹ {t.amount}</td>
                <td className="py-2 px-3 text-right capitalize">{t.type}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {role === "admin" && (
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Transaction
        </button>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-80">

            <h3 className="mb-3 font-semibold text-gray-800 dark:text-white">
              Add Transaction
            </h3>

            <input
              type="date"
              className="w-full mb-2 p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={e => setForm({ ...form, date: e.target.value })}
            />

            <input
              placeholder="Category"
              className="w-full mb-2 p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={e => setForm({ ...form, category: e.target.value })}
            />

            <input
              type="number"
              placeholder="Amount"
              className="w-full mb-2 p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={e => setForm({ ...form, amount: e.target.value })}
            />

            <select
              className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={e => setForm({ ...form, type: e.target.value })}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 dark:text-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}