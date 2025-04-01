import usePageTitle from "@/hooks/usePageTitle";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/header/Header.jsx";
import Emoji from "@/components/common/Emoji.jsx";
import AuthForm from "@/components/auth/AuthForm.jsx";
import ErrorText from "@/components/common/ErrorText.jsx";
import { sendLoginRequest } from "@/features/user/userThunks.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectCurrentToken } from "@/features/user/userSlice.js";
import { fetchNotesQuery } from "@/features/note/noteThunks.js";
import useToast from "@/hooks/useToast.js";

const Login = () => {
  // clear the state when page loads
  window.history.replaceState({}, "");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { state } = useLocation();
  const [error, setError] = useState(null);
  const token = useSelector(selectCurrentToken);
  usePageTitle(`${state?.error || "Welcome Back"} | Docket`);

  useEffect(() => {
    if (state?.error) setError(state.error);
  }, [state]);

  if (token)
    return <Navigate to={"/"} replace={true} />;

  const loginUser = async (credentials) => {
    try {
      showToast("message", "Logging in, Please wait...");
      await dispatch(sendLoginRequest(credentials)).unwrap();
      await dispatch(fetchNotesQuery()).unwrap();
      showToast("success", "Successfully logged in!", 2);
      navigate(state?.redirect || "/", { replace: true });
    } catch (err) {
      showToast("error", err, 3);
      setError(err);
    }
  };


  return (
    <>
      <div className="main-container">
        <Header iconsOnly />
        <section className="max-w-md mx-auto space-y-5 sm:space-y-7 pt-16 sm:pt-20">
          <div className="space-y-3">
            <h1 className="text-4xl text-responsive font-semibold">Login</h1>
            {error ? <ErrorText error={error} /> :
              <p className="text-lg">
                <span className="text-responsive font-medium">
                  Hi, Welcome back
                </span>
                <span className="text-xl">
                  <Emoji label={"wave"} symbol={"👋"} />
              </span>
              </p>
            }
          </div>

          <AuthForm handleSubmit={loginUser} />

          <p className="text-responsive font-medium text-center">
            Not registered yet?{" "}
            <Link to={"/register"} className="font-semibold underline">
              Create an account
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
};

export default Login;
