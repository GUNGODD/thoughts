import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Blog } from "./pages/Blog";
import { Signin } from "./pages/Signin.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreatePost from "./components/Create-Post.tsx";
import BlogPosts from "./components/display-post-data.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "blog/:id",
    element: <Blog />,
  },
  {
    path: "/blogs",
    element: <BlogPosts />,
  },
  {
    path: "/createpost",
    element: <CreatePost />,
  },
]);

//  React Query Provider

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
