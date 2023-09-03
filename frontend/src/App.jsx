import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Hashtag from "./pages/Hashtag";

function App(props) {

  if (props.page == "sign-up") {
    return <Signup />;
  }

  if (props.page == "log-in") {
    return <Login />;
  }

  if (props.page == "home") {
    return <Home />;
  }

  if (props.page == "profile") {
    return <Profile/>
  }

  if (props.page == "post") {
    return <Post />
  }
  
  if (props.page == "hashtag") {
    return <Hashtag />
  }

  return <></>;
}

export default App;
