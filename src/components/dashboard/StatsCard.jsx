export default function StatsCard({ title, value, emoji, bgColor = 'bg-blue-100' }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center text-2xl`}>
          {emoji}
        </div>
      </div>
    </div>
  );
}