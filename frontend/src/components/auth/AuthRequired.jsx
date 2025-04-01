import { useSelector } from "react-redux";
import { selectCurrentToken, selectUserInfo } from "@/features/user/userSlice.js";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useToast from "@/hooks/useToast.js";

const AuthRequired = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectUserInfo);
  const location = useLocation();
  const { showToast } = useToast();

  if (!token && !user) {
    showToast("error", "Please login before accessing this page.", 3);
    return (
      <Navigate
        to={"/login"}
        replace={true}
        state={{ redirect: location.pathname, error: "Unauthorized" }}
      />);
  }

  return <Outlet />;
};

export default AuthRequired;