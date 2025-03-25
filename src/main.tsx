import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Link,
  Outlet,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import "./index.css";
// import Stopwatch from "./components/timers/Stopwatch";
import TimeLeft from "./components/timers/TimeLeft";

import { GRADUATION_DATE, CAMINO_DATE, ACDC_CONCERT_DATE, SHAKIRA_CONCERT_DATE, METALLICA_CONCERT_DATE} from './utils/helpers.ts';
//import Countdown from "./components/timers/Countdown";
//import CountdownWrapper from "./components/timers/CountdownWrapper.tsx";




//Layout Component that ensures correct rendering
const Layout = () => {
  return (
    <div className = "page_layout">
      <nav className = "navigation">
        <Link to="/">Home</Link>
        <Link to="/graduation">Graduation</Link>
        <Link to="/camino">Camino</Link>
        <Link to="/acdc_concert">AC/DC</Link>
        <Link to="/metallica_concert">Metallica</Link>
        <Link to="/shakira_concert">Shakira</Link>
        {/* <Link to="/stopwatch">Stopwatch</Link> */}
      </nav>
      <Outlet /> 
    </div>
  );
};

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    
    children: [
      // {
      //   index: true,
      //   element: <TimeLeft targetDate = { RETIREMENT_DATE } />,
      // },
      // {
      //   index: true,
      //   path: "stopwatch",
      //   element: <Stopwatch />,
      // },
      {
        path: "camino",
        element: <TimeLeft targetDate = { CAMINO_DATE } />,
      },
      {
        path: "acdc_concert",
        element: <TimeLeft targetDate = { ACDC_CONCERT_DATE } />,
      },
      {
        path: "graduation",
        element: <TimeLeft targetDate = { GRADUATION_DATE } />,
      },
      {
        path: "shakira_concert",
        element: <TimeLeft targetDate = { SHAKIRA_CONCERT_DATE } />,
      },
      {
        path: "metallica_concert",
        element: <TimeLeft targetDate = { METALLICA_CONCERT_DATE } />,
      },
    ],
  },
]);

//biome-ignore lint/style/noNonNullAssertion: root html element is there
createRoot(document.getElementById("root")!).render(
   <StrictMode>
    <RouterProvider router={router} />
   </StrictMode>
);
