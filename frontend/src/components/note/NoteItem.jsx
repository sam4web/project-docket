import { Link, useNavigate } from "react-router-dom";
import formatDate from "@/utils/formatDate.js";
import { LuPencil } from "react-icons/lu";
import { useSelector } from "react-redux";
import { selectNoteById } from "@/features/note/noteSlice.js";

const NoteItem = ({ noteId }) => {
  const navigate = useNavigate();

  const note = useSelector((state) => selectNoteById(state, noteId));

  const formatBody = (body) => {
    const maxLength = 200;
    if (body.length < maxLength) return body;
    return body.slice(0, maxLength) + "...";
  };


  return (
    <div
      className="size-full min-h-64 rounded-md shadow-md"
      style={{ backgroundColor: note.color }}
    >
      <div className="font-medium flex flex-col justify-between h-full p-5">
        <Link className="space-y-1.5" to={`/notes/${note._id}`}>
          <h4 className="text-xl text-dark">{note.title}</h4>
          {note?.body &&
            <p className="text-slate-900 whitespace-pre-line">
              {formatBody(note?.body || "")}
            </p>
          }
        </Link>
        <div className="flex-between">
          <p className="text-slate-900">
            {formatDate(note.updatedAt)}
          </p>
          <button
            className="sidebar-btn border-0 text-base p-2 dark:bg-light dark:text-dark dark:bg-opacity-85"
            onClick={() => navigate(`notes/edit/${note._id}`)}
          >
            <LuPencil />
          </button>
        </div>
      </div>
    </div>
  );
};


export default NoteItem;