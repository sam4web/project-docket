import { Outlet } from "react-router-dom";
import Toast from "@/components/common/Toast.jsx";
import { useSelector } from "react-redux";
import { selectShowToast } from "@/features/toast/toastSlice.js";

const BaseLayout = () => {
  const showToast = useSelector(selectShowToast);

  return (
    <>
      <main className="size-full min-h-screen dark:bg-slate-900 bg-slate-200 flex-center sm:p-5">
        <div className="w-screen h-screen sm:w-[94vw] sm:h-[96vh] lg:h-[92vh]">
          <div
            className="size-full dark:bg-dark bg-white sm:shadow-sm flex sm:rounded-2xl flex-col-reverse sm:flex-row relative"
          >
            {showToast && <Toast />}
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default BaseLayout;
