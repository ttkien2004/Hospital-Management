import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";

import { useState } from "react";

const EmpPage = () => {
  const [data, setData] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // Các hàm dùng cho CRUD
  const handleDelete = async () => {};
  const handleCreate = async () => {};
  const handleUpdate = async () => {};

  const dataSource = [
    {
      email: "alo",
      fname: "alo",
      lname: "alo",
      Bdate: "alo",
      sex: "f",
      sdt: "0000000000",
      role: "Bác sĩ",
    },
  ];
  const columns = [
    { field: "email", header: "Email" },
    { field: "fname", header: "Họ" },
    { field: "lname", header: "Tên" },
    { field: "Bdate", header: "Ngày sinh" },
    { field: "sex", header: "Giới tính" },
    { field: "sdt", header: "Số điện thoại" },
    { field: "role", header: "Vai trò" },
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
        <Button
          severity="secondary"
          icon="pi pi-user-edit"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          tooltip="Cập nhật thông tin nhân viên"
          tooltipOptions={{ position: "top" }}
          onClick={() => {
            setVisible(true), setIsUpdate(true), setIsView(false);
          }}
        ></Button>
        <Button
          severity="info"
          icon="pi pi-eye"
          tooltip="Xem thông tin nhân viên"
          tooltipOptions={{ position: "top" }}
          onClick={() => {
            setIsView(true), setVisible(true);
          }}
        ></Button>
      </>
    );
  };

  const startContent = () => {
    return (
      <>
        <Button
          label="Thêm nhân viên"
          severity="success"
          style={{ marginRight: "20px" }}
          onClick={() => {
            setVisible(!visible), setIsUpdate(false), setIsView(false);
          }}
        ></Button>
        <Button
          label="Xóa nhân viên"
          severity="danger"
          disabled={selectedEmployees.length === 0 ? true : false}
          onClick={() => {
            setDeleteDialog(true);
          }}
        ></Button>
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
        value={dataSource}
        selection={selectedEmployees}
        onSelectionChange={(e) => setSelectedEmployees(e.value)}
        tableStyle={{ minWidth: "60rem" }}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 20, 30]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "4rem" }}
        ></Column>
        {dynamicColumns}
        <Column
          header="Thao tác"
          headerStyle={{ minWidth: "12rem" }}
          alignHeader={"center"}
          align={"center"}
          body={actionTemplate}
        ></Column>
      </DataTable>

      {/* Dialog thêm, xem thông tin user */}
      <Dialog
        header={
          isView
            ? "Xem thông tin người dùng"
            : isUpdate
            ? "Cập nhật thông tin người dùng"
            : "Thêm người dùng mới"
        }
        visible={visible}
        onHide={() => setVisible(false)}
        footer={() => (
          <>
            <Button
              label="Đóng"
              outlined
              onClick={() => {
                setVisible(false);
              }}
            ></Button>
            {!isView && (
              <Button
                label="Xác nhận"
                onClick={() => {
                  if (isUpdate) {
                    // Viết hàm handleUpdate để cập nhật thông tin user
                  } else {
                    // Viết hàm handleCreate để tạo thêm user
                  }
                  console.log(patient);
                }}
              ></Button>
            )}
          </>
        )}
      ></Dialog>

      {/* Dialog xác nhận xóa user */}
      <Dialog
        visible={deleteDialog}
        onHide={() => setDeleteDialog(false)}
        header="Xác nhận xóa tài khoản người dùng"
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
                //Viết hàm handleDelete để xóa user
              }}
            ></Button>
          </>
        )}
      >
        <div>Bạn có muốn xóa thông tin người dùng này?</div>
      </Dialog>
    </Card>
  );
};

export default EmpPage;
