import { Task } from "../../models/Task";

const TaskDetail: React.FC<{task:Task|undefined}> = ({task}) => {
    return (
        <div>
            <h1>Task Detail</h1>
            <p>{task?.title}</p>
            <p>{task?.description}</p>
            <p>Completed: {task?.completed ? "Yes" : "No"}</p>
        </div>)
};

export default TaskDetail;