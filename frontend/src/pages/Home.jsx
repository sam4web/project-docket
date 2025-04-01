import Header from "@/components/header/Header.jsx";
import Sidebar from "@/components/sidebar/Sidebar.jsx";
import usePageTitle from "@/hooks/usePageTitle.js";
import NoteList from "@/components/note/NoteList.jsx";

const Home = () => {
  usePageTitle("Docket | Your Notes, Organized");
  
  return <>
    <Sidebar />
    <div className="main-container">
      <Header />
      <NoteList />
    </div>
  </>;
};

export default Home;