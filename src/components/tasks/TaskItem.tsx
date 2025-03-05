import { Link } from "react-router-dom";
import { Task } from "../../models/Task";

const TaskItem = ({ task }: {task: Task}) => {
    return (
        <div>
            <Link to={`/protected/tasks/${task.id}`}>{task.title}</Link>
            <p>{task.description}</p>
            <p>Completed: {task.completed ? "Yes" : "No"}</p>
        </div>
    )
}
export default TaskItem;
