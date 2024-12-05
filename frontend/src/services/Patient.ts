import axios from "axios";
import axiosClient from "../axios/axiosConfig";

export interface ApiResponse<T> {
  data: T;
  status?: number;
  message?: string;
  error?: string;
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
      throw err.response.data;
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
      throw err.response.data;
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
      throw err.response.data;
    }
  },
  getAllLKB: async (id: string): Promise<ApiResponse<LanKhamBenh[]>> => {
    try {
      const response = await axiosClient.get(`/patient/getAllLKB/${id}`);

      return {
        data: response.data,
      };
    } catch (err) {
      throw err.response.data;
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
      throw err.response.data;
    }
  },
  updatePatient: async (patient: PatientType) => {
    try {
      const response = await axiosClient.patch("/patient/updatePatient", {
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
      throw err.response.data;
    }
  },
  getPrescription: async (bnid: string, date: string) => {
    try {
      const response = await axios.get("http://localhost:5000/LayDonThuoc", {
        params: {
          bn_id: bnid,
          date: date,
        },
      });
      return {
        data: response.data,
      };
    } catch (err) {
      throw err.response.data;
    }
  },
  getHistoryTreatment: async (bnid: string) => {
    try {
      const response = await axios.get("http://localhost:5000/LayLichSuKham", {
        params: {
          id: bnid,
        },
      });
      return {
        data: response.data,
      };
    } catch (err) {
      throw err.response.data;
    }
  },
};
