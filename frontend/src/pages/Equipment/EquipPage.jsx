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

const EquipPage = () => {
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
  const [selectedEquipments, setSelectedEquipments] =
    useState(initialEquipment);
  const [equipment, setEquipment] = useState(initialEquipment);
  const [equipments, setEquipments] = useState([]);
  const [isView, setIsView] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const dt = useRef();

  // CRUD
  const handleCreate = async (equipment) => {
    try {
      const response = await EquipmentApi.createEquipment(equipment);
      if (response) {
        toast.success("Thêm thiết bị mới thành công");
        setEquipments([equipment, ...equipments]);
        setEquipment(initialEquipment);
      }
    } catch (err) {
      console.log(err);
      toast.error("Thêm thiết bị thất bại");
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
      toast.error("Xóa thiết bị thất bại");
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
      toast.error("Cập nhật thiết bị thất bại");
    }
  };

  const columns = [
    { field: "ID", header: "Mã thiết bị" },
    { field: "Ten", header: "Tên thiết bị" },
    { field: "TinhTrang", header: "Tình trạng" },
    { field: "Phong", header: "Phòng" },
    { field: "NguoiMuon", header: "Người mượn" },
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
          onClick={() => {
            setVisible(true), setIsView(false);
            setIsUpdate(false), setEquipment(initialEquipment);
          }}
        ></Button>
        <Button
          label="Xóa thiết bị"
          severity="danger"
          // disabled={selectedEquipments.length === 0 ? true : false}
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
          onClick={() => setVisible(false)}
        ></Button>
        {!isView && (
          <Button
            label="Xác nhận"
            onClick={() => {
              if (isUpdate) {
                handleUpdate(equipment);
              } else {
                console.log(equipment);
                handleCreate(equipment);
              }
            }}
          ></Button>
        )}
      </>
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
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <Column selectionMode="single" headerStyle={{ width: "4rem" }}></Column>
        {dynamicColumns}
        <Column
          header="Ngày mượn"
          field="NgayMuon"
          headerStyle={{ minWidth: "6rem" }}
          alignHeader={"center"}
          align={"center"}
          body={(rowData) => moment(rowData.NgayMuon).format("YYYY-MM-DD")}
        ></Column>
        <Column
          header="Ngày trả"
          field="NgayTra"
          headerStyle={{ minWidth: "6rem" }}
          alignHeader={"center"}
          align={"center"}
          body={(rowData) => moment(rowData.NgayTra).format("YYYY-MM-DD")}
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
        style={{ width: "600px", height: "650px" }}
      >
        <div className="same-field">
          <div className="field">
            <label htmlFor="id">Mã thiết bị</label>
            <InputText id="id" value={equipment.ID} disabled></InputText>
          </div>

          <div className="field">
            <label htmlFor="name">Tên thiết bị</label>
            <InputText
              id="name"
              value={equipment.Ten}
              onChange={(e) =>
                setEquipment({ ...equipment, Ten: e.target.value })
              }
              disabled={isView ? true : false}
            ></InputText>
          </div>
        </div>

        <div className="same-field">
          <div className="field">
            <label htmlFor="status">Tình trạng</label>
            <InputText
              id="status"
              value={equipment.TinhTrang}
              onChange={(e) =>
                setEquipment({ ...equipment, TinhTrang: e.target.value })
              }
              disabled={isView ? true : false}
            ></InputText>
          </div>

          <div className="field">
            <label htmlFor="room">Phòng</label>
            <InputText
              id="room"
              value={equipment.Phong}
              onChange={(e) =>
                setEquipment({ ...equipment, Phong: e.target.value })
              }
              disabled={isView ? true : false}
            ></InputText>
          </div>
        </div>

        {/* <div className="field">
          <label>Ngày mượn</label>
          <Calendar
            showIcon
            value={
              equipment.ThoiGianMuon ? new Date(equipment.ThoiGianMuon) : ""
            }
            onChange={(e) => {
              setEquipment({ ...equipment, ThoiGianMuon: e.value });
            }}
          ></Calendar>
        </div>

        <div className="field">
          <label>Ngày trả</label>
          <Calendar
            showIcon
            value={
              equipment.ThoiGianTra ? new Date(equipment.ThoiGianTra) : ""
            }
            onChange={(e) => {
              setEquipment({ ...equipment, ThoiGianTra: e.value });
            }}
          ></Calendar>
        </div>         */}
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
                console.log(selectedEquipments.ID);
                handleDelete(selectedEquipments.ID);
              }}
            ></Button>
          </>
        )}
      >
        <div>Bạn có muốn xóa thiết bị này?</div>
      </Dialog>
    </Card>
  );
};

export default EquipPage;
