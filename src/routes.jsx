import { CompaniesCrud } from "./pages/admin/companies/CompaniesCrud";
import { PlatformsCrud } from "./pages/admin/platforms/PlatformsCrud";
import { UserCrud } from "./pages/admin/users/UsersCrud";
import { Administration } from "./pages/Administration";
import { Login } from "./pages/auth/Login";
import { Dashboard } from "./pages/Dashboard";
import { Observations } from "./pages/Observations";
import { PlatformLogs } from "./pages/PlatformLogs";

export const routes = [
  { path: "/", component: <Dashboard /> },
  { path: "/obsevaciones", component: <Observations /> },
  { path: "/administracion", component: <Administration /> },

  { path: "/logs-detallados/:platformId", component: <PlatformLogs /> },

  { path: "/login", component: <Login /> },
  
  { path: "/admin/empresas", component: <CompaniesCrud /> },
  { path: "/admin/andenes", component: <PlatformsCrud /> },
  { path: "/admin/usuarios", component: <UserCrud /> },
];
