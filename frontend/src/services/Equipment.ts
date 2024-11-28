import axiosClient from "../axios/axiosConfig";

export interface ApiResponse<T> {
  data: T;
  status?: number;
  message?: string;
}

// interface Patient {}
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
};
