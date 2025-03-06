import { createBrowserRouter } from "react-router-dom";
import TaskDashboard from "./components/tasks/TaskDashboard";
import TaskDetail from "./components/tasks/TaskDetail";
import TaskForm from "./components/tasks/TaskForm";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
        children: [
            {
                index: true,
                element: <Homepage />,
            },
            {
                path: "/protected",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "dashboard",
                        element: <TaskDashboard />,
                    },
                    {
                        path: "tasks/create",
                        element: <TaskForm />,
                    },
                    {
                        path: "tasks/:id",
                        element: <TaskDetail />,
                    },
                    {
                        path: "tasks/edit/:id",
                        element: <TaskForm />,
                    },
                ],
            },
        ],
    },
]);
