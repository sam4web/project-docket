import usePageTitle from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";
import Header from "@/components/header/Header.jsx";
import Emoji from "@/components/common/Emoji.jsx";

const NotFound = () => {
  usePageTitle("Page Not Found | Docket");
  return (
    <>
      <div className="main-container">
        <Header iconsOnly />
        <section className="max-w-md mx-auto space-y-5 sm:space-y-10 pt-16 sm:pt-20 text-center">
          <div className="space-y-3">
            <h1 className="text-8xl text-responsive font-bold">404</h1>
            <p className="text-lg">
              <span className="text-responsive font-medium">
                OOPS! Page not found{" "}
                <span className="text-xl">
                  <Emoji label={"warning"} symbol={"⚠️"} />
                </span>
              </span>
            </p>
          </div>

          <p className="text-responsive font-medium text-center">
            Sorry, the page you&apos;re looking for doesn&apos;t exist.{" "}
          </p>
          <Link to={"/"} className="inline-block">
            <button className="btn text-lg">Return Home</button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default NotFound;
