import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Link,
  Outlet,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import "./index.css";
//import TimersView from "./views/TimersView";
import Stopwatch from "./components/timers/Stopwatch";
import Countdown from "./components/timers/Countdown";
import Tabata from "./components/timers/Tabata";
//import DocumentationView from "./views/DocumentationView";

import StopwatchImg from "./images/stopwatch_half.jpg";
import HourglassImg from "./images/hourglass_half.jpg";
import BirthdayImg from "./images/verticalcake_half.jpg";

const PageIndex = () => {
  return (
    <div className = "navigation">
      <h1>Online Timers and Stopwatch</h1>
      <ul>
        <li>
          <Link to="/watch"><img src = {StopwatchImg} alt="StopWatch"/></Link>
        </li>
        <li>
          <Link to="/retirement"><img src = {HourglassImg} alt="Retirement"/></Link>
        </li>
        <li>
          <Link to="/birthday"><img src = {BirthdayImg} alt="Birthday"/></Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

const router = createHashRouter([
  {
    path: "/",
    element: <PageIndex />,
    children: [
      {
        //index: true,
        path: "/watch",
        element: <Stopwatch />,
      },
      {
        //index: true,
        path: "/retirement",
        element: <Countdown />,
      },
      {
        path: "/birthday",
        element: <Tabata />,
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
