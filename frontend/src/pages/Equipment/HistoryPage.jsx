import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { useState } from "react";
import moment from "moment";
import "../style.css";
import { Dialog } from "primereact/dialog";
import { toast } from "react-toastify";
import { Calendar } from "primereact/calendar";

const HistoryPage = ({
  historyRef,
  equipment,
  setEquipment,
  history,
  setHistory,
}) => {
  const initialHistory = {
    Nhan_vien_id: "",
    Ten_nhan_vien: "",
    Ngay_muon: "",
    Ngay_tra: "",
  };
  const initialEquipment = {
    ID: 0,
    Ten: "",
    TinhTrang: "",
    Phong: "",
    TrangThaiMuon: "",
  };

  const columns = [
    // { field: "NgayKham", header: "Ngày khám" },
    { field: "Nhan_vien_id", header: "ID" },
    { field: "Nhan_vien", header: "Tên nhân viên" },
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
        // body={col.field === "NgayKham" && stringColumnDate}
      ></Column>
    );
  });

  const ngayMuonBodyTemplate = (rowData) => {
    return moment(rowData.Ngay_muon).format("YYYY-MM-DD");
  };
  const ngayTraBodyTemplate = (rowData) => {
    return moment(rowData.Ngay_tra).format("YYYY-MM-DD");
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
    <Card
      title={() => (
        <>
          <i
            className="pi pi-refresh"
            style={{ fontSize: "20px", marginRight: "10px", cursor: "pointer" }}
            onClick={() => {
              setHistory([]), setEquipment(initialEquipment);
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
          currentPageReportTemplate="{first} đến {last} trong tất cả {totalRecords} lần mượn"
          emptyMessage={
            equipment.Ten === ""
              ? "Không tìm thấy dữ liệu"
              : `Không tìm thấy lịch sử khám bệnh của bệnh nhân ${equipment.Ten}`
          }
          header={
            equipment.Ten === ""
              ? "Thông tin lịch sử mượn của thiết bị"
              : `Thông tin lịch sử mượn của thiết bị ${equipment.Ten}`
          }
        >
          {/* <Column
            header="Ngày khám"
            field="NgayKham"
            style={{ minWidth: "10rem" }}
            body={dateBodyTemplate}
            filter
            filterElement={dateFilterTemplate}
            dataType="date"
          ></Column> */}
          {dynamicColumns}
          <Column
            header="Ngày mượn"
            field="Ngay_muon"
            style={{ minWidth: "5rem" }}
            body={ngayMuonBodyTemplate}
            filter
            filterElement={dateFilterTemplate}
            dataType="date"
          ></Column>
          <Column
            header="Ngày trả"
            field="Ngay_tra"
            style={{ minWidth: "5rem" }}
            body={ngayTraBodyTemplate}
            filter
            filterElement={dateFilterTemplate}
            dataType="date"
          ></Column>
        </DataTable>
      </div>
    </Card>
  );
};

export default HistoryPage;
