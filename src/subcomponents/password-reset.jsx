import React, { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import textured from "../utils/textured.jpg";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import Select from "react-select";
import Axios from "axios";
import { useSelector } from "react-redux";

export const PasswordReset = () => {
  const [validated, setValidated] = useState(false);
  const [showA, setShowA] = useState(true);
  const navigate = useNavigate();
  const [showUsercode, setShowUsercode] = useState(true);
  const [showRecoveryQuestion, setShowRecoveryQuestion] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userCode, setUserCode] = useState("");
  const [username, setUsername] = useState("");
  const [recoveryQuestions, setRecoveryQuestions] = useState([]);
  const [recoveryQuestion, setRecoveryQuestion] = useState("");
  const [recoveryAnswer, setRecoveryAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState({ value: "Anonymous" });

  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const Susername = useSelector((state) => {
    return state?.user?.user?.username;
  });
  useEffect(() => {
    if (user || Susername) {
      navigate("/homepage");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }, [errorMessage]);
  const roleOptions = [
    { label: "Anonymous", value: "Anonymous" },
    {
      label: "Counsellor",
      value: "Counsellor",
    },
  ];

  const handleSubmit1 = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      validateUsercode();
    }

    setValidated(true);
  };
  const handleSubmit2 = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      validateRecoveryQuestion();
    }

    setValidated(true);
  };
  const handleSubmit3 = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (password === confirmpassword) {
        validatePassword();
      } else {
        setErrorMessage("Password do not match");
      }
    }

    setValidated(true);
  };

  const validateRecoveryQuestion = async () => {
    setLoading(true);
    try {
      if (role.value === "Anonymous") {
        const data = await Axios.post(
          "https://restapis.myconfessionz.com/api/password-recovery-answer",
          {
            usercode: userCode,
            recovery_question: recoveryQuestion.value,
            answer: recoveryAnswer,
            token: token,
          }
        );
        console.log(data);
        setLoading(false);
        setErrorMessage("Correct");
        setShowRecoveryQuestion(false);
        setShowPassword(true);
      } else {
        const data = await Axios.post(
          "https://restapis.myconfessionz.com/api/counselor-password-recovery-answer",
          {
            username: username,
            recovery_question: recoveryQuestion.value,
            answer: recoveryAnswer,
            token: token,
          }
        );
        console.log(data);
        setLoading(false);
        setErrorMessage("Correct");
        setShowRecoveryQuestion(false);
        setShowPassword(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  const validatePassword = async () => {
    setLoading(true);

    try {
      if (role.value === "Anonymous") {
        const data = await Axios.post(
          "https://restapis.myconfessionz.com/api/reset-password",
          {
            usercode: userCode,
            password: password,
            token: token,
          }
        );
        console.log(data);
        setLoading(false);
        setErrorMessage("Password updated successfully");
        navigate("/login");
      } else {
        const data = await Axios.post(
          "https://restapis.myconfessionz.com/api/counselor-reset-password",
          {
            username: username,
            password: password,
            token: token,
          }
        );
        console.log(data);
        setLoading(false);
        setErrorMessage("Password updated successfully");
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  const validateUsercode = async () => {
    setLoading(true);
    try {
      if (role.value === "Anonymous") {
        const data = await Axios.post(
          "https://restapis.myconfessionz.com/api/password-reset-request",
          {
            usercode: userCode,
          }
        );
        setLoading(false);
        setToken(data.data.token);
        console.log(token);
        console.log(data);
        setRecoveryQuestions([
          ...recoveryQuestions,
          {
            label: data.data.message.recovery_question1,
            value: data.data.message.recovery_question1,
          },
          {
            value: data.data.message.recovery_question2,
            label: data.data.message.recovery_question2,
          },
          {
            value: data.data.message.recovery_question3,
            label: data.data.message.recovery_question3,
          },
        ]);
      } else {
        const data = await Axios.post(
          "https://restapis.myconfessionz.com/api/counselor-password-reset-request",
          {
            username: username,
          }
        );
        setLoading(false);
        setToken(data.data.token);
        console.log(token);
        console.log(data);
        setRecoveryQuestions([
          ...recoveryQuestions,
          {
            label: data.data.message.recovery_question1,
            value: data.data.message.recovery_question1,
          },
          {
            value: data.data.message.recovery_question2,
            label: data.data.message.recovery_question2,
          },
          {
            value: data.data.message.recovery_question3,
            label: data.data.message.recovery_question3,
          },
        ]);
      }

      setErrorMessage("User found");
      setShowRecoveryQuestion(true);
      setShowUsercode(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  // const recoveryQuestions = [
  //   { label: "Your mum's first name", value: "Your mum's first name" },
  //   {
  //     label: "Name of your uncle's first born",
  //     value: "Name of your uncle's first born",
  //   },
  //   {
  //     label: "Name of your aunt's first born",
  //     value: "Name of your aunt's first born",
  //   },
  //   {
  //     label: "Name of your primary school favourite teacher",
  //     value: "Name of your primary school favourite teacher",
  //   },
  //   {
  //     label: "Name of your secondary school best friend",
  //     value: "Name of your secondary school best friend",
  //   },
  //   {
  //     label: "Name of your childhood favourite musician",
  //     value: "Name of your childhood favourite musician",
  //   },
  //   {
  //     label: "Name of your childhood favourite song",
  //     value: "Name of your childhood favourite song",
  //   },
  //   {
  //     label: "Name of your childhood favourite movie",
  //     value: "Name of your childhood favourite movie",
  //   },
  //   {
  //     label: "Name of dream city for holiday",
  //     value: "Name of dream city for holiday",
  //   },
  // ];
  return (
    <div className="min-h-screen bg-pink-100">
      <Navbar></Navbar>
      {errorMessage !== "" && (
        <div className="bg-[#ff00002f] py-3 text-center text-[red] text-xl font-bold">
          {errorMessage}
        </div>
      )}
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
      {showUsercode && (
        <div className="relative flex items-center justify-center">
          <div className=" resetpage relative z-30 py-[60px]  reset    flex justify-center items-center  ">
            <div className="flex flex-col bg-opacity-10 bg-white justify-center items-center  rounded-b-2xl fade-in-bck1">
              <div className="form-top bg-[red] flex py-3 pl-4  text-white text-xl rounded-t-xl items-center w-[350px] sm:w-[450px] lg:w-[600px]  ">
                Reset password
              </div>
              <div className=" inputs py-5 px-3 md:px-5  shadow-2xl rounded-b-2xl  w-[350px] sm:w-[450px] lg:w-[600px] border-x-2 border-b-2 border-red-300">
                <Form noValidate validated={validated} onSubmit={handleSubmit1}>
                  <Form.Group controlId="validationCustom01">
                    <Form.Label className="mb-2 text-sm text-black lg:ml-[85px]">
                      Role
                    </Form.Label>
                    <Select
                      value={role.value}
                      //   onChange={this.handleChange}
                      options={roleOptions}
                      onChange={(e) => {
                        setRole(e);
                      }}
                      placeholder={role.value}
                      isSearchable={true}
                      className="lg:w-[70%] lg:ml-[85px] rounded-lg mb-6"
                    />
                    {role.value === "Anonymous" ? (
                      <div>
                        <Form.Label className="mb-2 text-sm text-black lg:ml-[85px]">
                          Usercode
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={userCode}
                          onChange={(e) => {
                            setUserCode(e.target.value);
                          }}
                        />
                      </div>
                    ) : (
                      <div>
                        <Form.Label className="mb-2 text-sm text-black lg:ml-[85px]">
                          Username
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                      </div>
                    )}

                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <button
                    type="submit"
                    className="form-top text-white px-[30px] py-[15px] rounded-2xl mt-4 lg:ml-[85px] mb-3 "
                  >
                    Submit
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showRecoveryQuestion && (
        <div className="relative flex items-center justify-center">
          <div className=" resetpage relative z-30 py-[60px]  reset    flex justify-center items-center  ">
            <div className="flex flex-col bg-opacity-10 bg-white justify-center items-center  rounded-b-2xl fade-in-bck1">
              <div className="form-top bg-[red] flex py-3 pl-4  text-white text-xl rounded-t-xl items-center w-[350px] sm:w-[450px] lg:w-[600px]  ">
                Reset password
              </div>
              <div className=" inputs py-5 px-3 md:px-5  shadow-2xl rounded-b-2xl  w-[350px] sm:w-[450px] lg:w-[600px] border-x-2 border-b-2 border-red-300">
                <Form noValidate validated={validated} onSubmit={handleSubmit2}>
                  <Form.Group controlId="validationCustom01">
                    <Form.Label className="mb-2 text-sm text-black mt-4 lg:ml-[85px]">
                      Recovery Question
                    </Form.Label>
                    <Select
                      //   onChange={this.handleChange}
                      options={recoveryQuestions}
                      isSearchable={true}
                      required
                      value={recoveryQuestion}
                      onChange={(e) => {
                        setRecoveryQuestion(e);
                      }}
                      className="lg:w-[70%] lg:ml-[85px]  rounded-lg "
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    ></Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustom01" className="mt-4 ">
                    <Form.Label className="mb-2 text-sm text-black lg:ml-[85px]">
                      Answer
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={recoveryAnswer}
                      onChange={(e) => {
                        setRecoveryAnswer(e.target.value);
                      }}
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <button
                    type="submit"
                    className="form-top text-white px-[30px] py-[15px] rounded-2xl mt-4 lg:ml-[85px] mb-3 "
                  >
                    Submit
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
      {showPassword && (
        <div className="relative flex items-center justify-center">
          <div className=" resetpage relative z-30 py-[60px]  reset    flex justify-center items-center  ">
            <div className="flex flex-col bg-opacity-10 bg-white justify-center items-center  rounded-b-2xl fade-in-bck1">
              <div className="form-top bg-[red] flex py-3 pl-4  text-white text-xl rounded-t-xl items-center w-[350px] sm:w-[450px] lg:w-[600px]  ">
                Reset password
              </div>
              <div className=" inputs py-5 px-3 md:px-5  shadow-2xl rounded-b-2xl  w-[350px] sm:w-[450px] lg:w-[600px] border-x-2 border-b-2 border-red-300">
                <Form noValidate validated={validated} onSubmit={handleSubmit3}>
                  <Form.Group controlId="validationCustom01" className="mt-4 ">
                    <Form.Label className="mb-2 text-sm text-black  lg:ml-[85px]">
                      New Password
                    </Form.Label>
                    <Form.Control
                      required
                      type="password"
                      minLength={8}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      Required
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustom01" className="mt-4 ">
                    <Form.Label className="mb-2 text-sm text-black  lg:ml-[85px]">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      required
                      minLength={8}
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <button
                    type="submit"
                    className="form-top text-white px-[30px] py-[15px] rounded-2xl mt-4 lg:ml-[85px] mb-3 "
                    onClick={() => {
                      console.log(
                        userCode,
                        recoveryQuestion,
                        recoveryAnswer,
                        password
                      );
                    }}
                  >
                    Reset Password
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {errorMessage !== "" && (
        <div className="fixed z-50 bottom-[-10px] left-0 rounded-tr-2xl shadow-2xl text-white fade-in-bck1  ">
          <Toast
            show={showA}
            style={{
              paddingTop: "10px",
              paddingBottom: "6px",
              border: "2px solid red",
              borderTopRightRadius: "50px",
              marginLeft: "-10px",

              paddingLeft: "10px",
              paddingRight: "10px",
              backgroundColor: "#ff00001c",
              color: "red",
              fontWeight: "800",
            }}
          >
            <Toast.Body className="rounded-t-lg uppercase pt-[60px]">
              {errorMessage}
            </Toast.Body>
          </Toast>
        </div>
      )} */}
    </div>
  );
};

export default PasswordReset;
