import { validateEmail, validatePassword } from "@/utils/validateCredentials.js";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const AuthForm = ({ handleSubmit, register }) => {
  const [formData, setFormData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    setErrors({});
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    const emailValid = validateEmail(formData?.email || "");
    const passValid = validatePassword(formData?.password || "");
    if (register && !formData?.username) newErrors.username = "Username is required!";
    if (!emailValid.isValid) newErrors.email = emailValid.message;
    if (!passValid.isValid) newErrors.password = passValid.message;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && canSubmit;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    handleSubmit(formData);
  };

  const canSubmit = [formData?.email, formData?.password, register ? formData?.username : true].every(Boolean);

  return (
    <form className="space-y-5 sm:space-y-6" onSubmit={submitForm} noValidate>
      {register &&
        <div className="input-container">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="john"
            value={formData?.username || ""}
            onChange={handleChange}
            autoComplete="on"
          />
          <p className="error-message">{errors?.username}</p>
        </div>
      }

      <div className="input-container">
        <label htmlFor="email">{register ? "Email Address:" : "Enter your email"}</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="john@example.com"
          value={formData?.email || ""}
          onChange={handleChange}
          autoComplete="on"
        />
        <p className="error-message">{errors?.email}</p>
      </div>

      <div className="input-container">
        <label htmlFor="password">{register ? "Password:" : "Enter your password"}</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            onChange={handleChange}
            value={formData?.password || ""}
            autoComplete="on"
          />

          {(formData?.password || "").length > 0 && (
            <button
              type="button"
              className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <span className="text-2xl text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-100 ">
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </button>
          )}
        </div>
        <p className="error-message">{errors?.password}</p>
      </div>

      <button className="btn text-lg px-5" type="submit" disabled={!canSubmit}>
        Submit
      </button>
    </form>
  );
};

export default AuthForm;
