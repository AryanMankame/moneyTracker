import React , {useState} from 'react'
import { Link , NavLink , useNavigate } from "react-router-dom";
import './Login.css';
function SignUpForm() {
  const [username,setusername] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [message,setmessage] = useState("");
  const navigate = useNavigate();
  const checkuser = (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password
    }
    console.log(data);
    fetch("http://127.0.0.1:8000/user/register",{
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(res => {
        if(res["resp"] === "success"){
          navigate("/");
        }
        console.log(res)
        setmessage(res["resp"]);
      })
  }
  return (
    <div className="appAside" >
          <div className="appForm">
            <div className="pageSwitcher">
              <NavLink
                to="/"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign In
              </NavLink>
              <NavLink
                exact
                to="/"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign Up
              </NavLink>
            </div>

            <div className="formTitle">
              <NavLink
                to="/"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/sign-in"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign Up
              </NavLink>
            </div>
            <div className="formCenter">
        {message === "failure" ? <h3 style={{color:"white"}}>*User Already exists</h3> : <></>}
        <form className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="formFieldInput"
              placeholder="Enter your full name"
              name="name"
              onInput = {(e) => {
                setusername(e.target.value);
              }}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              onInput = {(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              onInput = {(e) => {
                setemail(e.target.value);
              }}
            />
          </div>

          <div className="formField">
            <label className="formFieldCheckboxLabel">
              <input
                className="formFieldCheckbox"
                type="checkbox"
                name="hasAgreed"
              />{" "}
              I agree all statements in{" "}
              <a href="null" className="formFieldTermsLink">
                terms of service
              </a>
            </label>
          </div>

          <div className="formField">
            <button className="formFieldButton" onClick={checkuser}>Sign Up</button>{" "}
            <Link to="/" className="formFieldLink">
              I'm already member
            </Link>
          </div>
        </form>
      </div>
          </div>
        </div>
  )
}

export default SignUpForm