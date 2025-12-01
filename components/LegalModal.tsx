import React from 'react';
import { X } from 'lucide-react';
import { ModalType } from '../types';

interface LegalModalProps {
  type: ModalType;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const title = type === 'OFFER' ? 'Публичная оферта' : 'Политика конфиденциальности';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-serif font-bold text-gray-900">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto text-gray-600 leading-relaxed text-sm">
          {type === 'OFFER' ? (
            <div className="space-y-4">
              <p><strong>1. Общие положения</strong></p>
              <p>Настоящая публичная оферта (далее — «Оферта») является официальным предложением Исполнителя (Иллюстратора) заключить договор возмездного оказания услуг на нижеследующих условиях.</p>
              <p><strong>2. Предмет договора</strong></p>
              <p>Исполнитель обязуется оказать услуги по созданию иллюстраций, а Заказчик обязуется оплатить эти услуги в соответствии с утвержденной стоимостью.</p>
              <p><strong>3. Порядок расчетов</strong></p>
              <p>Оплата производится путем перечисления денежных средств на расчетный счет Исполнителя через платежный сервис.</p>
              <p className="italic text-gray-400 mt-8">Это пример текста оферты. В реальном приложении здесь должен быть полный юридический текст.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p><strong>1. Введение</strong></p>
              <p>Мы уважаем вашу конфиденциальность и обязуемся защищать ваши персональные данные. В настоящей Политике описывается, как мы собираем, используем и защищаем вашу информацию.</p>
              <p><strong>2. Сбор данных</strong></p>
              <p>Мы собираем только те данные, которые необходимы для выставления счетов и коммуникации: имя, электронная почта и детали заказа.</p>
              <p><strong>3. Использование данных</strong></p>
              <p>Ваши данные используются исключительно для обработки платежей и исполнения обязательств по договору.</p>
              <p className="italic text-gray-400 mt-8">Это пример текста политики конфиденциальности.</p>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium text-sm"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;