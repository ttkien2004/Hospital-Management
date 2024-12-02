import axios from "axios";
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

export interface LanKhamBenh {
  BnID: string;
  NgayKham: string;
  ChiSoSucKhoe: string;
  DonThuocID: string;
  YtaID: string;
}

export const PatientApi = {
  getPatients: async (): Promise<ApiResponse<PatientType[]>> => {
    try {
      const response = await axiosClient.get("/patient/getAllPatients");
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
      const response = await axiosClient.get(`/patient/getPatient/${id}`);
      return {
        data: response.data,
      };
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },
  deletePatient: async (id: string): Promise<ApiResponse<PatientType>> => {
    try {
      const response = await axiosClient.delete("/patient/deletePatient", {
        params: {
          id,
        },
      });
      return {
        data: response.data,
      };
    } catch (err) {
      console.log(err?.message);
      throw err;
    }
  },
  getLKB: async (id: string): Promise<ApiResponse<LanKhamBenh[]>> => {
    try {
      const response = await axiosClient.get(`/patient/getAllLKB/${id}`);

      return {
        data: response.data,
      };
    } catch (err) {
      throw err;
    }
  },
  createNewPatient: async (
    patient: PatientType
  ): Promise<ApiResponse<PatientType>> => {
    try {
      const response = await axiosClient.post("/patient/createPatient", {
        id: patient.ID,
        cccd: patient.CCCD,
        ho: patient.Ho,
        ten: patient.Ten,
        bdate: patient.NgaySinh,
        sex: patient.GioiTinh,
        bhyt: patient.BHYT,
        height: patient.ChieuCao,
        weight: patient.CanNang,
      });
      return {
        data: response.data,
      };
    } catch (err) {
      throw err;
    }
  },
};
