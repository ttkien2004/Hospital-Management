import { APIOptions } from "primereact/api";
import axiosClient from "../axios/axiosConfig";

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
      throw err;
    }
  },
  getEquipment: async (id: string): Promise<ApiResponse<EquipmentType>> => {
    try {
      const response = await axiosClient.get(`/equipment/getEquipment/${id}`);
      return {
        data: response.data,
      };
    } catch (err) {
      throw err;
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
      throw err;
    }
  },
  updateEquipment: async (equipment: EquipmentType) => {
    try {
      const response = await axiosClient.patch("/equipment/updateEquipment", {
        data: {
          ID: equipment.ID,
          Ten: equipment.Ten,
          TinhTrang: equipment.TinhTrang,
          Phong: equipment.Phong,
        },
      });
      return {
        data: response.data,
      };
    } catch (err) {
      throw err;
    }
  },
};
