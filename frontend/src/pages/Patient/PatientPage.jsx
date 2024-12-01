import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { PatientApi } from "../../services/Patient";
import moment from "moment";

const PatientPage = () => {
  const [data, setData] = useState([]);
  const [patients, setPatients] = useState([]);

  const dataSource = [
    {
      id: "123456789",
      fname: "alo",
      lname: "alo",
      Bdate: "alo",
      sex: "f",
    },
  ];
  const columns = [
    { field: "ID", header: "ID" },
    { field: "Ho", header: "Họ" },
    { field: "Ten", header: "Tên" },
    { field: "NgaySinh", header: "Ngày sinh" },
    { field: "GioiTinh", header: "Giới tính" },
    { field: "BHYT", header: "BHYT" },
    { field: "ChieuCao", header: "Chiều cao" },
    { field: "CanNang", header: "Cân nặng" },
  ];

  const stringColumnDate = (rowData) => {
    return moment(rowData.NgaySinh).format("YYYY-MM-DD");
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
        body={col.field === "NgaySinh" && stringColumnDate}
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

  useEffect(() => {
    PatientApi.getPatients()
      .then((res) => {
        console.log(res.data);
        setPatients(res.data ?? []);
      })
      .catch(() => {
        console.log("Can not fetch data");
      });
  }, []);
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
        value={patients}
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
          headerStyle={{ minWidth: "15rem" }}
          alignHeader={"center"}
          align={"center"}
          body={actionTemplate}
        ></Column>
      </DataTable>
    </Card>
  );
};

export default PatientPage;
