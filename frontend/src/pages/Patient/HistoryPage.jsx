import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "primereact/button";
import { PatientApi } from "../../services/Patient";
import { useState } from "react";
import moment from "moment";
import "../style.css";
import { Dialog } from "primereact/dialog";
import { Panel } from "primereact/panel";

const HistoryPage = ({
  historyRef,
  patient,
  setPatient,
  history,
  setHistory,
}) => {
  const { id } = useParams();
  // const [history, setHistory] = useState([]);
  const initialPatient = {
    ID: "",
    CCCD: "",
    Ho: "",
    Ten: "",
    NgaySinh: "",
    GioiTinh: "",
    BHYT: "",
    ChieuCao: "",
    CanNang: "",
  };

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
        body={col.field === "NgayKham" && stringColumnDate}
      ></Column>
    );
  });

  const actionTemplate = () => {
    return (
      <>
        {/* <Button
          severity="danger"
          icon="pi pi-trash"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          tooltip="Xóa lịch sử khám"
          tooltipOptions={{ position: "top" }}
        ></Button> */}
        <Button
          severity="info"
          icon="pi pi-eye"
          tooltip="Xem thông lịch sử khám"
          tooltipOptions={{ position: "top" }}
        ></Button>
      </>
    );
  };

  const startContent = () => {
    return (
      <>
        <Button label="Đóng lịch sử khám"></Button>
      </>
    );
  };

  useEffect(() => {
    // console.log(id);
    // PatientApi.getAllLKB(patient.ID)
    //   .then((res) => {
    //     setHistory(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log(Bnid, TenBn);
  }, []);
  return (
    // <Card
    //   style={{
    //     marginTop: "100px",
    //     marginBottom: "100px",
    //     marginLeft: "20px",
    //     marginRight: "20px",
    //   }}
    // >
    //   <DataTable
    //     value={history}
    //     tableStyle={{ minWidth: "60rem" }}
    //     paginator
    //     rows={10}
    //     rowsPerPageOptions={[10, 20, 30]}
    //     paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    //     currentPageReportTemplate="{first} to {last} of {totalRecords}"
    //     header={`Lịch sử khám của bệnh nhân`}
    //   >
    //     {dynamicColumns}
    //     <Column
    //       header="Thao tác"
    //       headerStyle={{ minWidth: "15rem" }}
    //       alignHeader={"center"}
    //       align={"center"}
    //       body={actionTemplate}
    //     ></Column>
    //   </DataTable>
    // </Card>
    // <Panel
    //   style={{ marginBottom: "100px", marginLeft: "20px", marginRight: "20px" }}
    //   header={() => (
    //     <div
    //       style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    //       onClick={() => {
    //         setPatient(initialPatient);
    //         setHistory([]);
    //       }}
    //     >
    //       <i className="pi pi-arrow-right" style={{ marginRight: "5px" }}></i>
    //       <div>Trở về danh sách bệnh nhân</div>
    //     </div>
    //   )}
    // >
    //   <Card>
    //     <div ref={historyRef}>
    //       <DataTable
    //         value={history}
    //         tableStyle={{ minWidth: "60rem" }}
    //         paginator
    //         rows={10}
    //         rowsPerPageOptions={[10, 20, 30]}
    //         paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    //         currentPageReportTemplate="{first} to {last} of {totalRecords}"
    //         emptyMessage={
    //           patient.Ho === "" && patient.Ten === ""
    //             ? "Dữ liệu trống"
    //             : `Không tìm thấy lịch sử khám bệnh của bệnh nhân ${patient.Ho} ${patient.Ten}`
    //         }
    //         header={
    //           patient.Ho === "" && patient.Ten === ""
    //             ? "Thông tin lịch sử khám của bệnh nhân"
    //             : `Thông tin lịch sử khám của bệnh nhân ${patient.Ho} ${patient.Ten}`
    //         }
    //       >
    //         {dynamicColumns}
    //         <Column
    //           header="Thao tác"
    //           headerStyle={{ minWidth: "15rem" }}
    //           alignHeader={"center"}
    //           align={"center"}
    //           body={actionTemplate}
    //         ></Column>
    //       </DataTable>
    //     </div>
    //   </Card>
    // </Panel>
    <Card
      style={{ marginBottom: "100px", marginLeft: "20px", marginRight: "20px" }}
    >
      <div ref={historyRef}>
        <DataTable
          value={history}
          tableStyle={{ minWidth: "60rem" }}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 30]}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          emptyMessage={
            patient.Ho === "" && patient.Ten === ""
              ? "Không tìm thấy dữ liệu"
              : `Không tìm thấy lịch sử khám bệnh của bệnh nhân ${patient.Ho} ${patient.Ten}`
          }
          header={
            patient.Ho === "" && patient.Ten === ""
              ? "Thông tin lịch sử khám của bệnh nhân"
              : `Thông tin lịch sử khám của bệnh nhân ${patient.Ho} ${patient.Ten}`
          }
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
      </div>
    </Card>
  );
};

export default HistoryPage;
