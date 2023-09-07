import "./App.css"
import { Route, Routes } from "react-router-dom"
import { UserContextProvider } from "./UserContex"
import Layout from "./Layout"
import IndexPage from "./pages/IndexPage"
import Login from "./pages/Login"
import Register from "./pages/SignUp"
import LogOut from "./pages/Logout"
import CreatePost from "./pages/CreatePost"
import PostPage from "./pages/PostPage"
import EditPost from './pages/EditPost'
import DeletePost from './pages/DeletePost'
import MyPosts from "./pages/MyPosts"

export default function App() {
    return (
        <UserContextProvider>
        <Routes>
            <Route path="/" element={<Layout/>}>
               <Route index element={<IndexPage/>} />
               <Route path="/login" element={<Login/>} />
               <Route path="/signUp" element={<Register/>} />
               <Route path="/logout" element={<LogOut/>} />
               <Route path="/createPost" element={<CreatePost/>} />
               <Route path="/post/:id" element={<PostPage/>} />
               <Route path="/edit/:id" element={<EditPost/>} />
               <Route path="/delete/:id" element={<DeletePost/>}/>
               <Route path="/myPosts/:userId" element={<MyPosts/>}/>
            </Route>
        </Routes>
        </UserContextProvider>
    )
}