import formatDate from "@/utils/formatDate";
import Sidebar from "@/components/sidebar/Sidebar.jsx";
import Header from "@/components/header/Header.jsx";
import Emoji from "@/components/common/Emoji.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "@/features/user/userSlice.js";
import usePageTitle from "@/hooks/usePageTitle.js";
import { sendLogoutRequest } from "@/features/user/userThunks.js";
import { useNavigate } from "react-router-dom";
import { clearAllNotes, getNotesCount } from "@/features/note/noteSlice.js";
import ErrorText from "@/components/common/ErrorText.jsx";
import { useState } from "react";
import useToast from "@/hooks/useToast.js";


const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserInfo);
  const noteCount = useSelector(getNotesCount);
  const [error, setError] = useState(null);
  const { showToast } = useToast();
  usePageTitle(`Hello, ${user?.username} | Docket`);

  const logoutUser = async () => {
    try {
      showToast("message", "Logging out, Please wait...");
      await dispatch(sendLogoutRequest()).unwrap();
      dispatch(clearAllNotes());
      showToast("success", "Successfully logged out!", 2);
      navigate("/login");
    } catch (err) {
      showToast("error", err, 3);
      setError(err);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="main-container">
        <Header iconsOnly />

        <section className="max-w-lg mx-auto space-y-6 pt-16 sm:pt-20 text-responsive text-center md:text-left text-lg">
          {error && <ErrorText error={error} />}
          <h2 className="text-3xl md:text-4xl font-medium text-responsive text-left">
            Hello {user.username} <Emoji label={"wave"} symbol={"👋"} />
          </h2>
          <div className="bg-slate-100 dark:bg-slate-700 px-5 py-3.5 rounded-md space-y-2.5 shadow-sm">
            <div className="flex-between">
              <p className="font-medium">Email</p>
              <p>{user.email}</p>
            </div>
            <div className="flex-between">
              <p className="font-medium">Joined On</p>
              <p>{formatDate(user.createdAt)}</p>
            </div>
            <div className="flex-between">
              <p className="font-medium">Notes Created</p>
              <p>
                {noteCount}
              </p>
            </div>
          </div>

          <div className="flex-center gap-5">
            <button onClick={logoutUser} className="btn text-lg px-5 py-2.5 w-full">
              Logout
            </button>
            <button onClick={() => navigate("/delete-user")} className="error-btn text-lg px-5 py-2.5 w-full">
              Delete
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
