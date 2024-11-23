import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div>
      <p>Default Layout</p>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
