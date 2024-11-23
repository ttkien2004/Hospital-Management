import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { useState } from "react";

const MedicPage = () => {
  const [data, setData] = useState([]);
  const dataSource = [
    {
      id: "123456789",
      name: "alo",
      import: "alo",
      sell: "alo",
      outdated: "f",
      source: "0000000000",
      total: "Bác sĩ",
      left: "alo",
    },
  ];
  const columns = [
    { field: "id", header: "Mã số thuốc" },
    { field: "name", header: "Tên thuốc" },
    { field: "import", header: "Giá nhập" },
    { field: "sell", header: "Giá bán" },
    { field: "outdated", header: "Hạn sử dụng" },
    { field: "source", header: "Xuất xứ" },
    { field: "total", header: "Tổng" },
    { field: "left", header: "Tồn kho" },
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

export default MedicPage;
