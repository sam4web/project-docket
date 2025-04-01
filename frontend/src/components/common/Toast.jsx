import { useDispatch, useSelector } from "react-redux";
import {
  hideToast,
  selectMessage,
  selectShowToast,
  selectTimeout,
  selectToastColor,
  selectType,
} from "@/features/toast/toastSlice.js";
import { useEffect } from "react";
import { FaCheck, FaInfo, FaX } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const getTypeIcon = (type) => {

  switch (type) {
    case "error":
      return <FaX />;
    case "success":
      return <FaCheck />;
    default:
      return <FaInfo />;
  }
};

const Toast = () => {
  const showToast = useSelector(selectShowToast);
  const type = useSelector(selectType);
  const toastColor = useSelector(selectToastColor);
  const message = useSelector(selectMessage);
  const timeout = useSelector(selectTimeout);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(hideToast());
    }, timeout * 1000);
    return () => clearInterval(timer);
  }, [dispatch, showToast, timeout]);

  if (!showToast) return;

  return (
    <section
      className="absolute rounded-md shadow-sm bottom-4 left-1/2 -translate-x-1/2 max-w-sm w-full overflow-hidden bg-slate-100 dark:bg-slate-700"
    >
      <div
        className="h-full w-2 absolute top-0 left-0"
        style={{ backgroundColor: toastColor }}
      />

      <div className="py-3 flex items-center">
        <div
          className="ml-4 mr-3.5 text-light bg-black text-xl p-1.5 rounded-full"
          style={{ backgroundColor: toastColor }}
        >
          {getTypeIcon(type)}
        </div>

        <div className="text-responsive">
          <h4 className="text-lg font-medium capitalize">{type}</h4>
          <p className="text-base opacity-95">{message}</p>
        </div>
      </div>

      <button
        className="text-xl text-responsive absolute top-2 right-2"
        onClick={() => dispatch(hideToast())}
      >
        <RxCross2 />
      </button>
    </section>
  );
};

export default Toast;