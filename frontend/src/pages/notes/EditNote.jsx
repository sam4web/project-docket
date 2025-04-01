import { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditSidebar from "@/components/sidebar/EditSidebar.jsx";
import Header from "@/components/header/Header.jsx";
import ErrorText from "@/components/common/ErrorText.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteRequest, updateNoteRecord } from "@/features/note/noteThunks.js";
import { selectNoteById } from "@/features/note/noteSlice.js";
import NotFound from "@/pages/NotFound.jsx";
import useToast from "@/hooks/useToast.js";

const EditNote = () => {
  const { id: noteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const note = useSelector((state) => selectNoteById(state, noteId));

  useEffect(() => {
    noteDispatch({ title: note?.title || "", body: note?.body || "" });
  }, [note]);

  const [noteState, noteDispatch] = useReducer(
    (state, action) => ({
      ...state,
      ...action,
    }),
    { title: "", body: "", error: "" },
  );

  const updateNote = async () => {
    try {
      showToast("message", "Updating note, Please wait...");
      await dispatch(updateNoteRecord({ ...noteState, id: noteId })).unwrap();
      showToast("success", "Note successfully updated!", 2);
      navigate(`/notes/${noteId}`);
    } catch (err) {
      showToast("error", err, 3);
      noteDispatch({ error: err });
    }
  };

  const deleteNote = async () => {
    try {
      showToast("message", "Deleting note, Please wait...");
      await dispatch(deleteNoteRequest(noteId)).unwrap();
      showToast("success", "Note successfully deleted!", 2);
      navigate("/");
    } catch (err) {
      showToast("error", err, 3);
      noteDispatch({ error: err });
    }
  };


  if (!note) return <NotFound />;

  return (
    <>
      <EditSidebar
        eraseNote={() => noteDispatch({ title: "", body: "" })}
        submitNote={updateNote}
        deleteNote={deleteNote}
      />

      <div className="main-container">
        <Header iconsOnly />
        <section className="space-y-3.5">
          {noteState.error && <ErrorText error={noteState.error} />}
          <div className="flex gap-2">
            <div
              className="w-1.5 rounded-full"
              style={{ backgroundColor: note?.color }}
            />
            <input
              className="note-title text-4xl font-medium"
              placeholder="Note title..."
              value={noteState.title}
              onChange={(e) => noteDispatch({ title: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Enter your text here..."
            className="h-[65vh] text-lg resize-none pe-4 note-message"
            value={noteState.body}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="off"
            onChange={(e) => noteDispatch({ body: e.target.value })}
          />
        </section>
      </div>
    </>
  );
};

export default EditNote;
