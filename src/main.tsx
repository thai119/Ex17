import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/login.tsx';
import HomePage from './pages/HomePage.tsx';
import Category from './pages/category.tsx';
import PrivateRoute from './pages/private.route.tsx';
import { AuthWrapper } from './components/context/auth.context.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'categories',
        element: <Category />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
);
