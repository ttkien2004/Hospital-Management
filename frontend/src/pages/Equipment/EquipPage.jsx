import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Toolbar } from "primereact/toolbar";
import { useState } from "react";

const EquipPage = () => {
  const [data, setData] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const dataSource = [
    {
      id: "123456789",
      name: "alo",
      status: "alo",
      room: "1",
      borrower: "Đạt Không Chín",
      borrow_date: "24 - 10 -2024",
      back_date: "25 - 10 - 2024",
    },
  ];
  const columns = [
    { field: "id", header: "Mã thiết bị" },
    { field: "name", header: "Tên" },
    { field: "status", header: "Tình trạng" },
    { field: "room", header: "Phòng" },
    { field: "borrower", header: "Người mượn" },
    { field: "borrow_date", header: "Thời gian mượn" },
    { field: "back_date", header: "Thời gian trả" },
  ];

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
          disabled={true}
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
        dataKey={"ID"}
        value={dataSource}
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
