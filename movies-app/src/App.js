import "./App.css";
import Home from "./components/Home";
import {
 
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Favourites from "./components/Favourites";
import Latest from "./components/Latest";
import Popular from "./components/Popular";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
// import PrivateRoute from "./PrivateRoute";

function App() {
  const navigation = useNavigate();
  const [state, setState] = useState({
    is_login: false,
    user: null,
    is_reload: false,
  });

  const load_user = (user) => {
    setState({ ...state, user: user, is_login: true });
  };

  useEffect(() => {
    if (state.user && state.is_login) {
      navigation("/discover");
    }
  }, [state.is_login, state.user]);
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route  path="/" element={<Home />} /> */}
        <Route exact path="/login" element={<Login load_user={load_user} />} />
        <Route
          exact
          path="/discover"
          element={state?.is_login ? <Home /> : <></>}
        />

        {/* <PrivateRoute path='/discover/popular' element={<Popular/>} /> 
        <PrivateRoute path='/discover/latest' element={<Latest/>} /> 
        <PrivateRoute path='/discover/favourites' element={<Favourites/>} />  */}
      </Routes>
    </>
  );
}

export default App;
