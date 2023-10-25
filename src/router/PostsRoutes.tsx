import { Navigate, Route, Routes } from "react-router-dom";
import { PostPage } from "../posts/pages/postPage";

export const PostRoutes = () => {
  return (
    <Routes>
      <Route path="/post" element={<PostPage />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
