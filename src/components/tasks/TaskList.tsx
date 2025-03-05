import { Task } from "../../models/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <ul className="task-list">
            {tasks.length === 0 ? (
                <div>No tasks found</div>
            ) : (
                tasks.map((task) => (
                    <li className="task-item" key={task.id}>
                        <TaskItem task={task}/>
                    </li>
                ))
            )}
        </ul>
    );
}

export default TaskList;
