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
import "./style.css";
//
import { useEffect, useState } from "react";
import { PatientApi } from "../../services/Patient";
import moment from "moment";
import { InputText } from "primereact/inputtext";

const PatientPage = () => {
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
  const [data, setData] = useState([]);
  const [patients, setPatients] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [patient, setPatient] = useState(initialPatient);
  const [isView, setIsView] = useState(true);
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
      const response = await PatientApi.deletePatient(id);

      if (response) {
        toast.success("Xóa dữ liệu bệnh nhân thành công");
        setPatients(patients.filter((p) => p.ID !== id));
      }
    } catch (err) {
      toast.error("Xóa dữ liệu bệnh nhân thất bại");
      throw err;
    }
  };
  const handleCreate = async (patient) => {
    try {
      const response = await PatientApi.createNewPatient(patient);

      if (response) {
        toast.success("Thêm bệnh nhân mới thành công");
        setPatients([patient, ...patients]);
      }
    } catch (err) {
      toast.error("Thêm thất bại");
      console.log(err);
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
          severity="danger"
          icon="pi pi-trash"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          tooltip="Xóa thông tin bệnh nhân"
          tooltipOptions={{ position: "top" }}
          onClick={() => handleDelete(rowData.ID)}
        ></Button>
        <Button
          severity="help"
          icon="pi pi-eye"
          tooltip="Xem thông tin bệnh nhân"
          tooltipOptions={{ position: "top" }}
          onClick={() => {
            setDialog(true), setPatient(rowData);
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
            setDialog(true), setIsView(false), setPatient(initialPatient);
          }}
        ></Button>
        <Button label="Xóa bệnh nhân" severity="danger" disabled></Button>
      </>
    );
  };
  const customFooter = () => {
    return (
      <>
        <Button outlined label="Đóng" onClick={() => setDialog(false)}></Button>
        {!isView && (
          <Button
            label="Xác nhận thêm"
            onClick={() => {
              console.log(patient), handleCreate(patient);
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
      <Dialog
        header="Thêm bệnh nhân"
        style={{ width: "600px", height: "500px" }}
        visible={dialog}
        onHide={() => setDialog(false)}
        footer={customFooter}
      >
        <div className="same-field">
          <div className="field">
            <label htmlFor="sex">Giới tính</label>
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
              value={patient.BHYT}
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
          <label htmlFor="bdate">Ngày sinh</label>
          <Calendar
            value={patient.NgaySinh ? new Date(patient.NgaySinh) : null}
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
              value={patient.ChieuCao}
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
              value={patient.CanNang}
              onChange={(e) =>
                setPatient({ ...patient, CanNang: e.target.value })
              }
              disabled={isView ? true : false}
            ></InputText>
          </div>
        </div>
      </Dialog>
    </Card>
  );
};

export default PatientPage;
