import React, { useState, useEffect } from 'react';
import { CreditCard, Sparkles, Check, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { PaymentData, FormErrors, PaymentStatus } from '../types';
import { createPayment } from '../services/mockPaymentService';
import { improveDescription } from '../services/geminiService';

const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState<PaymentData>({
    amount: '',
    clientName: '',
    email: '',
    description: '',
    agreedToTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.IDLE);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = "Введите корректную сумму";
    if (!formData.clientName.trim()) newErrors.clientName = "Представьтесь, пожалуйста";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Введите корректный email";
    if (!formData.description.trim()) newErrors.description = "Опишите назначение платежа";
    if (!formData.agreedToTerms) newErrors.agreedToTerms = "Необходимо согласие с условиями";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus(PaymentStatus.PROCESSING);
    
    try {
      const response = await createPayment(formData);
      if (response.success) {
        setStatus(PaymentStatus.SUCCESS);
      } else {
        alert(response.message);
        setStatus(PaymentStatus.IDLE);
      }
    } catch (error) {
      console.error(error);
      setStatus(PaymentStatus.ERROR);
    }
  };

  const handleEnhanceDescription = async () => {
    if (!formData.description.trim()) return;
    setIsEnhancing(true);
    const enhanced = await improveDescription(formData.description);
    setFormData(prev => ({ ...prev, description: enhanced }));
    setIsEnhancing(false);
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      clientName: '',
      email: '',
      description: '',
      agreedToTerms: false
    });
    setStatus(PaymentStatus.IDLE);
  };

  if (status === PaymentStatus.SUCCESS) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden p-8 text-center animate-in fade-in zoom-in-95 duration-300 border border-purple-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} />
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Счёт сформирован!</h2>
        <p className="text-gray-600 mb-8">
          Мы подготовили ссылку для оплаты через банк Точка. Сейчас вы будете перенаправлены на платёжный шлюз.
        </p>
        <button 
          onClick={resetForm}
          className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-xl transition-colors"
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-xl shadow-purple-900/5 overflow-hidden border border-gray-100 relative">
        {/* Decorative Top Border */}
        <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"></div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">Оплата заказа</h2>
            <p className="text-gray-500 text-sm">Заполните форму для формирования счёта</p>
          </div>

          {/* Amount Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Сумма (RUB)</label>
            <div className="relative">
                <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0"
                    className={`w-full pl-4 pr-12 py-4 text-2xl font-bold text-gray-900 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors.amount ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">₽</span>
            </div>
            {errors.amount && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.amount}</p>}
          </div>

          {/* Name & Email Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Ваше имя</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                placeholder="Иван Петров"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors.clientName ? 'border-red-300' : 'border-gray-200'}`}
              />
              {errors.clientName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.clientName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="ivan@example.com"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors.email ? 'border-red-300' : 'border-gray-200'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
            </div>
          </div>

          {/* Description Field with AI */}
          <div>
            <div className="flex justify-between items-end mb-1">
                <label className="block text-sm font-medium text-gray-700 ml-1">Назначение платежа</label>
                <button
                    type="button"
                    onClick={handleEnhanceDescription}
                    disabled={isEnhancing || !formData.description}
                    className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 disabled:opacity-50 transition-colors font-medium"
                    title="Улучшить описание с помощью AI"
                >
                    {isEnhancing ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12} />}
                    AI-помощник
                </button>
            </div>
            <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Например: Иллюстрация для книги..."
                rows={3}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none ${errors.description ? 'border-red-300' : 'border-gray-200'}`}
            />
             {errors.description && <p className="text-red-500 text-xs mt-1 ml-1">{errors.description}</p>}
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={formData.agreedToTerms}
                onChange={(e) => setFormData({...formData, agreedToTerms: e.target.checked})}
                className="w-5 h-5 border-gray-300 rounded text-purple-600 focus:ring-purple-500 transition-all cursor-pointer"
              />
            </div>
            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
              Я подтверждаю правильность данных и соглашаюсь с <span className="text-purple-600 underline decoration-dotted">публичной офертой</span> и <span className="text-purple-600 underline decoration-dotted">политикой конфиденциальности</span>.
            </label>
          </div>
          {errors.agreedToTerms && <p className="text-red-500 text-xs text-center">{errors.agreedToTerms}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === PaymentStatus.PROCESSING}
            className="w-full py-4 px-6 bg-gray-900 hover:bg-gray-800 text-white text-lg font-medium rounded-2xl shadow-lg shadow-gray-200 transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {status === PaymentStatus.PROCESSING ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                Обработка...
              </>
            ) : (
              <>
                Перейти к оплате
                <ArrowRight size={20} />
              </>
            )}
          </button>
          
          <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mt-2">
            <CreditCard size={12} />
            <span>Безопасный платёж через Точка Банк</span>
          </div>
        </form>
    </div>
  );
};

export default PaymentForm;