export default function IndicatorCard({ title, value, emoji, subtitle, color = 'bg-blue-100' }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center text-2xl`}>
          {emoji}
        </div>
      </div>
    </div>
  );
}