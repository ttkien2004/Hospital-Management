import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { useState } from "react";

const NotiPage = () => {
  const [data, setData] = useState([]);
  const dataSource = [
    {
      email: "alo",
      fname: "alo",
      lname: "alo",
      Bdate: "alo",
      sex: "f",
      sdt: "0000000000",
      role: "Bác sĩ",
    },
  ];
  const columns = [
    { field: "email", header: "Email" },
    { field: "fname", header: "Họ" },
    { field: "lname", header: "Tên" },
    { field: "Bdate", header: "Ngày sinh" },
    { field: "sex", header: "Giới tính" },
    { field: "sdt", header: "Số điện thoại" },
    { field: "role", header: "Vai trò" },
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

export default NotiPage;
