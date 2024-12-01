import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application.json",
  },
});
// Cấu hình interceptor (nếu cần)
// interceptor cho các yêu cầu
axiosClient.interceptors.request.use(
  (config) => {
    // Thêm token hoặc xử lý trước khi gửi yêu cầu
    const token = localStorage.getItem("token"); // Lấy token từ localStorage (nếu có)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor cho các phản hồi
axiosClient.interceptors.response.use(
  (response) => {
    return response.data; // Chỉ trả về dữ liệu
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
