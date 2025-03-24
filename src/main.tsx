import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Link,
  Outlet,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import "./index.css";
import Stopwatch from "./components/timers/Stopwatch";
import TimeLeft from "./components/timers/TimeLeft";

import { RETIREMENT_DATE, BIRTHDATE} from './utils/helpers.ts';
//import Countdown from "./components/timers/Countdown";
import CountdownWrapper from "./components/timers/CountdownWrapper.tsx";
import Tabata from "./components/timers/Tabata";
import XY from "./components/timers/XY.tsx";

// import StopwatchImg from "./images/stopwatch_half.jpg";
// import HourglassImg from "./images/hourglass_half.jpg";
// import BirthdayImg from "./images/verticalcake_half.jpg";
// import RetirementImg from "./images/retirementTimer_half.jpg";
// import TabataImg from "./images/tabata_half.jpg";
// import XYImg from "./images/xyworkout.jpg";

const PageIndex = () => {
  return (
    <div className = "navigation">
{/*       <h1>Countdown Timer</h1>
      <h3>(Select a timer to get started)</h3> */}
      <ul>
{/*         <li>
          <Link to="/watch"><img src = {StopwatchImg} alt="StopWatch"/></Link>
        </li> */}
{/*         <li>
          <Link to="/countdown"><img src = {HourglassImg} alt="Countdown"/></Link>
        </li> */}
{/*         <li>
          <Link to="/birthday"><img src = {BirthdayImg} alt="Birthday"/></Link>
        </li> */}
{/*          <li>
          <Link to="/retirement"><img src = {RetirementImg} alt="Retirement"/></Link>
        </li> */}
{/*         <li>
          <Link to="/tabata"><img src = {TabataImg} alt="Tabata"/></Link>
        </li>  */}
{/*         <li>
          <Link to="/xy"><img src = {XYImg} alt="XY"/></Link>
        </li> */}
      </ul>
      <Outlet />
    </div>
  );
};

const router = createHashRouter([
  {
    path: "/",
    element: <PageIndex />,
    element: <TimeLeft targetDate = { RETIREMENT_DATE } />, 
    element: <Stopwatch />,
    children: [
      {
        //index: true,
        path: "/about",
        element: <Stopwatch />,
      },
      {
        //index: true,
        path: "/countdown",
        element: <CountdownWrapper />,
      },
      {
        path: "/birthday",
        element: <TimeLeft targetDate = { BIRTHDATE } />,
      },
      {
        path: "/retirement",
        element: <TimeLeft targetDate = { RETIREMENT_DATE } />,
      },
      {
        path: "/tabata",
        element: <Tabata />,
      },
      {
        path: "/xy",
        element: <XY />,
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
