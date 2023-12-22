import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DefaultLayout from "./pages/DefaultLayout";
import ManageTrainer from "./pages/ManageTrainer";
import ManageUser from "./pages/ManageUser";
import ManageTsx from "./pages/ManageTsx";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/Dashboard",
    element: <DefaultLayout />,
    children: [
      {
        path: "ManageTrainer",
        element: <ManageTrainer />,
      },
      {
        path: "ManageUser",
        element: <ManageUser />,
      },
      {
        path: "ManageTsx",
        element: <ManageTsx />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginPage />,
    index: true,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
