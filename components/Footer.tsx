import React from 'react';
import { ModalType } from '../types';

interface FooterProps {
  openModal: (type: ModalType) => void;
}

const Footer: React.FC<FooterProps> = ({ openModal }) => {
  return (
    <footer className="w-full py-8 px-4 text-center border-t border-gray-200 mt-auto bg-gray-50">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-600 mb-4">
        <button 
          onClick={() => openModal('OFFER')} 
          className="hover:text-purple-600 transition-colors underline decoration-dotted underline-offset-4"
        >
          Публичная оферта
        </button>
        <span className="hidden md:inline text-gray-300">•</span>
        <button 
          onClick={() => openModal('PRIVACY')} 
          className="hover:text-purple-600 transition-colors underline decoration-dotted underline-offset-4"
        >
          Политика обработки персональных данных
        </button>
      </div>
      <p className="text-xs text-gray-400">
        © {new Date().getFullYear()} Anna Art. Все права защищены. <br/>
        Интеграция с АО «Точка»
      </p>
    </footer>
  );
};

export default Footer;