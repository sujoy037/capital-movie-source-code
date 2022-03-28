import React, { useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { postLogin, postRegister } from "../api/inbdex";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Register = (props) => {
    const myAlert = useAlert()
    const { handleReload } = props
    const navigation = useNavigate()
    const [state, setState] = useState({
        is_loading: true,
        email: "",
        password: "",
        username: "",
        phno: ""
    });

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = {
            email: state?.email,
            password: state?.password,
            username: state?.username,
            phno: state?.phno
        };

        const res = await postRegister(data)
        if (res?.error) {
            return myAlert.error(res.message);
        }
        myAlert.success(res?.message)
        // return handleReload();
        return navigation('/login')
    };


    useEffect(() => {
        // console.log(props.user);
        if (props.user) {
            return navigation('/login')
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

                            <form className="p-3" onSubmit={handleRegister}>

                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        value={state.username}
                                        onChange={(e) =>
                                            setState({ ...state, username: e.target.value })
                                        }
                                        className="form-control"
                                        placeholder="Enter username"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
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
                                <div className="form-group">
                                    <label>Phone number</label>
                                    <input
                                        type="text"
                                        value={state.phno}
                                        onChange={(e) =>
                                            setState({ ...state, phno: e.target.value })
                                        }
                                        className="form-control"
                                        placeholder="Enter username"
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
                                <div className="d-flex align-items-center justify-content-between">
                                    <button type="submit" className="btn btn-dark btn-lg btn-block mt-3">
                                        { state.is_loading ? "Processing.." : "Register"}
                                    </button>
                                    <Link to="/login" className="btn btn-link btn-lg btn-block mt-3">
                                       Go to login
                                    </Link>
                                </div>
                            </form>

                        </div>

                    </div>

                </div>

            </div>
    );
};

export default Register;
