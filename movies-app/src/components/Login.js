import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Login = (props) => {
  const { load_user } = props
  const [state, setState] = useState({
    is_loading: false,
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username: state?.username,
      password: state?.password,
    };

    const res = await axios.post(`http://localhost:4000/login`, data);

    console.log(res);
    if (res) {
      return load_user(res);
    }
    alert("unable to login");
  };

  

  return (
    <div className="container-fluid">
      <h3>Log in</h3>
      <div className="row">
        <div className="col-3">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={state.username}
                onChange={(e) =>
                  setState({ ...state, username: e.target.value })
                }
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <button type="submit" className="btn btn-dark btn-lg btn-block">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
