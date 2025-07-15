import { Dashboard } from "./pages/Dashboard";
import { Observations } from "./pages/Observations";

export const routes = [
  { path: "/", component: <Dashboard /> },
  { path: "/obsevaciones", component: <Observations /> },
];
