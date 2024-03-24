import { Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import UserPage from "./Pages/UserPage";
import DiscoverPage from "./Pages/DiscoverPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import PostDetailPage from "./Pages/PostDetailPage";
import AddPostPage from "./Pages/AddPostPage";
import { SidebarProvider } from "./Contexts/SidebarContext";
import FilterPage from "./Pages/FilterPage";
import PostEditPage from "./Pages/PostEditPage";
function App() {
  return (
    <div className="duration-75 dark:bg-themeDark dark:text-gray-100">
      <SidebarProvider>
        <Routes>
          <Route element={<MainPage></MainPage>} path="/"></Route>
          <Route element={<UserPage></UserPage>} path="/user"></Route>
          <Route
            element={<DiscoverPage></DiscoverPage>}
            path="/discover"
          ></Route>
          <Route element={<AddPostPage></AddPostPage>} path="/add-post"></Route>
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
  );
}

export default App;
