import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import BaseLayout from "@/layouts/BaseLayout.jsx";
import Home from "@/pages/Home.jsx";
import NotFound from "@/pages/NotFound.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import CreateNote from "@/pages/notes/CreateNote.jsx";
import EditNote from "@/pages/notes/EditNote.jsx";
import NoteDetail from "@/pages/notes/NoteDetail.jsx";
import Profile from "@/pages/Profile.jsx";
import DeleteUser from "@/pages/DeleteUser.jsx";
import AuthRequired from "@/components/auth/AuthRequired.jsx";
import AuthPersist from "@/components/auth/AuthPersist.jsx";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path={"/"} element={<BaseLayout />}>
      {/* login persistence and prefetch */}
      <Route element={<AuthPersist />}>
        <Route index element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        {/* protected routes */}
        <Route element={<AuthRequired />}>
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/delete-user"} element={<DeleteUser />} />
          <Route path={"/notes"}>
            <Route index element={<Home />} />
            <Route path={":id"} element={<NoteDetail />} />
            <Route path={"create"} element={<CreateNote />} />
            <Route path={"edit/:id"} element={<EditNote />} />
          </Route>
        </Route>
      </Route>
      <Route path={"*"} element={<NotFound />} />
    </Route>
  </>,
));

export default router;