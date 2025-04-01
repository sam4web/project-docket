import usePageTitle from "@/hooks/usePageTitle.js";
import Header from "@/components/header/Header.jsx";
import ErrorText from "@/components/common/ErrorText.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendDeleteUserRequest } from "@/features/user/userThunks.js";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { validatePassword } from "@/utils/validateCredentials.js";
import { clearAllNotes } from "@/features/note/noteSlice.js";
import useToast from "@/hooks/useToast.js";

const DeleteUser = () => {
  usePageTitle("Delete Account Confirmation | Docket");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setError(null);
    setInputError(null);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passValid = validatePassword(password || "");
    if (!passValid.isValid) {
      setInputError(passValid.message);
      return;
    }
    try {
      showToast("message", "Deleting user, Please wait...");
      await dispatch(sendDeleteUserRequest(password)).unwrap();
      dispatch(clearAllNotes());
      showToast("success", "User successfully deleted!", 2);
      navigate("/login");
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
            <h1 className="text-4xl text-responsive font-semibold">Confirm Account Deletion</h1>
            <p className="text-lg error-message">
              Are you sure you want to delete your account?
              This action is permanent, and all your notes will be lost.
            </p>
            {error && <ErrorText error={error} />}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="input-container">
              <label htmlFor="password">Enter your password: </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="on"
                />

                {(password || "").length > 0 && (
                  <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                  <span
                    className="text-2xl text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-100 ">
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                  </button>
                )}
              </div>
              <p className="error-message">{inputError}</p>
            </div>

            <button className="btn text-lg px-5" type="submit" disabled={!password.length}>
              Submit
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default DeleteUser;