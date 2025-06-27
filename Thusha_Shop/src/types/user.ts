<<<<<<< HEAD

=======
>>>>>>> upstream/main
export type UserRole = "customer" | "admin" | "doctor" | "delivery" | "manufacturer";

export type FaceShape = "round" | "oval" | "square" | "heart" | "diamond" | "oblong" | "triangle" | "unknown";

export type VisionProblem = "nearsighted" | "farsighted" | "astigmatism" | "presbyopia" | "none" | "unknown";

<<<<<<< HEAD
export interface Prescription {
  id: string;
  rightEye: {
    sphere: number;
    cylinder: number;
    axis: number;
  };
  leftEye: {
    sphere: number;
    cylinder: number;
    axis: number;
  };
  pupillaryDistance: number;
  doctorName: string;
  dateIssued: string;
  expiryDate: string;
  notes?: string;
  isActive?: boolean; // Added missing isActive property
  // Additional properties for compatibility
  patientId?: string;
  patientName?: string;
  date?: string;
  doctor?: string;
  sphereRight?: string;
  sphereLeft?: string;
  cylinderRight?: string;
  cylinderLeft?: string;
  axisRight?: string;
  axisLeft?: string;
  pdRight?: string;
  pdLeft?: string;
  status?: string;
}

export interface UserPreferences {
  frameStyle?: string;
  preferredBrands?: string[];
  budgetRange?: {
    min: number;
    max: number;
  };
  faceShape?: FaceShape;
  visionProblem?: VisionProblem;
}

=======
// Base profile interface for common fields
>>>>>>> upstream/main
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profile?: {
    phone_number: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
   
  };
  faceShape?: string;
  visionProblem?: string;
  prescriptions?: Prescription[];
  avatarUrl?: string;
  preferences?: UserPreferences;
  createdAt: string;
  lastLogin?: string;
  orders?: string[];
  createdBy?: string;
  is_active?: boolean;
}
<<<<<<< HEAD
=======


 export interface Prescription {
  id: number;
  prescription_id: string;
  doctor_name: string;
  patient_name: string;
  date_issued: string;
  expiry_date: string;
  right_sphere: string | null;
  right_cylinder: string | null;
  right_axis: string | null;
  left_sphere: string | null;
  left_cylinder: string | null;
  left_axis: string | null;
  pupillary_distance: number | null;
  status: string;  // add this line for status
}


export interface UserPreferences {
  frameStyle?: string;
  preferredBrands?: string[];
  budgetRange?: {
    min: number;
    max: number;
  };
  faceShape?: FaceShape;
  visionProblem?: VisionProblem;
}


>>>>>>> upstream/main
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
}

export interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<User>;
<<<<<<< HEAD
  logout: () => void;
=======
  logout: (showToast?: boolean) => Promise<void>;
>>>>>>> upstream/main
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  hasRole: (requiredRoles: UserRole | UserRole[]) => boolean;
  setUserFaceShape: (faceShape: FaceShape) => void;
  setUserVisionProblem: (visionProblem: VisionProblem) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
<<<<<<< HEAD
  fetchProfile: () => Promise<void>; //
  validateForm: (schema: any, data: any) => { success: boolean; errors?: any };
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  resendOTP: (email: string) => Promise<void>;
}
=======
  fetchProfile: () => Promise<void>;
  validateForm: (schema: any, data: any) => { success: boolean; errors?: any };
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  resendOTP: (email: string) => Promise<void>;
}
>>>>>>> upstream/main
