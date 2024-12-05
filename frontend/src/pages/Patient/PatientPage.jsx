import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../style.css";
//
import { useEffect, useRef, useState } from "react";
import { PatientApi } from "../../services/Patient";
import moment from "moment";
import { InputText } from "primereact/inputtext";
import { useSelector } from "react-redux";
const PatientPage = () => {
  const user = useSelector((state) => state.user.user);
  if (
    !user ||
    (user.UserType !== "BacSi" &&
      user.UserType !== "YTa" &&
      user.UserType !== "QuanTriVien")
  ) {
    return <div>Bạn không có quyền hạn truy cập trang này</div>;
  }
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
  const [patients, setPatients] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [patient, setPatient] = useState(initialPatient);
  const [isView, setIsView] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(initialPatient);
  const dt = useRef(null);
  const navigate = useNavigate();

  // const dataSource = [
  //   {
  //     id: "123456789",
  //     fname: "alo",
  //     lname: "alo",
  //     Bdate: "alo",
  //     sex: "f",
  //   },
  // ];
  // handle crud
  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await PatientApi.deletePatient(id);

      if (response) {
        toast.success("Xóa dữ liệu bệnh nhân thành công");
        // setPatient(initialPatient);
        setPatients(patients.filter((p) => p.ID !== id));
      }
    } catch (err) {
      toast.error("Xóa dữ liệu bệnh nhân thất bại");
      console.log(err);
      throw err;
    }
  };
  const handleCreate = async (patient) => {
    try {
      const response = await PatientApi.createNewPatient(patient);

      if (response) {
        toast.success("Thêm bệnh nhân mới thành công");
        setPatients([patient, ...patients]);
        setPatient(initialPatient);
      }
    } catch (err) {
      toast.error("Thêm thất bại");
      console.log(err);
      throw err;
    }
  };

  const editPatient = (rowData) => {
    setPatient(rowData);
  };
  const handleUpdate = async (newPatient) => {
    try {
      const response = await PatientApi.updatePatient(newPatient);
      if (response) {
        toast.success("Cập nhật thành công");
        let newPatients = patients.filter((p) => p.ID !== newPatient.ID);
        setPatients([newPatient, ...newPatients]);
        setPatient(initialPatient);
      }
    } catch (err) {
      console.log(err);
      toast.error("Cập nhật thất bại");
      throw err;
    }
  };

  const columns = [
    { field: "ID", header: "ID" },
    { field: "Ho", header: "Họ" },
    { field: "Ten", header: "Tên" },
    { field: "NgaySinh", header: "Ngày sinh" },
    { field: "GioiTinh", header: "Giới tính" },
    { field: "BHYT", header: "BHYT" },
    { field: "ChieuCao", header: "Chiều cao (CM)" },
    { field: "CanNang", header: "Cân nặng (KG)" },
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

  const actionTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-address-book"
          tooltip="Xem lịch sử khám"
          tooltipOptions={{ position: "top" }}
          onClick={() => navigate(`/patient/history-treatment/${rowData.ID}`)}
        ></Button>
        <Button
          icon="pi pi-user-edit"
          severity="secondary"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          tooltip="Cập nhật bệnh nhân"
          tooltipOptions={{ position: "top" }}
          onClick={() => {
            setDialog(true),
              setIsView(false),
              setIsUpdate(true),
              setPatient(rowData);
          }}
        ></Button>
        <Button
          severity="info"
          icon="pi pi-eye"
          tooltip="Xem thông tin bệnh nhân"
          tooltipOptions={{ position: "top" }}
          onClick={() => {
            setDialog(true), setIsView(true), setPatient(rowData);
          }}
        ></Button>
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

  // for dialog
  const startContent = () => {
    return (
      <>
        <Button
          label="Thêm bệnh nhân"
          severity="success"
          style={{ marginRight: "20px" }}
          onClick={() => {
            setDialog(true),
              setIsView(false),
              setIsUpdate(false),
              setPatient(initialPatient);
          }}
        ></Button>
        <Button
          label="Xóa bệnh nhân"
          severity="danger"
          disabled={selectedPatient && selectedPatient.ID === "" ? true : false}
          onClick={() => {
            setDeleteDialog(true);
          }}
        ></Button>
      </>
    );
  };
  const customFooter = () => {
    return (
      <>
        <Button outlined label="Đóng" onClick={() => setDialog(false)}></Button>
        {!isView && (
          <Button
            label="Xác nhận"
            onClick={() => {
              if (isUpdate) {
                handleUpdate(patient);
              } else {
                handleCreate(patient);
              }
              console.log(patient);
            }}
          ></Button>
        )}
      </>
    );
  };
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
        dataKey={"ID"}
        ref={dt}
        value={patients}
        selection={selectedPatient}
        onSelectionChange={(e) => setSelectedPatient(e.value)}
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
          header="Thao tác"
          headerStyle={{ minWidth: "15rem" }}
          alignHeader={"center"}
          align={"center"}
          body={actionTemplate}
        ></Column>
      </DataTable>

      {/* Dialog thêm, xem bệnh nhân */}
      <Dialog
        header={
          isView
            ? "Xem thông tin chi tiết của bệnh nhân"
            : isUpdate
            ? "Thay đổi dữ liệu của bệnh nhân"
            : "Thêm bệnh nhân"
        }
        style={{ width: "600px", height: "500px" }}
        visible={dialog}
        onHide={() => setDialog(false)}
        footer={customFooter}
      >
        <div className="same-field">
          <div className="field">
            <label>Giới tính</label>
            <div id="sex" style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <RadioButton
                  inputId="nam"
                  value={patient.GioiTinh}
                  onChange={(e) => {
                    setGender(e.value);
                    setPatient({ ...patient, GioiTinh: "M" });
                  }}
                  checked={patient.GioiTinh === "M"}
                  disabled={isView ? true : false}
                ></RadioButton>
                <label htmlFor="nam" style={{ marginLeft: "10px" }}>
                  Nam
                </label>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <RadioButton
                  inputId="nu"
                  value={patient.GioiTinh}
                  onChange={(e) => {
                    setGender(e.value);
                    setPatient({ ...patient, GioiTinh: "F" });
                  }}
                  checked={patient.GioiTinh === "F"}
                  disabled={isView ? true : false}
                ></RadioButton>
                <label htmlFor="nu" style={{ marginLeft: "10px" }}>
                  Nữ
                </label>
              </div>
            </div>
          </div>
          <div className="field">
            <label htmlFor="bhyt">Bảo hiểm y tế</label>
            <InputText
              id="bhyt"
              value={patient.BHYT === null ? "" : patient.BHYT}
              onChange={(e) => setPatient({ ...patient, BHYT: e.target.value })}
              disabled={isView ? true : false}
            ></InputText>
          </div>
        </div>

        <div className="same-field">
          <div className="field">
            <label htmlFor="bn-id">ID</label>
            <InputText
              id="bn-id"
              value={patient.ID}
              onChange={(e) => setPatient({ ...patient, ID: e.target.value })}
              disabled={isView ? true : false}
            ></InputText>
          </div>
          <div className="field">
            <label htmlFor="cccd">Căn cước công dân</label>
            <InputText
              id="cccd"
              value={patient.CCCD}
              onChange={(e) => setPatient({ ...patient, CCCD: e.target.value })}
              disabled={isView ? true : false}
            ></InputText>
          </div>
        </div>

        <div className="same-field">
          <div className="field">
            <label htmlFor="ho">Họ và tên lót</label>
            <InputText
              value={patient.Ho}
              onChange={(e) => setPatient({ ...patient, Ho: e.target.value })}
              id="ho"
              disabled={isView ? true : false}
            ></InputText>
          </div>
          <div className="field">
            <label htmlFor="ten">Tên</label>
            <InputText
              value={patient.Ten}
              onChange={(e) => setPatient({ ...patient, Ten: e.target.value })}
              id="ten"
              disabled={isView ? true : false}
            ></InputText>
          </div>
        </div>

        <div className="field">
          <label>Ngày sinh</label>
          <Calendar
            value={patient.NgaySinh ? new Date(patient.NgaySinh) : ""}
            onChange={(e) =>
              // setDate(moment(e.target.value).format("YYYY-MM-DD"))
              setPatient({
                ...patient,
                NgaySinh: moment(e.target.value).format("YYYY-MM-DD"),
              })
            }
            showIcon
            disabled={isView ? true : false}
          ></Calendar>
        </div>

        <div className="same-field">
          <div className="field">
            <label htmlFor="height">Chiều cao (CM)</label>
            <InputText
              id="height"
              value={patient.ChieuCao === null ? "" : patient.ChieuCao}
              onChange={(e) =>
                setPatient({ ...patient, ChieuCao: e.target.value })
              }
              disabled={isView ? true : false}
            ></InputText>
          </div>
          <div className="field">
            <label htmlFor="weight">Cân nặng (Kg)</label>
            <InputText
              id="weight"
              value={patient.CanNang === null ? "" : patient.CanNang}
              onChange={(e) =>
                setPatient({ ...patient, CanNang: e.target.value })
              }
              disabled={isView ? true : false}
            ></InputText>
          </div>
        </div>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog
        header="Xác nhận xóa bệnh nhân"
        visible={deleteDialog}
        onHide={() => setDeleteDialog(false)}
        footer={
          <>
            <Button
              label="Đóng"
              outlined
              onClick={() => {
                setDeleteDialog(false);
              }}
            ></Button>
            <Button
              label="Xác nhận"
              severity="danger"
              outlined
              onClick={() => {
                // console.log(patient.ID);
                handleDelete(patient.ID);
              }}
            ></Button>
          </>
        }
      >
        <div>Bạn có muốn xóa dữ liệu của bệnh nhận này?</div>
      </Dialog>
    </Card>
  );
};

export default PatientPage;
