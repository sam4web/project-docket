import formatDate from "@/utils/formatDate";
import { useNavigate, useParams } from "react-router-dom";
import EditSidebar from "@/components/sidebar/EditSidebar.jsx";
import Header from "@/components/header/Header.jsx";
import { useSelector } from "react-redux";
import { selectNoteById } from "@/features/note/noteSlice.js";
import NotFound from "@/pages/NotFound.jsx";

const NoteDetail = () => {
  const navigate = useNavigate();
  const { id: noteId } = useParams();

  const note = useSelector((state) => selectNoteById(state, noteId));
  if (!note) return <NotFound />;


  return (
    <>
      <EditSidebar editNote={() => navigate(`/notes/edit/${noteId}`)} />
      <div className="main-container">
        <Header iconsOnly />
        <section className="space-y-5">
          <div className="space-y-3">
            <div className="flex gap-2">
              <div
                className="w-1.5 rounded-full"
                style={{ backgroundColor: note?.color }}
              />
              <h3 className="note-title text-4xl font-medium">{note?.title}</h3>
            </div>
            <p className="text-slate-900 dark:text-slate-200 font-medium">
              {formatDate(note?.updatedAt)}
            </p>
          </div>
          <p className="h-[65vh] text-lg resize-none pe-4 note-message whitespace-pre-line">
            {note?.body}
          </p>
        </section>
      </div>
    </>
  );
};

export default NoteDetail;
