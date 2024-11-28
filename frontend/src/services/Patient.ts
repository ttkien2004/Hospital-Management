import axiosClient from "../axios/axiosConfig";

export interface ApiResponse<T> {
  data: T;
  status?: number;
  message?: string;
}

export interface PatientType {
  ID: string;
  CCCD: string;
  Ho: string;
  Ten: string;
  NgaySinh: string;
  GioiTinh: string;
  BHYT: string;
  ChieuCao: string;
  CanNang: string;
}

export const PatientApi = {
  getPatients: async (): Promise<ApiResponse<PatientType[]>> => {
    try {
      const response = await axiosClient.get("/getAllPatients");
      return {
        data: response.data,
      };
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },
  getPatient: async (id: string): Promise<ApiResponse<PatientType>> => {
    try {
      const response = await axiosClient.get(`/getPatient/${id}`);
      return {
        data: response.data,
      };
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },
};
