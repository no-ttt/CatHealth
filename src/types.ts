export interface User {
  id: string;
  type: 'owner' | 'vet';
  name: string;
  email: string;
  phone: string;
  address?: string;
  idNumber?: string;
  hospitalName?: string;
  isLoggedIn: boolean;
  isPaid?: boolean; // 新增付費狀態
}

export interface Pet {
  id: string;
  name: string;
  birthday: string;
  chipNumber: string;
  bloodType: string;
  healthStatus: string;
  lastCheckup: string;
  isDonor: boolean;
  ownerId: string;
  breed?: string;
  weight?: number;
  gender?: string;
}

export interface HealthReport {
  id: string;
  petId: string;
  date: string;
  type: string;
  status: string;
  details: string;
  downloadUrl?: string;
}

export interface DNAReport {
  id: string;
  petId: string;
  date: string;
  bloodType: string;
  geneticMarkers: string[];
  healthRisks: string[];
  downloadUrl?: string;
}

export interface BloodRequestData {
  id: string;
  petId: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  surgeryDate: string;
  hospitalName: string;
  hospitalAddress: string;
  bloodType: string;
  bloodAmount: number;
  diagnosis: string;
  status: 'pending' | 'approved' | 'matched' | 'completed';
  createdAt: string;
}