import React, { useEffect, useState } from 'react';
import { useTask } from '../../contexts/TaskContext';
import { Task } from '../../models/Task';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetail: React.FC = () => {
    const { getTask, updateTask, deleteTask } = useTask();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | null>(null);
    const [editing, setEditing] = useState(false);
    const [editedTask, setEditedTask] = useState<Task | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            if (id) {
                try {
                    const fetchedTask = await getTask(id);
                    if (fetchedTask) {
                        setTask(fetchedTask);
                        setEditedTask({...fetchedTask});
                    } else {
                        setError(`Task with id ${id} not found`);
                    }
                } catch (err) {
                    setError('Error fetching task');
                }
            }
        };
        fetchTask();
    }, [id, getTask]);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        if (editedTask) {
            try {
                await updateTask({
                    ...editedTask,
                    id: task?.id || '',
                    updatedAt: new Date()
                });
                setEditing(false);
            } catch (err) {
                setError('Error saving task');
            }
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setEditedTask(task ? { ...task } : null);
    };

    const handleDelete = async () => {
        if (task) {
            await deleteTask(task.id);
        }
        navigate('/protected/dashboard');
    };

    const handleComplete = async () => {
        if (task) {
            try {
              const updatedTask = { ...task, completed: !task.completed, updatedAt: new Date() };
              await updateTask({
                ...updatedTask,
                id: task.id,
              });
              setTask(updatedTask);
              setEditedTask({
                ...updatedTask
              });
            } catch (err) {
              setError('Error updating task completion');
            }
        }
    };

    if (!task && !error) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="task-detail">
            <h2>Task Detail</h2>
            {task && (
                <>
                    <h3>
                        {editing ? (
                            <input
                                type="text"
                                value={editedTask?.title || ''}
                                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value, id: editedTask?.id || '' })}
                            />
                        ) : (
                            task.title
                        )}
                    </h3>
                    <p>
                        {editing ? (
                            <textarea
                                value={editedTask?.description || ''}
                                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value, id: editedTask?.id || '' })}
                            />
                        ) : (
                            task.description
                        )}
                    </p>
                    <p>Due Date: {task.dueDate?.toLocaleDateString()}</p>
                    <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
                    {editing ? (
                        <>
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                            <button onClick={handleComplete}>{task.completed ? "Mark Incomplete" : "Mark Complete"}</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default TaskDetail;
