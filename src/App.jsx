import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
const MainPage = lazy(() => import("./Pages/MainPage"));
const UserPage = lazy(() => import("./Pages/UserPage"));
const DiscoverPage = lazy(() => import("./Pages/DiscoverPage"));
const SignInPage = lazy(() => import("./Pages/SignInPage"));
const SignUpPage = lazy(() => import("./Pages/SignUpPage"));
const PostDetailPage = lazy(() => import("./Pages/PostDetailPage"));
const AddPostPage = lazy(() => import("./Pages/AddPostPage"));
const FilterPage = lazy(() => import("./Pages/FilterPage"));
const PostEditPage = lazy(() => import("./Pages/PostEditPage"));
import { SidebarProvider } from "./Contexts/SidebarContext";
function App() {
  return (
    <Suspense>
      <div className="duration-75 dark:bg-themeDark dark:text-gray-100">
        <SidebarProvider>
          <Routes>
            <Route element={<MainPage></MainPage>} path="/"></Route>
            <Route element={<UserPage></UserPage>} path="/user"></Route>
            <Route
              element={<DiscoverPage></DiscoverPage>}
              path="/discover"
            ></Route>
            <Route
              element={<AddPostPage></AddPostPage>}
              path="/add-post"
            ></Route>
            <Route
              element={<PostEditPage></PostEditPage>}
              path="/edit/:idPost"
            ></Route>
            <Route
              element={<FilterPage></FilterPage>}
              path="/filter/:titlePost"
            ></Route>
            <Route
              element={<PostDetailPage></PostDetailPage>}
              path="/:page/:idPost"
            ></Route>
            <Route element={<SignInPage></SignInPage>} path="/sign-in"></Route>
            <Route element={<SignUpPage></SignUpPage>} path="/sign-up"></Route>
          </Routes>
        </SidebarProvider>
      </div>
    </Suspense>
  );
}

export default App;
