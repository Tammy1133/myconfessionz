import React, { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import textured from "../utils/textured.jpg";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions/UserActions";
import Axios from "axios";
import Toast from "react-bootstrap/Toast";
import Select from "react-select";

export const Login = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userCode, setUserCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showA, setShowA] = useState(true);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState({ value: "Anonymous" });

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 7000);
  }, [errorMessage]);
  const roleOptions = [
    { label: "Anonymous", value: "Anonymous" },
    {
      label: "Counsellor",
      value: "Counsellor",
    },
  ];

  const csrfToken = window.csrfToken;

  // Set the CSRF token in the headers

  const logUser = async () => {
    setLoading(true);
    try {
      if (role.value === "Anonymous") {
        const data = await Axios.post(
          "https://restapis.myconfessionz.com/api/login",
          {
            usercode: userCode,
            password: password,
          }
        );

        dispatch(setUser({ user: data.data.message, token: data.data.token }));
        setTimeout(() => {
          navigate("/homepage");
        }, 2000);
      } else {
        const data = await Axios.post(
          "https://restapis.myconfessionz.com/api/login-counselor",
          {
            username: username,
            password: password,
          }
        );
        console.log(data.data);
        dispatch(setUser({ user: data.data.message, token: data.data.token }));
        setTimeout(() => {
          navigate("/homepage");
        }, 2000);
      }
      // console.log(data.data.token);

      setErrorMessage("Successfully logged in");
      setLoading(false);
      setTimeout(() => {
        navigate("/homepage");
      }, 500);
      // console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      logUser();
    }

    setValidated(true);
  };

  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const usename = useSelector((state) => {
    return state?.user?.user?.username;
  });

  useEffect(() => {
    if (user || username) {
      navigate("/homepage");
    }
  }, []);

  return (
    <div className="bg-pink-100 min-h-[100vh]">
      {loading && (
        <div className="fixed top-0    h-[100vh] w-screen z-50 overflow-x-hidden bg-[#00000064] bg-cover flex justify-center items-center">
          <svg
            class="pl overflow-x-hidden"
            viewBox="0 0 200 200"
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                <stop offset="100%" stop-color="hsl(223,90%,55%)" />
              </linearGradient>
              <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                <stop offset="100%" stop-color="hsl(223,90%,55%)" />
              </linearGradient>
            </defs>
            <circle
              class="pl__ring"
              cx="100"
              cy="100"
              r="82"
              fill="none"
              stroke="url(#pl-grad1)"
              stroke-width="36"
              stroke-dasharray="0 257 1 257"
              stroke-dashoffset="0.01"
              stroke-linecap="round"
              transform="rotate(-90,100,100)"
            />
            <line
              class="pl__ball"
              stroke="url(#pl-grad2)"
              x1="100"
              y1="18"
              x2="100.01"
              y2="182"
              stroke-width="36"
              stroke-dasharray="1 165"
              stroke-linecap="round"
            />
          </svg>
        </div>
      )}
      <Navbar></Navbar>
      {errorMessage !== "" && (
        <div className="bg-[#ff00002f] py-3 text-center text-[red] text-xl font-bold">
          {errorMessage}
        </div>
      )}

      <div className="relative loginpage overflow-x-hidden  ">
        <div className="relative z-30   flex justify-center  py-[60px] fade-in-bck1 overflow-x-hidden ">
          <div className="flex flex-col bg-opacity-10 bg-white justify-center items-center  rounded-b-2xl overflow-x-hidden">
            <div className="form-top bg-[red] flex py-3 pl-4  text-white text-xl rounded-t-xl items-center w-[350px] sm:w-[450px] lg:w-[600px]  overflow-x-hidden ">
              Login
            </div>
            <div className="flex items-center justify-center inputs py-5 px-3 md:px-5  shadow-2xl rounded-b-2xl  w-[350px] sm:w-[450px]  lg:w-[600px] border-x-2 border-b-2 border-red-300">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3 ">
                  <Form.Group controlId="validationCustom01">
                    <Form.Label className="mb-2 text-sm text-black lg:ml-[60px]">
                      Role
                    </Form.Label>
                    <Select
                      value={role.value}
                      //   onChange={this.handleChange}
                      options={roleOptions}
                      onChange={(e) => {
                        setErrorMessage("");
                        setRole(e);
                      }}
                      placeholder={role.value}
                      isSearchable={true}
                      className="lg:w-[70%] lg:ml-[60px] rounded-lg mb-6"
                    />
                    {role.value === "Anonymous" ? (
                      <div>
                        <Form.Label className="mb-2 text-sm text-black lg:ml-[60px]">
                          Usercode
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={userCode}
                          onChange={(e) => {
                            setErrorMessage("");
                            setUserCode(e.target.value);
                          }}
                        />
                      </div>
                    ) : (
                      <div>
                        <Form.Label className="mb-2 text-sm text-black lg:ml-[60px]">
                          Username
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={username}
                          onChange={(e) => {
                            setErrorMessage("");
                            setUsername(e.target.value);
                          }}
                        />
                      </div>
                    )}
                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      This field can't be empty
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustom01" className="mt-4 ">
                    <Form.Label className="mb-2 text-sm text-black  lg:ml-[60px]">
                      Password
                    </Form.Label>
                    <Form.Control
                      required
                      type="password"
                      minLength={8}
                      value={password}
                      onChange={(e) => {
                        setErrorMessage("");
                        setPassword(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-sm"
                    >
                      This field should have at least 8 characters
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <button
                  type="submit"
                  className="form-top text-white px-[30px] py-[15px] rounded-2xl mt-2 lg:ml-[55px] mb-3 "
                >
                  Login
                </button>
                <br />
                <a
                  style={{ fontFamily: "Cormorant" }}
                  className="text-[red] pl-1 hover:text-[#ff3c00] text-lg lg:ml-[55px] underline-offset-4 cursor-pointer font-bold"
                  onClick={() => {
                    navigate("/password-reset");
                  }}
                >
                  Forgot Password
                </a>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
