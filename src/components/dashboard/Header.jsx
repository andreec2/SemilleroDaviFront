export default function Header({ onMenuToggle, isMenuOpen }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <span className="text-3xl">💳</span>
          <h1 className="text-2xl font-bold text-gray-800">FinanceApp</h1>
        </div>

        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-2xl"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

      </div>
    </header>
  );
}
