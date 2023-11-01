import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { UsuarioDTO } from "../interfaces/interfaces";
import { HomePage } from "../homePage/homePage";

export const Super5Routes = () => {
  const { role } = useAppSelector((state) => state.auth);

  return (
    <>
      <Routes>
        {role === null && (
          <Route
            path="/*"
            element={<HomePage />}
          />
        )}
        {(role === "Usuario" ||
          role === "") && (
          <Route path="*" element={<HomePage />} />
        )}
        {role === "" && (
          <>
            <Route path="sucursal/*" element={<DashboardSucursalesPage />} />
            <Route path="*" element={<Navigate to="sucursal" />} />
          </>
        )}
        {tipoUsuario === TipoUsuario.Administrador && (
          <>
            <Route
              path="administrador/*"
              element={<DashboardAdministradores />}
            />
            <Route path="*" element={<Navigate to="administrador" />} />
          </>
        )}
      </Routes>
    </>
  );
};
