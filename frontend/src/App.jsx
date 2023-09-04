import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Hashtag from "./pages/Hashtag";

function App(props) {
  switch (props.page) {
    case "sign-up":
      return <Signup />;
    case "log-in":
      return <Login />;
    case "home":
      return <Home />;
    case "profile":
      return <Profile />;
    case "post":
      return <Post />;
    case "hashtag":
      return <Hashtag />;
    default:
      return <>Default</>;
  }
}

export default App;
