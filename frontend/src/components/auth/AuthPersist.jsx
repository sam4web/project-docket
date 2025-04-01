import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshAuthToken } from "@/features/user/userThunks.js";
import { useEffect, useState } from "react";
import Spinner from "@/components/common/Spinner.jsx";
import { fetchNotesQuery } from "@/features/note/noteThunks.js";
import useToast from "@/hooks/useToast.js";
import { hideToast } from "@/features/toast/toastSlice.js";

const AuthPersist = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [success, setSuccess] = useState(false);

  const refreshAuthTokenAndFetchData = async () => {
    try {
      showToast("message", "Fetching data... Please wait...", 1000);
      await dispatch(refreshAuthToken()).unwrap();
      await dispatch(fetchNotesQuery()).unwrap();
      dispatch(hideToast());
    } catch (err) {
    } finally {
      setSuccess(true);
    }
  };

  useEffect(() => {
    refreshAuthTokenAndFetchData();
  }, []);

  if (!success) return (
    <section className="main-container">
      <div className="flex-center pt-20">
        <Spinner />
      </div>
    </section>
  );

  return <Outlet />;
};

export default AuthPersist;