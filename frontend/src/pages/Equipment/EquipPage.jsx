import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Toolbar } from "primereact/toolbar";
import { useEffect, useRef, useState } from "react";
import { EquipmentApi } from "../../services/Equipment";
import { useSelector } from "react-redux";
const EquipPage = () => {
  const user = useSelector((state) => state.user.user);
  if (
    !user ||
    (user.UserType !== "BacSi" &&
      user.UserType !== "YTa" &&
      user.UserType !== "QuanTriVien")
  ) {
    return <div>Bạn không có quyền hạn truy cập trang này</div>;
  }
  const initialEquipment = {
    ID: 0,
    Ten: "",
    TinhTrang: "",
    Phong: "",
    ThoiGianMuon: "",
    ThoiGianTra: "",
    NguoiMuon: "",
  };
  const [data, setData] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [equipment, setEquipment] = useState(initialEquipment);
  const [equipments, setEquipments] = useState([]);
  const dt = useRef();

  const columns = [
    { field: "ID", header: "Mã thiết bị" },
    { field: "Ten", header: "Tên thiết bị" },
    { field: "TinhTrang", header: "Tình trạng" },
    { field: "Phong", header: "Phòng" },
    { field: "NguoiMuon", header: "Người mượn" },
  ];

  const stringColumnDate = (rowData) => {
    return moment(rowData).format("YYYY-MM-DD");
  };
  const dynamicColumns = columns.map((col, index) => {
    return (
      <Column
        key={index}
        field={col.field}
        header={col.header}
        headerStyle={{ minWidth: "10rem" }}
        alignHeader={"center"}
        align={"center"}
      ></Column>
    );
  });

  const startContent = () => {
    return (
      <>
        <Button
          label="Thêm thiết bị"
          severity="success"
          style={{ marginRight: "20px" }}
          // onClick={() => {
          //   setDialog(true),
          //     setIsView(false),
          //     setIsUpdate(false),
          //     setPatient(initialPatient);
          // }}
        ></Button>
        <Button
          label="Xóa thiết bị"
          severity="danger"
          disabled={selectedEquipments.length === 0 ? true : false}
          // onClick={() => {
          //   setDeleteDialog(true);
          // }}
        ></Button>
      </>
    );
  };

  const actionTemplate = (rowData) => {
    return (
      <>
        <Button
          severity="secondary"
          icon="pi pi-pencil"
          tooltip="Cập nhật thiết bị"
          tooltipOptions={{ position: "top" }}
          style={{ marginLeft: "10px", marginRight: "10px" }}
        ></Button>
        <Button
          severity="info"
          icon="pi pi-eye"
          tooltip="Xem thông tin thiết bị"
          tooltipOptions={{ position: "top" }}
        ></Button>
      </>
    );
  };

  useEffect(() => {
    EquipmentApi.getAllEquipments()
      .then((res) => {
        setEquipments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Card
      style={{
        marginTop: "100px",
        marginBottom: "100px",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      <Toolbar start={startContent} style={{ marginBottom: "20px" }}></Toolbar>
      <DataTable
        ref={dt}
        dataKey={"ID"}
        value={equipments}
        selection={selectedEquipments}
        onSelectionChange={(e) => setSelectedEquipments(e.value)}
        tableStyle={{ minWidth: "60rem" }}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 20, 30]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "4rem" }}
        ></Column>
        {dynamicColumns}
        <Column
          header="Thao tác"
          headerStyle={{ minWidth: "12rem" }}
          alignHeader={"center"}
          align={"center"}
          body={actionTemplate}
        ></Column>
      </DataTable>
    </Card>
  );
};

export default EquipPage;
