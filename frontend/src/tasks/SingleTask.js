import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SingleTask() {
  const { id } = useParams(); // pulls task ID from URL

  const [data, setData] = useState({});

  async function handleLink() {
    try {
      const res = await axios.get(`http://localhost:4040/api/tasks/${id}`, {
        withCredentials: true,
      });

      setData({ ...res.data });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleLink();
  }, []);
  return (
    <>
      <h1>{data.title}</h1>
      <i>{data.due_by}</i>
      <p>{data.description}</p>
      <p>
        Status:{data.status} , priority:{data.priority}
      </p>

      <Link to={"/tasks"}>Back to Tasks</Link>
    </>
  );
}
