import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useDispatch } from "react-redux";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"; // Đảm bảo đã import PrimeFlex
import { AuthApi } from "../services/Auth";
import { setUser } from "../redux/actions/userActions";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Thêm state để lưu thông báo lỗi
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu các trường để trống
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      // Gửi yêu cầu đăng nhập qua API
      const response = await AuthApi.login(username, password);
      if (response.msg === "Login successful") {
        // console.log("Login success:", response.user);
        toast.success("Đăng nhập thành công");
        setError("");
        dispatch(setUser(response.user));

        navigate("/patient");
      } else {
        setError(
          response.mgs || "Đăng nhập không thành công. Vui lòng thử lại."
        );
      }
    } catch (error) {
      // Bắt lỗi từ API hoặc các vấn đề không mong muốn

      if (error.response.status === 401) {
        setError("Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại.");
      } else if (error.response.status === 404) {
        setError("Không tìm thấy người dùng. Vui lòng kiểm tra lại.");
      } else {
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
      //   setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      //   console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen bg-blue-100">
      <Card className="w-full sm:w-8 md:w-6 lg:w-4 p-5 shadow-2 border-round-lg">
        <div className="text-center mb-4">
          <div className="text-900 text-3xl font-medium mb-3">Đăng Nhập</div>
          <div className="text-500">
            Vui lòng nhập thông tin của bạn để đăng nhập
          </div>
        </div>
        {error && (
          <div className="p-mb-3 p-text-danger text-center">{error}</div>
        )}{" "}
        {/* Hiển thị lỗi nếu có */}
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field my-4">
            <span className="p-float-label p-input-icon-right">
              <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                required
                placeholder="Nhập username của bạn"
              />
              <label htmlFor="username">Username</label>
            </span>
          </div>

          <div className="field mb-4">
            <span className="p-float-label">
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
                className="w-full"
                required
                feedback={false}
                placeholder="Nhập mật khẩu của bạn"
              />
              <label htmlFor="password">Mật khẩu</label>
            </span>
          </div>

          <Button
            type="submit"
            label="Đăng nhập"
            className="w-full mt-3 p-button-rounded p-button-primary"
          />
        </form>
        <Button
          severity="help"
          onClick={() => navigate("/register")}
          label="Đăng ký tài khoản"
          className="w-full mt-3 p-button-rounded p-button-primary"
        />
      </Card>
    </div>
  );
};

export default Login;
