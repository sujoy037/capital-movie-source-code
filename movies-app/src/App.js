import "./App.css";
import Home from "./components/Home";
import {

  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
// import Favourites from "./components/Favourites";
// import Latest from "./components/Latest";
// import Popular from "./components/Popular";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { getProfile } from "./api/inbdex";
import LoginRoute from "./components/LoginRoute";
// import PrivateRoute from "./PrivateRoute";

function App() {
  const navigation = useNavigate();
  const [state, setState] = useState({
    is_loading: true,
    user: null,
    is_reload: false,
  });

  const handleReload = () => {
    setState({ ...state, is_reload: !state.is_reload });
  };


  useEffect(() => {
    async function load() {
      const user = await getProfile()
      console.log(user);
      if (!user) {
        return setState({ ...state, user: null, is_loading: false })
      }
      setState({ ...state, user: user?.data, is_loading: false })
      return navigation('/discover/popular')
    }
    load()
  }, [state.is_reload]);


  return (
    <>
      {
        state.is_loading ? "Loading..."
          :
          <>
            <Navbar user={state.user} handleReload={handleReload} />
            <Routes>
              <Route exact path="/login" element={<Login user={state.user} handleReload={handleReload} />} />
              <Route
                path="/discover/:tag"
                element={<Home user={state.user} />}
              />

              {/* <PrivateRoute path='/discover/popular' element={<Popular/>} /> 
        <PrivateRoute path='/discover/latest' element={<Latest/>} /> 
        <PrivateRoute path='/discover/favourites' element={<Favourites/>} />  */}
            </Routes>
          </>
      }
    </>
  );
}

export default App;
