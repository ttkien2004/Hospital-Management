import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
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
    {
      title: "Danh sách thuốc",
      link: "/medic",
    },
    {
      title: "Danh sách triệu chứng",
      link: "/disease",
    },
    {
      title: "Quản lý thông báo",
      link: "/noti",
    },
  ];
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
            justifyContent: "space-between",
            marginTop: "50px",
            // backgroundColor: "#D4EBF8",
            // border: "1px solid red",
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
        <div>Username</div>
      </div>
    </div>
  );
};

export default Header;
