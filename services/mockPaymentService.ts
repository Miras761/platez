import { PaymentData } from '../types';

// In a real app, this would call your backend, which then talks to Tochka API 
// to generate a payment link or QR code securely.
export const createPayment = async (data: PaymentData): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate basic validation logic
      if (Number(data.amount) < 100) {
        resolve({ success: false, message: "Минимальная сумма оплаты 100 ₽" });
      } else {
        resolve({ success: true, message: "Ссылка на оплату успешно сформирована" });
      }
    }, 2000); // Simulate network latency
  });
};