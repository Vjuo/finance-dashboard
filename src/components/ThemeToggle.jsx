export default function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white rounded transition"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}