import usePageTitle from "@/hooks/usePageTitle";
import { useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditSidebar from "@/components/sidebar/EditSidebar.jsx";
import Header from "@/components/header/Header.jsx";
import { useDispatch } from "react-redux";
import { createNoteEntry } from "@/features/note/noteThunks.js";
import ErrorText from "@/components/common/ErrorText.jsx";
import useToast from "@/hooks/useToast.js";

const CreateNote = () => {
  usePageTitle("Add a Note | Docket");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { showToast } = useToast();

  const [noteState, noteDispatch] = useReducer(
    (state, action) => ({
      ...state,
      ...action,
    }),
    {
      title: state?.title || "",
      body: "",
      error: "",
      color: state?.color || "#8d99ae",
    },
  );

  const handleSubmit = async () => {
    try {
      showToast("message", "Creating note, Please wait...");
      const data = await dispatch(createNoteEntry(noteState)).unwrap();
      navigate(`/notes/${data._id}`);
      showToast("success", "Note successfully created!", 2);
    } catch (err) {
      showToast("error", err, 3);
      noteDispatch({ error: err });
    }
  };


  return (
    <>
      <EditSidebar
        eraseNote={() => noteDispatch({ title: "", body: "" })}
        submitNote={handleSubmit}
      />
      <div className="main-container">
        <Header iconsOnly />
        <section className="space-y-3.5">
          {noteState.error && <ErrorText error={noteState.error} />}
          <div className="flex gap-2">
            <div
              className="w-1.5 rounded-full"
              style={{ backgroundColor: noteState.color }}
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
            className="min-h-[65vh] text-lg resize-none pe-4 note-message"
            value={noteState.body}
            onChange={(e) => noteDispatch({ body: e.target.value })}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="off"
          />
        </section>
      </div>
    </>
  );
};

export default CreateNote;
