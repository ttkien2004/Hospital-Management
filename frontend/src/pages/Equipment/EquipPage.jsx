import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { useState } from "react";

const EquipPage = () => {
  const [data, setData] = useState([]);
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

  const actionTemplate = () => {
    return (
      <>
        <Button severity="success" icon="pi pi-plus"></Button>
        <Button
          severity="danger"
          icon="pi pi-trash"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        ></Button>
        <Button severity="primary" icon="pi pi-eye"></Button>
      </>
    );
  };
  return (
    <Card
      style={{
        paddingLeft: "10px",
        paddingRight: "10px",
        minHeight: "100vh",
        paddingTop: "50px",
        backgroundColor: "rgb(245,245,245)",
      }}
    >
      <DataTable
        value={dataSource}
        tableStyle={{ minWidth: "60rem" }}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 20, 30]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
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
