import Signup from "./pages/SignUp";
import Login from "./pages/Login";

function App(props) {
  if (props.page == "sign-up") {
    return <Signup />;
  }

  if (props.page == "log-in") {
    return <Login />;
  }

  return <></>;
}

export default App;
