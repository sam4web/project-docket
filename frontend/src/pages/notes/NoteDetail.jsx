import formatDate from "@/utils/formatDate";
import { useNavigate, useParams } from "react-router-dom";
import EditSidebar from "@/components/sidebar/EditSidebar.jsx";
import Header from "@/components/header/Header.jsx";
import { useDispatch } from "react-redux";
import NotFound from "@/pages/NotFound.jsx";
import { useEffect, useState } from "react";
import { fetchSingleNoteQuery } from "@/features/note/noteThunks";
import useToast from "@/hooks/useToast";
import { hideToast } from "@/features/toast/toastSlice";
import Spinner from "@/components/common/Spinner";

const NoteDetail = () => {
  const navigate = useNavigate();
  const { id: noteId } = useParams();
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        showToast("message", "Fetching note, Please wait...");
        const data = await dispatch(fetchSingleNoteQuery(noteId)).unwrap();
        setNote(data);
        dispatch(hideToast());
      } catch (err) {
        setError(err);
        showToast("error", err, 3);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, []);

  if (loading)
    return (
      <section className="size-full flex-center pt-20">
        <Spinner />
      </section>
    );

  if (error && !note) return <NotFound />;

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
