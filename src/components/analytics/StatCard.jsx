export default function StatCard({ title, value, emoji }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className="text-3xl">{emoji}</div>
      </div>
    </div>
  );
}