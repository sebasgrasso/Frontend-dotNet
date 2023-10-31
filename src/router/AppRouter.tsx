import { Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { HomePage } from "../homePage/homePage";
import { PostPage } from "../posts/pages/postPage";

export const AppRouter = () => {
/*   const { status, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [startGoogleLogin, { isLoading }] = useLoginGoogleMutation();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) {
        return;
      }
      const { displayName, email, photoURL, uid, phoneNumber } = user;
      const nombreCompleto = displayName?.split(" ");
      const nombre = nombreCompleto ? nombreCompleto[0] : "";
      const apellido = nombreCompleto ? nombreCompleto[1] : "";
      if (token) {
        dispatch(
          login({
            nombre,
            apellido,
            email: email,
            imageUrl: photoURL,
            uid: uid,
            token,
            googleUser: true,
            telefono: phoneNumber || null,
            sucursal: -1,
            tipoUsuario: TipoUsuario.Comprador,
          })
        );
        return;
      }
      if (!email || !displayName) return;
      startGoogleLogin({
        correo: email,
        googleId: uid,
        nombre: displayName,
      })
        .unwrap()
        .then((resp) => {
          dispatch(
            login({
              nombre,
              apellido,
              email: email,
              imageUrl: photoURL,
              uid: uid,
              token: resp,
              googleUser: true,
              telefono: null,
              sucursal: -1,
              tipoUsuario: TipoUsuario.Comprador,
            })
          );
          setToken(resp);
        })
        .catch(console.log);
    });
  }, []); */
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/*" element={<HomePage/>} />
        <Route path="post/:id" element={<PostPage/>} />
        <Route path="*" element={<Navigate to="/*" />} />
      </Routes>
    </>
  );
};
