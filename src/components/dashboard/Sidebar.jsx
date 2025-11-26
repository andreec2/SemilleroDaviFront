import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose, profile, formatCurrency }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToAnalytics = () => {
    navigate('/analytics');
    onClose();
  };

  const goToDashboard = () => {
    navigate('/dashboard');
    onClose();
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pb-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Mi Perfil</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-xl">
              ✕
            </button>
          </div>

          {profile && (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-3">
                  <span className="text-5xl">👤</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{profile.username}</h3>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                <p className="text-sm opacity-90 mb-1">Saldo disponible</p>
                <p className="text-3xl font-bold">{formatCurrency(profile.saldo)}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">ID de Usuario</span>
                  <span className="text-sm font-medium text-gray-800 text-xs break-all max-w-[150px]">
                    {profile.id}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Rol</span>
                  <span className="text-sm font-medium text-gray-800">{profile.role}</span>
                </div>
              </div>

              {/* Navegación */}
              <div className="space-y-2">
                <button
                  onClick={goToDashboard}
                  className="w-full py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>💳</span>
                  <span>Transacciones</span>
                </button>
                
                <button
                  onClick={goToAnalytics}
                  className="w-full py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>📊</span>
                  <span>Análisis y Gráficos</span>
                </button>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Cerrar Sesión
              </button>

              {/* Espaciado adicional al final para scroll */}
              <div className="h-4"></div>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
}