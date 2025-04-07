import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Tasks() {
  const [task, setTask] = useState([]);
  async function getTask() {
    try {
      const res = await axios.get(`http://localhost:4040/api/tasks`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setTask(res.data);
        console.log(task);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTask();
  }, []);

  return (
    <>
      <h2>Tasks</h2>
      {task.length === 0 ? (
        <h3>No tasks available </h3>
      ) : (
        task.map((t) => (
          <ul key={t.id}>
            <li>
              <Link to={`/tasks/${t.id}`}>{t.title}</Link> - {t.description} -{" "}
              {t.due_by}
              {/* <a href={t.id}>{t.title}</a> - {t.description} - {t.due_by} */}
            </li>
          </ul>
        ))
      )}
    </>
  );
}

export default Tasks;
