import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import { EquipmentApi } from "../../services/Equipment";
import "../style.css";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import HistoryPage from "./HistoryPage";
import { ScrollTop } from "primereact/scrolltop";

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
  const [selectedEquipments, setSelectedEquipments] = useState(null);
  const [equipment, setEquipment] = useState(initialEquipment);
  const [equipments, setEquipments] = useState([]);
  const [isView, setIsView] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState([]);

  const statusOptions = [
    { label: "Hoạt động tốt", value: "Hoạt động tốt" },
    { label: "Cần bảo trì", value: "Cần bảo trì" },
    { label: "Hư hỏng", value: "Hư hỏng" },
  ];
  const [selectedStatus, setSelectedStatus] = useState("");
  const dt = useRef();
  const tableCard = useRef(null);

  // CRUD
  const checkEmptyAttribute = (equip) => {
    const keysToCheck = ["Ten", "TinhTrang", "Phong"];
    return keysToCheck.some((key) => equip[key] === "");
  };

  const handleCreate = async (equipment) => {
    if (checkEmptyAttribute(equipment)) {
      toast.error("Các trường bắt buộc phải được điền");
      return;
    }
    try {
      const response = await EquipmentApi.createEquipment(equipment);
      if (response) {
        toast.success("Thêm thiết bị mới thành công");
        setEquipments([response.data, ...equipments]);
        setEquipment(initialEquipment);
        setSubmitted(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await EquipmentApi.deleteEquipment(id);

      if (response) {
        toast.success("Xóa thiết bị thành công");
        setEquipments(equipments.filter((e) => e.ID !== id));
      }
    } catch (err) {
      console.log(err);
      toast.error(err.error);
    }
  };
  const handleUpdate = async (newEquipment) => {
    try {
      const response = await EquipmentApi.updateEquipment(newEquipment);
      if (response) {
        toast.success("Cập nhật thiết bị thành công");
        let newEquipments = equipments.filter((e) => e.ID !== newEquipment.ID);
        setEquipments([newEquipment, ...newEquipments]);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.error);
    }
  };

  const getAllHistory = async (TbID) => {
    try {
      const response = await EquipmentApi.getAllHistory(TbID);
      if (response) {
        setHistory(
          response.data.data.map((item) => ({
            ...item,
            Ngay_muon: new Date(item.Ngay_muon),
            Ngay_tra: new Date(item.Ngay_tra),
          }))
        );
      }
    } catch (err) {
      toast.error(err.error);
    }
  };

  const columns = [
    { field: "ID", header: "Mã thiết bị" },
    { field: "Ten", header: "Tên thiết bị" },
    // { field: "TinhTrang", header: "Tình trạng" },
    { field: "Phong", header: "Phòng" },
    { field: "TrangThaiMuon", header: "Trạng thái mượn" },
    // { field: "TrangThaiMuon", header: "Trạng thái mượn" },
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
        sortable
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
          onClick={() => {
            setVisible(true), setIsView(false);
            setIsUpdate(false), setEquipment(initialEquipment);
          }}
        ></Button>
        <Button
          label="Xóa thiết bị"
          severity="danger"
          disabled={!selectedEquipments ? true : false}
          onClick={() => {
            setDeleteDialog(true), setEquipment(selectedEquipments);
          }}
        ></Button>
      </>
    );
  };

  const actionTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-history"
          tooltip="Xem lịch sử mượn"
          tooltipOptions={{ position: "top" }}
          onClick={() => {
            getAllHistory(rowData.ID);
            setEquipment(rowData);
            if (tableCard.current) {
              tableCard.current.scrollIntoView({ behavior: "smooth" });
            }
          }}
        ></Button>
        <Button
          severity="secondary"
          icon="pi pi-pencil"
          tooltip="Cập nhật thiết bị"
          tooltipOptions={{ position: "top" }}
          style={{ marginLeft: "10px", marginRight: "10px" }}
          onClick={() => {
            setVisible(true),
              setIsUpdate(true),
              setIsView(false),
              setEquipment(rowData);
          }}
        ></Button>
        <Button
          severity="info"
          icon="pi pi-eye"
          tooltip="Xem thông tin thiết bị"
          tooltipOptions={{ position: "top" }}
          onClick={() => {
            setVisible(true),
              setIsUpdate(false),
              setIsView(true),
              setEquipment(rowData);
          }}
        ></Button>
      </>
    );
  };

  const customFooter = () => {
    return (
      <>
        <Button
          outlined
          label="Đóng"
          onClick={() => {
            setVisible(false), setSelectedStatus(""), setSubmitted(false);
          }}
        ></Button>
        {!isView && (
          <Button
            label="Xác nhận"
            onClick={() => {
              setSubmitted(true);
              if (isUpdate) {
                handleUpdate(equipment);
              } else {
                console.log(equipment);
                handleCreate(equipment);
              }
              setSelectedStatus("");
            }}
          ></Button>
        )}
      </>
    );
  };

  const status = [
    { name: "Hoạt động tốt" },
    { name: "Cần bảo trì" },
    { name: "Hư hỏng" },
  ];
  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={status}
        itemTemplate={statusItemTemplate}
        onChange={(e) => options.filterCallback(e.value.name)}
        optionLabel="name"
        placeholder="Chọn tình trạng"
        className="p-column-filter"
      />
    );
  };

  const statusItemTemplate = (option) => {
    return (
      <div className="p-multiselect-representative-option">
        <span className="image-text">{option.name}</span>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className="status-field"
        style={
          rowData.TinhTrang === "Hoạt động tốt"
            ? { backgroundColor: "rgb(34, 197, 94)" }
            : rowData.TinhTrang === "Cần bảo trì"
            ? { backgroundColor: "rgb(249, 115, 22)" }
            : { backgroundColor: "red" }
        }
      >
        {rowData.TinhTrang}
      </span>
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
    <>
      <Card
        style={{
          marginTop: "100px",
          marginBottom: "100px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <Toolbar
          start={startContent}
          style={{ marginBottom: "20px" }}
        ></Toolbar>
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
          currentPageReportTemplate="{first} đến {last} trong tất cả {totalRecords} thiết bị"
          removableSort
        >
          <Column
            selectionMode="single"
            headerStyle={{ width: "4rem" }}
          ></Column>
          {dynamicColumns}
          {/* <Column
          header="Ngày mượn"
          field="NgayMuon"
          headerStyle={{ minWidth: "6rem" }}
          alignHeader={"center"}
          align={"center"}
          body={(rowData) => moment(rowData.NgayMuon).format("YYYY-MM-DD")}
        ></Column> */}
          {/* <Column
          header="Ngày trả"
          field="NgayTra"
          headerStyle={{ minWidth: "6rem" }}
          alignHeader={"center"}
          align={"center"}
          body={(rowData) => moment(rowData.NgayTra).format("YYYY-MM-DD")}
        ></Column> */}
          <Column
            header="Tình trạng"
            field="TinhTrang"
            headerStyle={{ minWidth: "2rem" }}
            filterField="TinhTrang"
            showFilterMatchModes={false}
            filterMenuStyle={{ width: "14rem" }}
            body={statusBodyTemplate}
            filter
            filterElement={statusFilterTemplate}
          ></Column>
          <Column
            header="Thao tác"
            headerStyle={{ minWidth: "12rem" }}
            alignHeader={"center"}
            align={"center"}
            body={actionTemplate}
          ></Column>
        </DataTable>

        {/* Dialog thêm, xem, cập nhật */}
        <Dialog
          header={
            isView
              ? "Xem thông tin thiết bị"
              : isUpdate
              ? "Cập nhật thông tin thiết bị"
              : "Thêm thiết bị mới"
          }
          visible={visible}
          onHide={() => setVisible(false)}
          footer={customFooter}
          style={{ width: "600px" }}
        >
          <div className="same-field">
            <div className="field">
              <label htmlFor="id">Mã thiết bị</label>
              <InputText id="id" value={equipment.ID} disabled></InputText>
            </div>

            <div className="field">
              <label htmlFor="name">
                Tên thiết bị <span style={{ color: "red" }}>*</span>
              </label>
              <InputText
                id="name"
                value={equipment.Ten}
                onChange={(e) =>
                  setEquipment({ ...equipment, Ten: e.target.value })
                }
                disabled={isView ? true : false}
                aria-describedby="ten-help"
                invalid={submitted && equipment.Ten === "" ? true : false}
              ></InputText>
              {submitted && equipment.Ten === "" && (
                <small
                  id="ten-help"
                  style={{
                    color: "red",
                  }}
                >
                  {"Bạn chưa nhập thông tin tên"}
                </small>
              )}
            </div>
          </div>

          <div className="same-field">
            <div className="field">
              <label htmlFor="status">
                Tình trạng <span style={{ color: "red" }}>*</span>
              </label>
              {/* <InputText
              id="status"
              value={equipment.TinhTrang}
              onChange={(e) =>
                setEquipment({ ...equipment, TinhTrang: e.target.value })
              }
              disabled={isView ? true : false}
            ></InputText> */}
              <Dropdown
                value={
                  !isView && !isUpdate ? selectedStatus : equipment.TinhTrang
                }
                options={statusOptions}
                onChange={(e) => {
                  setSelectedStatus(e.value),
                    setEquipment({ ...equipment, TinhTrang: e.value });
                }}
                placeholder="Chọn tình trạng của thiết bị"
                style={{ width: "250px" }}
                disabled={isView ? true : false}
                aria-describedby="status-help"
                invalid={submitted && equipment.TinhTrang === "" ? true : false}
              ></Dropdown>
              {submitted && equipment.TinhTrang === "" && (
                <small
                  id="status-help"
                  style={{
                    color: "red",
                  }}
                >
                  {"Bạn chưa chọn"}
                </small>
              )}
            </div>

            <div className="field">
              <label htmlFor="room">
                Phòng <span style={{ color: "red" }}>*</span>
              </label>
              <InputText
                id="room"
                value={equipment.Phong}
                onChange={(e) =>
                  setEquipment({ ...equipment, Phong: e.target.value })
                }
                disabled={isView ? true : false}
                aria-describedby="room-help"
                invalid={submitted && equipment.Phong === "" ? true : false}
              ></InputText>
              {submitted && equipment.Phong === "" && (
                <small
                  id="room-help"
                  style={{
                    color: "red",
                  }}
                >
                  {"Bạn chưa nhập thông tin phòng"}
                </small>
              )}
            </div>
          </div>
        </Dialog>

        {/* Dialog xác nhận xóa */}
        <Dialog
          header="Xác nhận xóa thiết bị"
          visible={deleteDialog}
          onHide={() => setDeleteDialog(false)}
          style={{ width: "500px", height: "200px" }}
          footer={() => (
            <>
              <Button
                label="Hủy"
                outlined
                onClick={() => setDeleteDialog(false)}
              ></Button>
              <Button
                label="Xác nhận"
                severity="danger"
                onClick={() => {
                  handleDelete(selectedEquipments.ID);
                  setSelectedEquipments(null);
                }}
              ></Button>
            </>
          )}
        >
          <div>Bạn có muốn xóa thiết bị này?</div>
        </Dialog>
      </Card>
      <HistoryPage
        history={history}
        setHistory={setHistory}
        historyRef={tableCard}
        equipment={equipment}
        setEquipment={setEquipment}
      />

      <ScrollTop />
    </>
  );
};

export default EquipPage;
