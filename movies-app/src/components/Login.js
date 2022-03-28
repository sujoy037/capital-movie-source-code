import React, { useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { postLogin } from "../api/inbdex";
import { Navigate, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Login = (props) => {
  const myAlert = useAlert()
  const { handleReload } = props
  const navigation = useNavigate()
  const [state, setState] = useState({
    is_loading: true,
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: state?.email,
      password: state?.password,
    };

    const res = await postLogin(data)
    if (res?.error) {
      return myAlert.error(res.message);
    }
    myAlert.success(res?.message)
    return handleReload();
  };


  useEffect(() => {
    console.log(props.user);
    if (props.user) {
      return navigation('/discover')
    }
    return setState({ ...state, is_loading: false })

  }, [])



  return (
    state.is_loading ? "Loading..." :
      <div className="container">
        <div className="row" >
          <div className="col-lg-6 col-md-7 m-auto mt-5" >

            <div className="card card-body" >

              <h3 className="px-3" >Log in</h3>

              <form className="p-3" onSubmit={handleLogin}>
                <div className="form-group">
                  <label>email</label>
                  <input
                    type="text"
                    value={state.email}
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group mt-3">
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
                <button type="submit" className="btn btn-dark btn-lg btn-block mt-3">
                  Sign in
                </button>
              </form>

            </div>

          </div>

        </div>

      </div>
  );
};

export default Login;
