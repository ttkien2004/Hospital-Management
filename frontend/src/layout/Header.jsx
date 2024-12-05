// import { Sidebar } from "primereact/sidebar";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const [visible, setVisible] = useState(false);
//   const navigate = useNavigate();
//   const sidebar_contents = [
//     {
//       title: "Nhân viên bệnh viện",
//       link: "/nhan-vien",
//     },
//     {
//       title: "Danh sách bệnh nhân",
//       link: "/patient",
//     },
//     {
//       title: "Thiết bị y tế",
//       link: "/equipment",
//     },
//   ];
//   return (
//     <div className="header">
//       <Sidebar
//         visible={visible}
//         onHide={() => setVisible(false)}
//         style={{ backgroundImage: "linear-gradient(#89A8B2, white)" }}
//       >
//         <h1
//           style={{ color: "white", display: "flex", justifyContent: "center" }}
//         >
//           Hospital
//         </h1>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             height: "400px",
//             // justifyContent: "space-between",
//             marginTop: "50px",
//             // backgroundColor: "#D4EBF8",
//             // border: "1px solid red",
//             borderRadius: "10px",
//           }}
//         >
//           {sidebar_contents.map((cont, index) => (
//             <div
//               key={index}
//               className="sidebar-content"
//               onClick={() => {
//                 navigate(cont.link), setVisible(false);
//               }}
//             >
//               {cont.title}
//             </div>
//           ))}
//         </div>
//       </Sidebar>
//       <div
//         style={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
//       >
//         <i
//           className="pi pi-align-justify"
//           style={{ fontSize: "17px", cursor: "pointer" }}
//           onClick={() => setVisible(!visible)}
//         ></i>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           width: "300px",
//           justifyContent: "space-between",
//           marginRight: "50px",
//         }}
//       >
//         <div>Hệ thống quản lý bệnh viện</div>
//         <div
//           style={{
//             border: "1px solid #7e7e7e",
//             height: "60%",
//           }}
//         ></div>
//         <div>Username</div>
//       </div>
//     </div>
//   );
// };

// export default Header;

import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"; // Import useEffect từ react
import { useSelector } from "react-redux"; // Import useSelector từ react-redux
import { useDispatch } from "react-redux"; // Import useDispatch từ react-redux
import { setUser } from "../redux/actions/userActions";
const Header = () => {
  const [visible, setVisible] = useState(false);
  const [showLogout, setShowLogout] = useState(false); // Thêm state để điều khiển hiển thị nút Logout
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // Log user information
  // console.log("User information:", user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  const sidebar_contents = [
    {
      title: "Nhân viên bệnh viện",
      link: "/nhan-vien",
    },
    {
      title: "Danh sách bệnh nhân",
      link: "/patient",
    },
    {
      title: "Thiết bị y tế",
      link: "/equipment",
    },
  ];

  // Hàm để xử lý đăng xuất
  const handleLogout = () => {
    // console.log("Logging out...");
    // Logic xử lý đăng xuất (clear session, redirect to login page, v.v)
    dispatch(setUser(null));
    navigate("/login"); // Ví dụ: điều hướng về trang login sau khi đăng xuất
  };

  return (
    <div className="header">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ backgroundImage: "linear-gradient(#89A8B2, white)" }}
      >
        <h1
          style={{ color: "white", display: "flex", justifyContent: "center" }}
        >
          Hospital
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "400px",
            marginTop: "50px",
            borderRadius: "10px",
          }}
        >
          {sidebar_contents.map((cont, index) => (
            <div
              key={index}
              className="sidebar-content"
              onClick={() => {
                navigate(cont.link), setVisible(false);
              }}
            >
              {cont.title}
            </div>
          ))}
        </div>
      </Sidebar>

      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
      >
        <i
          className="pi pi-align-justify"
          style={{ fontSize: "17px", cursor: "pointer" }}
          onClick={() => setVisible(!visible)}
        ></i>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "300px",
          justifyContent: "space-between",
          marginRight: "50px",
        }}
      >
        <div>Hệ thống quản lý bệnh viện</div>
        <div
          style={{
            border: "1px solid #7e7e7e",
            height: "60%",
          }}
        ></div>
        <div
          style={{
            cursor: "pointer", // Thêm hiệu ứng con trỏ
          }}
          onClick={() => setShowLogout(!showLogout)} // Bấm vào Username để toggle hiển thị Logout
        >
          {user?.fullName || ""} {/* Hiển thị tên người dùng */}
        </div>

        {/* Hiển thị nút Logout khi showLogout là true */}
        {showLogout && (
          <div
            style={{
              backgroundColor: "#f1f1f1",
              padding: "10px",
              borderRadius: "5px",
              position: "absolute",
              right: "50px",
              top: "65px", // Điều chỉnh vị trí popup Logout
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <button
              onClick={handleLogout} // Hàm xử lý logout
              style={{
                backgroundColor: "#FF5C5C",
                border: "none",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
