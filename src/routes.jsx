import { Dashboard } from "./pages/Dashboard";
import { Observations } from "./pages/Observations";
import { PlatformLogs } from "./pages/PlatformLogs";

export const routes = [
  { path: "/", component: <Dashboard /> },
  { path: "/obsevaciones", component: <Observations /> },
  { path: "/logs-detallados/:platformId", component: <PlatformLogs /> },
];
