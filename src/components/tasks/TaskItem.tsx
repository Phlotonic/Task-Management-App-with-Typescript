import { Link, useNavigate } from "react-router-dom";
import { Task } from "../../models/Task";
import { useTask } from "../../contexts/TaskContext";


const TaskItem = ({ task }: {task: Task}) => {
    const { deleteTask } = useTask();
    const navigate = useNavigate();
    
    return (
        <div>
            {/* <Link to={`/protected/tasks/edit/${task.id}`}>{task.title}</Link> */}
            <p>{task.description}</p>
            {/* <Link to={`/protected/tasks/${task.id}`}>Details</Link> */}
            <button onClick= {() => navigate(`/protected/tasks/details/${task.id}`)}>Details</button>
            <p>Completed: {task.completed ? "Yes" : "No"}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
    )
}
export default TaskItem;