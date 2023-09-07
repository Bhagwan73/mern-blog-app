import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContex";
export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);



    useEffect(() => {
        fetch('http://localhost:4000/profile', {
          credentials: 'include',
        }).then(response => {
            response.json().then(user => {
              if(user.status)  setUserInfo(user.data);
          });
        });
      }, []);

    
      const username = userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo">📒Blogosphere</Link>
      <nav className="navbar">
      <Link to="/" className="btn"> Home </Link>
        {username ? (
          <>
            <Link to="/createPost" className="btn">Add Post</Link>
            <Link to={`/myPosts/${userInfo.userId}`} className="btn"> My Posts</Link>
            <Link to="/logOut" className="btn">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signUp" className="btn">Sign Up</Link>
          </>
        )}

      </nav>
    </header>
  );
}

