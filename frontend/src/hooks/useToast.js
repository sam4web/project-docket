import { useDispatch } from "react-redux";
import { setToast } from "@/features/toast/toastSlice.js";

const useToast = () => {
  const dispatch = useDispatch();
  const showToast = (type, message, timeout) => {
    dispatch(setToast({ type, message, timeout }));
  };
  return { showToast };
};

export default useToast;