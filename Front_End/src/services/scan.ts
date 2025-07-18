import axiosInstance from '@/lib/axiosInstance';
import { ScanAlert, ScanSession } from '@/type';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const scan = async (url: string) => {
  const response = await axiosInstance.post("/scan/spider/start", { url });
  return response.data;
};

export const startActiveScan = async (url: string) => {
  const response = await axiosInstance.post("/scan/active/start", { url });
  return response.data;
};

export const getAlerts = async (url: string): Promise<ScanAlert[]> => {
  const response = await axiosInstance.get<{ alerts: ScanAlert[] }>(`/scan/alerts?baseUrl=${url}`);
  return response.data.alerts;
};

export const getSpiderScanStatus = async (scanId: string) => {
  const response = await axiosInstance.get(`/scan/spider/status/${scanId}`);
  return response.data;
};

export const getActiveScanStatus = async (scanId: string) => {
  const response = await axiosInstance.get(`/scan/active/status/${scanId}`);
  return response.data;
};

// export const getAllScanSessions = async () => {
//   const response = await axiosInstance.get("/scan/scan-sessions");
//   return response.data;
// };

export const getScanResults = async (scanId: string) => {
  const response = await axiosInstance.get(`/api/zap/spider/scan/${scanId}`);
  return response.data;
};

export const fetchScanSessions = async (): Promise<ScanSession[]> => {
  const response = await axiosInstance.get<ScanSession[]>('/scan/scan-sessions')
  return response.data
}

export const createScanSession = async (url: string): Promise<ScanSession> => {
  const response = await axiosInstance.post<ScanSession>('/scan-sessions', { url })
  return response.data
}

export const getScanSession = async (id: number): Promise<ScanSession> => {
  const response = await axiosInstance.get<ScanSession>(`/scan-sessions/${id}`)
  return response.data
}

export const deleteScanSession = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/scan-sessions/${id}`)
}

// Start a full scan (spider + active scan)
export const startFullScan = async (url: string): Promise<ScanSession> => {
  const response = await axiosInstance.post<ApiResponse<ScanSession>>("/scan/Fullscan", { url });
  return response.data.data;
};

// Get all scan sessions for the current user
export const getAllScans = async (): Promise<ApiResponse<ScanSession[]>> => {
  const response = await axiosInstance.get<ApiResponse<ScanSession[]>>("/scan/getAllScans");
  return response.data;
};

// Get a specific scan session by ID
export const getScanById = async (id: number): Promise<ScanSession> => {
  const response = await axiosInstance.get<ApiResponse<ScanSession>>(`/scan/getAllScans/${id}`);
  return response.data.data;
};

// Delete a scan session
export const deleteScan = async (id: number): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.delete<ApiResponse<void>>(`/scan/scan/${id}`);
  return response.data;
};





