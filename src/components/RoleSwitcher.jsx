export default function RoleSwitcher({ role, setRole }) {
  return (
    <select
      className="p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      value={role}
      onChange={(e) => setRole(e.target.value)}
    >
      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>
    </select>
  );
}