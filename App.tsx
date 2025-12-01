import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PaymentForm from './components/PaymentForm';
import LegalModal from './components/LegalModal';
import { ModalType } from './types';

const App: React.FC = () => {
  const [modalType, setModalType] = useState<ModalType>(null);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50 relative overflow-x-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-50 to-transparent -z-10"></div>
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
      <div className="absolute top-[20%] left-[-10%] w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <Header />

      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center gap-12 px-4 py-8 max-w-7xl mx-auto w-full">
        
        {/* Left Side: Art/Image (Visible on Desktop) */}
        <div className="hidden lg:block flex-1 max-w-lg">
           <div className="relative group">
              <div className="absolute inset-0 bg-black rounded-3xl transform translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4"></div>
              <div className="relative rounded-3xl overflow-hidden border-2 border-gray-900 aspect-[4/5]">
                <img 
                    src="https://picsum.photos/600/800?grayscale" 
                    alt="Illustrator Portfolio" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                    <h2 className="text-white text-3xl font-serif font-bold mb-2">Создавая <br/> визуальные миры</h2>
                    <p className="text-gray-200 text-sm font-light">
                        Профессиональная иллюстрация для вашего бизнеса. 
                        Оплачивайте заказы быстро и безопасно.
                    </p>
                </div>
              </div>
           </div>
        </div>

        {/* Right Side: Payment Form */}
        <div className="flex-1 w-full max-w-lg">
          <PaymentForm />
        </div>

      </main>

      <Footer openModal={setModalType} />

      <LegalModal type={modalType} onClose={() => setModalType(null)} />
    </div>
  );
};

export default App;