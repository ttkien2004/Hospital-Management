import { APIOptions } from "primereact/api";
import axiosClient from "../axios/axiosConfig";
import axios from "axios";

export interface ApiResponse<T> {
  data: T;
  status?: number;
  message?: string;
}

// interface Patient {}
export interface EquipmentType {
  ID: number;
  Ten: string;
  TinhTrang: string;
  Phong: string;
  ThoiGianMuon: string;
  ThoiGianTra: string;
  NguoiMuon: string;
}
export const EquipmentApi = {
  // Ví dụ
  // getPatients: async (): Promise<ApiResponse<Patient>> => {
  //   try {
  //     const response = await axiosClient.get("/getAllPatients");
  //     return {
  //       data: response.data,
  //     };
  //   } catch (err) {
  //     console.log(err.message);
  //     throw err;
  //   }
  // },
  getAllEquipments: async (): Promise<ApiResponse<EquipmentType[]>> => {
    try {
      const response = await axiosClient.get("/equipment/getAllEquipments");
      return {
        data: response.data,
      };
    } catch (err) {
      throw err.response.data;
    }
  },
  getEquipment: async (id: string): Promise<ApiResponse<EquipmentType>> => {
    try {
      const response = await axiosClient.get(`/equipment/getEquipment/${id}`);
      return {
        data: response.data,
      };
    } catch (err) {
      throw err.response.data;
    }
  },
  deleteEquipment: async (id: string) => {
    try {
      const response = await axiosClient.delete("/equipment/deleteEquipment", {
        params: {
          equipID: id,
        },
      });
      return {
        data: response.data,
      };
    } catch (err) {
      throw err.response.data;
    }
  },
  updateEquipment: async (equipment: EquipmentType) => {
    try {
      const response = await axiosClient.patch("/equipment/updateEquipment", {
        id: equipment.ID,
        ten: equipment.Ten,
        status: equipment.TinhTrang,
        room: equipment.Phong,
      });
      return {
        data: response.data,
      };
    } catch (err) {
      throw err.response.data;
    }
  },
  createEquipment: async (equipment: EquipmentType) => {
    try {
      const response = await axiosClient.post("/equipment/createEquipment", {
        ten: equipment.Ten,
        status: equipment.TinhTrang,
        room: equipment.Phong,
      });
      return {
        data: response.data,
      };
    } catch (err) {
      throw err.response.data;
    }
  },
  getAllHistory: async (TbID: string) => {
    try {
      const response = await axios.get("http://localhost:5000/MuonThietBi", {
        params: {
          Thiet_bi_id: TbID,
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
