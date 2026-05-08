export interface Coordinator {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface CoordinatorUpdateRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface CreateNoticeRequest {
  title: string;
  content: string;
}
