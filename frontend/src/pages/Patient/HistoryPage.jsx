import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useParams } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { useEffect } from "react";
import { Button } from "primereact/button";
import "../style.css";

const HistoryPage = () => {
  const { id } = useParams();
  const dataSource = [
    {
      NgayKham: "2024-99-99",
      ChiSoSucKhoe: "Bth",
      DonThuocID: "null",
      YtaID: "null",
    },
  ];
  const columns = [
    { field: "NgayKham", header: "Ngày khám" },
    { field: "ChiSoSucKhoe", header: "Chỉ số sức khỏe" },
    { field: "DonThuocID", header: "Đơn thuốc" },
    { field: "YtaID", header: "Y tá" },
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
        <Button
          icon="pi pi-address-book"
          tooltip="Xem lịch sử khám"
          tooltipOptions={{ position: "top" }}
          onClick={() => navigate("/patient/history-treatment")}
        ></Button>
        <Button
          severity="danger"
          icon="pi pi-trash"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          tooltip="Xóa thông tin bệnh nhân"
          tooltipOptions={{ position: "top" }}
        ></Button>
        <Button
          severity="help"
          icon="pi pi-eye"
          tooltip="Xem thông tin bệnh nhân"
          tooltipOptions={{ position: "top" }}
        ></Button>
      </>
    );
  };
  const startContent = () => {
    return (
      <>
        <Button
          label="Thêm bệnh nhân"
          severity="success"
          style={{ marginRight: "20px" }}
          onClick={() => setOpenAdd(true)}
        ></Button>
        <Button label="Xóa bệnh nhân" severity="danger" disabled></Button>
      </>
    );
  };
  useEffect(() => {
    console.log(id);
  }, []);
  return (
    <Card
      style={{
        marginTop: "100px",
        border: "1px solid red",
        marginBottom: "100px",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      <Toolbar start={startContent} style={{ marginBottom: "20px" }}></Toolbar>
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
          headerStyle={{ minWidth: "15rem" }}
          alignHeader={"center"}
          align={"center"}
          body={actionTemplate}
        ></Column>
      </DataTable>
    </Card>
  );
};

export default HistoryPage;
