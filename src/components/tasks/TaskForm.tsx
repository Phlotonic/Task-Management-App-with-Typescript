import React, { useState, useEffect } from 'react';
import { useTask } from '../../contexts/TaskContext';
import { Task, TaskFormData } from '../../models/Task';
import { useNavigate, useParams } from 'react-router-dom';
import { validateTaskFormData } from '../../utils/validation';
import Input from '../ui/Input';
import Button from '../ui/Button';

const TaskForm: React.FC = () => {
    const { addTask, updateTask, getTask } = useTask();
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditing = !!id;

    const initialTask: TaskFormData = {
        title: '',
        description: '',
        dueDate: undefined,
        completed: false,
    };

    const [task, setTask] = useState<TaskFormData>(initialTask);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [apiError, setApiError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            if (isEditing && id) {
                const taskToEdit = await getTask(id);
                if (taskToEdit) {
                    setTask({
                        title: taskToEdit.title,
                        description: taskToEdit.description,
                        dueDate: taskToEdit.dueDate,
                        completed: taskToEdit.completed,
                    });
                } else {
                    setApiError(`Task with id ${id} not found`);
                }
            }
        };
        fetchTask();
    }, [id, isEditing, getTask]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask({ ...task, dueDate: new Date(e.target.value) });
    };
    const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, completed: e.target.checked });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);
        const validationErrors = validateTaskFormData(task);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            if (isEditing && id) {
                const taskToUpdate = await getTask(id);
                if (taskToUpdate) {
                    await updateTask({
                        ...taskToUpdate,
                        ...task,
                        updatedAt: new Date(),
                    } as Task);
                }
            } else {
                const newTask: Task = { ...task, id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date(), completed: task.completed };
                await addTask(newTask);
            }
            navigate('/protected/dashboard');
        } catch (err) {
            setApiError("There was an error when creating the task");
        }
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Task' : 'Create Task'}</h2>
            {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="title"
                    label="Title"
                    value={task.title}
                    onChange={handleChange}
                    error={errors.title}
                />
                <Input
                    type="textarea"
                    name="description"
                    label="Description"
                    value={task.description}
                    onChange={handleChange}
                    error={errors.description}
                />
                <Input
                    type="date"
                    name="dueDate"
                    label="Due Date"
                    value={task.dueDate?.toISOString().split('T')[0] || ''}
                    onChange={handleDateChange}
                />
                <label htmlFor="completed">
                    Completed:
                    <input
                        type="checkbox"
                        name="completed"
                        id="completed"
                        checked={task.completed}
                        onChange={handleCompletedChange}
                    />
                </label>
                <Button type="submit">{isEditing ? 'Update Task' : 'Create Task'}</Button>
            </form>
        </div>
    );
};

export default TaskForm;
