import { BsFillMoonFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import useTheme from "@/hooks/useTheme.js";

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <button className="btn" onClick={toggleTheme}>
      <span className="dark:hidden block">
        <FiSun />
      </span>
      <span className="dark:block hidden">
        <BsFillMoonFill />
      </span>
    </button>
  );
};

export default ThemeToggle;
