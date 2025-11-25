export default function PieChart({ data, title }) {
  if (!data || !data.slices) return null;

  const total = data.slices.reduce((sum, slice) => sum + slice.monto, 0);
  let currentAngle = -90;

  const slicesWithAngles = data.slices.map((slice, index) => {
    const angle = (slice.monto / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    return {
      ...slice,
      startAngle,
      endAngle: currentAngle,
      color: [
        '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6',
        '#EF4444', '#14B8A6', '#F97316', '#06B6D4', '#A855F7'
      ][index % 10]
    };
  });

  const createArc = (startAngle, endAngle, radius = 100) => {
    const start = polarToCartesian(120, 120, radius, endAngle);
    const end = polarToCartesian(120, 120, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return `M 120 120 L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 240 240" className="w-full max-w-md">
          {slicesWithAngles.map((slice, index) => (
            <g key={index}>
              <path
                d={createArc(slice.startAngle, slice.endAngle)}
                fill={slice.color}
                stroke="white"
                strokeWidth="2"
                className="transition-opacity hover:opacity-80 cursor-pointer"
              />
            </g>
          ))}
        </svg>
        
        <div className="mt-6 grid grid-cols-2 gap-3 w-full">
          {slicesWithAngles.map((slice, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: slice.color }}
              ></div>
              <span className="text-sm text-gray-700">
                {slice.categoria} ({slice.porcentaje}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}