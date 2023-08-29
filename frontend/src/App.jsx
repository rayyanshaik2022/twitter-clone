import Signup from "./pages/SignUp"

function App(props) {

  if (props.page == "sign-up") {
    return <Signup />
  }

  return (
    <>
    </>
  )
}

export default App
