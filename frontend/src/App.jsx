import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";

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

  return <></>;
}

export default App;
