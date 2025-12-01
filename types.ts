export interface PaymentData {
  amount: number | string;
  clientName: string;
  email: string;
  description: string;
  agreedToTerms: boolean;
}

export enum PaymentStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface FormErrors {
  amount?: string;
  clientName?: string;
  email?: string;
  description?: string;
  agreedToTerms?: string;
}

export type ModalType = 'OFFER' | 'PRIVACY' | null;
