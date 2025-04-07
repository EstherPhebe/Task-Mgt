import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <h1>Welcome to Task Manager</h1>
      <div>
        <p>Have an account?</p>
        <Link to={"/login"}>Login</Link>
      </div>
      <div>
        <p>New to Task Manager?</p>
        <Link to={"/register"}>Register</Link>
      </div>
    </>
  );
}
