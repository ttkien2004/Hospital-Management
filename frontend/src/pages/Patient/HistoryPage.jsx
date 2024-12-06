import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { PatientApi } from "../../services/Patient";
import { useState } from "react";
import moment from "moment";
import "../style.css";
import { Dialog } from "primereact/dialog";
import { toast } from "react-toastify";
import { Calendar } from "primereact/calendar";

const HistoryPage = ({
  historyRef,
  patient,
  setPatient,
  history,
  setHistory,
}) => {
  const initialHistory = {
    NgayKham: "",
    ChiSoSucKhoe: "",
    YtaID: "",
    Ho_va_ten: "",
  };

  // const [history, setHistory] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(initialHistory);
  const [dialog, setDialog] = useState(false);
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
    // { field: "NgayKham", header: "Ngày khám" },
    { field: "ChiSoSucKhoe", header: "Chỉ số sức khỏe" },
    { field: "YtaID", header: "Y tá" },
    { field: "Ho_va_ten", header: "Họ và tên y tá" },
  ];

  const prescriptionColumns = [
    { field: "Ma_don", header: "Mã đơn thuốc" },
    { field: "Ten_thuoc", header: "Tên thuốc" },
    { field: "Hdsd", header: "Hướng dẫn sử dụng" },
    { field: "Outdate", header: "Hạn sử dụng" },
    { field: "Limit", header: "Chống chỉ định" },
    { field: "Ten_duoc_si", header: "Tên dược sĩ" },
  ];
  // Handle lấy đơn thuốc
  const handleGetPrescription = async (bnid, date) => {
    try {
      const response = await PatientApi.getPrescription(bnid, date);

      if (response) {
        console.log(response.data.data);
        setPrescription(response.data.data);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.error);
    }
  };
  const stringColumnDate = (rowData) => {
    return moment(rowData.NgayKham).format("YYYY-MM-DD");
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
        // body={col.field === "NgayKham" && stringColumnDate}
      ></Column>
    );
  });

  const stringPrescriptionColumnDate = (rowData) => {
    return moment(rowData.Outdate).format("YYYY-MM-DD");
  };
  const dynamicPrescriptionColumns = prescriptionColumns.map((col, index) => {
    return (
      <Column
        key={index}
        field={col.field}
        header={col.header}
        headerStyle={{ minWidth: "8rem" }}
        alignHeader={"center"}
        align={"center"}
        body={col.field === "Outdate" && stringPrescriptionColumnDate}
      ></Column>
    );
  });

  const actionTemplate = (rowData) => {
    return (
      <>
        <Button
          severity="secondary"
          icon="pi pi-address-book"
          tooltip="Xem thông tin đơn thuốc"
          tooltipOptions={{ position: "top" }}
          style={{ marginRight: "10px" }}
          onClick={() => {
            // console.log(rowData);
            // console.log(patient.ID);
            setSelectedHistory(rowData);
            setDialog(true);
            handleGetPrescription(
              patient.ID,
              moment(rowData.NgayKham).format("YYYY-MM-DD")
            );
          }}
        ></Button>
        <Button
          severity="info"
          icon="pi pi-eye"
          tooltip="Xem thông tin lịch sử khám"
          tooltipOptions={{ position: "top" }}
        ></Button>
      </>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return moment(rowData.NgayKham).format("YYYY-MM-DD");
  };
  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="yy-mm-dd"
        placeholder="yyyy-mm-dd"
        mask="9999-99-99"
        showIcon
      />
    );
  };

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
      title={() => (
        <>
          <i
            className="pi pi-refresh"
            style={{ fontSize: "20px", marginRight: "10px", cursor: "pointer" }}
            onClick={() => {
              setHistory([]), setPatient(initialPatient);
            }}
          ></i>
          Làm mới
        </>
      )}
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
          currentPageReportTemplate="{first} đến {last} trong tất cả {totalRecords} lần khám"
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
          <Column
            header="Ngày khám"
            field="NgayKham"
            style={{ minWidth: "10rem" }}
            body={dateBodyTemplate}
            filter
            filterElement={dateFilterTemplate}
            dataType="date"
          ></Column>
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

      {/* Dialog cho đơn thuốc */}
      <Dialog
        visible={dialog}
        onHide={() => setDialog(false)}
        header={`Thông tin đơn thuốc ngày ${moment(
          selectedHistory.NgayKham
        ).format("YYYY-MM-DD")}`}
        footer={() => (
          <>
            <Button
              outlined
              label="Đóng"
              onClick={() => {
                setSelectedHistory(initialHistory), setDialog(false);
              }}
            ></Button>
          </>
        )}
        style={{ width: "1000px", height: "600px" }}
      >
        <DataTable
          value={prescription}
          tableStyle={{ minWidth: "60rem" }}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 30]}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          {dynamicPrescriptionColumns}
        </DataTable>
      </Dialog>
    </Card>
  );
};

export default HistoryPage;
