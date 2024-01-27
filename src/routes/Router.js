import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const Services = lazy(() => import("../views/ui/Services.js"));
const Industries = lazy(() => import("../views/ui/Industries.js"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Products = lazy(() => import("../views/ui/Products"));
const Team = lazy(() => import("../views/ui/Team.js"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Messages = lazy(() => import("../views/ui/Messages.js"));
const OurClintes = lazy(() => import("../views/ui/OurClintes.js"));
const Login = lazy(() => import("../views/ui/Login"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/services", exact: true, element: <Services /> },
      { path: "/industries", exact: true, element: <Industries /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/products", exact: true, element: <Products /> },
      { path: "/team", exact: true, element: <Team /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/ourClintes", exact: true, element: <OurClintes /> },
      { path: "/messages", exact: true, element: <Messages /> },
    ],
  },
  { path: "/login", exact: true, element: <Login /> }
];

export default ThemeRoutes;
