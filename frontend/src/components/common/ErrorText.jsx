import Emoji from "@/components/common/Emoji.jsx";

const ErrorText = ({ error }) => {
  return (
    <p className="text-lg space-x-1">
      <span className="error-message">
        {typeof error === "string" ? error : "Something went wrong please try again."}
      </span>
      <span className="text-xl">
          <Emoji label={"warning"} symbol={"⚠️"} />
      </span>
    </p>
  );
};

export default ErrorText;