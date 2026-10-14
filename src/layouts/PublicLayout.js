import Navbar from "../Components/navbar";
import { Outlet } from "react-router-dom";

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default PublicLayout;