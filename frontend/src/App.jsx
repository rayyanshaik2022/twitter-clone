import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

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
    return <Profile />
  }

  return <></>;
}

export default App;
