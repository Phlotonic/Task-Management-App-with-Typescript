import { Task } from "../../models/Task";
import { useParams } from "react-router-dom";
import { useTask } from "../../contexts/TaskContext";


const TaskDetail: React.FC = () => {
const { id } = useParams<{ id?: string }>();
const { tasks } = useTask();
const task = tasks.find((task) => task.id === id);

console.log("task",id)

if (!task) {
    return <div>Task not found</div>;
}


    return (
        <div>
            <h1>Task Detail</h1>
            <p>{task?.title}</p>
            <p>{task?.description}</p>
            <p>Completed: {task?.completed ? "Yes" : "No"}</p>
        </div>)
};

export default TaskDetail;