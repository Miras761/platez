import React from 'react';
import { Palette } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="bg-purple-600 p-2 rounded-lg text-white">
          <Palette size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">Anna Art</h1>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Digital Illustrator</p>
        </div>
      </div>
      <div className="hidden sm:block text-right">
        <p className="text-sm font-medium text-gray-900">Приём платежей</p>
        <p className="text-xs text-gray-500">Безопасная оплата через Точка Банк</p>
      </div>
    </header>
  );
};

export default Header;