import React, { useEffect, useState } from 'react';
import { useTask } from '../../contexts/TaskContext';
import { Task } from '../../models/Task';
import { useParams, useNavigate, Link } from 'react-router-dom';

const TaskDetail: React.FC = () => {
    const { deleteTask, getTask, updateTask } = useTask();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            if (id) {
                const taskToEdit = await getTask(id);
                if (taskToEdit) {
                    setTask(taskToEdit);
                } else {
                    setError(`Task with id ${id} not found`);
                }
            }
        };
        fetchTask();
    }, [id, getTask]);

    if (!task && !error) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleDelete = async () => {
        if (task) {
            await deleteTask(task.id);
        }
        navigate('/protected/dashboard');
    };

    const handleComplete = async () => {
        if (task) {
            await updateTask({
                ...task,
                completed: !task.completed,
                updatedAt: new Date(),
            });
            const fetchedTask = await getTask(task.id);
            if(fetchedTask) {
                setTask(fetchedTask);
            }
        }
    };

    return (
        <div className="task-detail">
            <h2>Task Detail</h2>
            {task && (
                <>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Due Date: {task.dueDate?.toLocaleDateString()}</p>
                    <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
                    <Link to={`/protected/tasks/edit/${task.id}`}>Edit</Link>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleComplete}>{task.completed ? "Mark Incomplete" : "Mark Complete"}</button>
                </>
            )}
        </div>
    );
};

export default TaskDetail;
