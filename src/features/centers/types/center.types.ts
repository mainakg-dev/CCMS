export interface Center {
  id: string;
  code: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
  createdAt: string;
}

export interface AmountEditRequest {
  centerId: string;
  courseId: string;
  amount: number;
}

export interface GenerateFranchiseRequest {
  enquiryId: string;
}
