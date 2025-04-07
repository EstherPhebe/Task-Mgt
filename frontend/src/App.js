import { createBrowserRouter, RouterProvider } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Root from "./routes/root";
import Tasks from "./tasks/Tasks";
import Login from "./auth/Login";
import Register from "./auth/Register";

import ErrorPage from "./routes/ErrorPage";
import SingleTask from "./tasks/SingleTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/tasks/:id",
    element: <SingleTask />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <Login />
      <Tasks />
      <Register /> */}
    </>
  );
}

export default App;
