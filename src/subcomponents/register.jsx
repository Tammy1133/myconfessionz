import React, { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import textured from "../utils/textured.jpg";
import { useNavigate } from "react-router-dom";
import { countryData } from "../utils/countryData";
import Select from "react-select";
import Toast from "react-bootstrap/Toast";
import Axios from "axios";
import { useSelector } from "react-redux";

export const Register = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [usercode, setUsercode] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [rq1, setRq1] = useState("");
  const [rq2, setRq2] = useState("");
  const [rq3, setRq3] = useState("");
  const [rqanswer1, setRqanswer1] = useState("");
  const [rqanswer2, setRqanswer2] = useState("");
  const [rqanswer3, setRqanswer3] = useState("");
  const [shows1error, setShows1error] = useState(false);
  const [shows2error, setShows2error] = useState(false);
  const [shows3error, setShows3error] = useState(false);
  const [showgendererror, setShowgendererror] = useState(false);
  const [showcountryerror, setshowcountryerror] = useState(false);
  const [showstateerror, setshowstateerror] = useState(false);
  const [validateErrors, setValidateErrors] = useState("hello");
  const [errorMessage, setErrorMessage] = useState("");
  const [showA, setShowA] = useState(true);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState({ value: "Anonymous" });
  const [field, setField] = useState({ value: "Mental Health Counseling" });
  const [myimage, setImage] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const rooms = [
    { label: "Mental Health Counseling", value: "Mental Health Counseling" },
    {
      label: "Marriage and Family Counseling",
      value: "Marriage and Family Counseling",
    },
    { label: "School Counseling", value: "School Counseling" },
    { label: "Career Counseling", value: "Career Counseling" },
    {
      label: "Substance Abuse Counseling",
      value: "Substance Abuse Counseling",
    },
    { label: "Rehabilitation Counseling", value: "Rehabilitation Counseling" },
    { label: "Grief Counseling", value: "Grief Counseling" },
    {
      label: "Child and Adolescent Counseling",
      value: "Child and Adolescent Counseling",
    },
    { label: "Geriatric Counseling", value: "Geriatric Counseling" },
    { label: "Trauma Counseling", value: "Trauma Counseling" },
    {
      label: "Eating Disorders Counseling",
      value: "Eating Disorders Counseling",
    },
    { label: "Multicultural Counseling", value: "Multicultural Counseling" },
    {
      label: "Military and Veterans Counseling",
      value: "Military and Veterans Counseling",
    },
    { label: "Art Therapy", value: "Art Therapy" },
    { label: "Play Therapy", value: "Play Therapy" },
    { label: "Sex Therapy", value: "Sex Therapy" },
    { label: "Community Counseling", value: "Community Counseling" },
  ];
  const handleDateChange = () => {
    const selectedDate = dob;
    const currentDate = new Date();
    const minDate = new Date();
    const format = `${currentDate.getFullYear() - 16}-${
      currentDate.getMonth().toString().length === 1
        ? `0${currentDate.getMonth()}`
        : currentDate.getMonth()
    }-${
      currentDate.getDay().toString().length === 1
        ? `0${currentDate.getDay()}`
        : currentDate.getDay()
    }`;
    console.log(format);

    if (selectedDate > format) {
      console.log(true);
      // Date is less than the minimum age of 18 years
      const newDate = new Date(
        minDate.getFullYear() + 16,
        minDate.getMonth(),
        minDate.getDate()
      );

      setDob(format);
    }
  };

  useEffect(() => {
    handleDateChange();
  }, [dob]);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 9000);
  }, [errorMessage]);

  useEffect(() => {
    if (validateErrors !== "hello") {
      if (rq1 === "") {
        setShows1error(true);
      } else {
        setShows1error(false);
      }
      if (rq2 === "") {
        setShows2error(true);
      } else {
        setShows2error(false);
      }
      if (rq3 === "") {
        setShows3error(true);
      } else {
        setShows3error(false);
      }
      if (selectedCountry === "") {
        setshowcountryerror(true);
      } else {
        setshowcountryerror(false);
      }
      if (selectedState === "") {
        setshowstateerror(true);
      } else {
        setshowstateerror(false);
      }
      if (gender === "") {
        setShowgendererror(true);
      } else {
        setShowgendererror(false);
      }
    }
  }, [validateErrors]);

  const recoveryQuestions = [
    { label: "Your mum's first name", value: "Your mum's first name" },
    {
      label: "Name of your uncle's first born",
      value: "Name of your uncle's first born",
    },
    {
      label: "Name of your aunt's first born",
      value: "Name of your aunt's first born",
    },
    {
      label: "Name of your primary school favourite teacher",
      value: "Name of your primary school favourite teacher",
    },
    {
      label: "Name of your secondary school best friend",
      value: "Name of your secondary school best friend",
    },
    {
      label: "Name of your childhood favourite musician",
      value: "Name of your childhood favourite musician",
    },
    {
      label: "Name of your childhood favourite song",
      value: "Name of your childhood favourite song",
    },
    {
      label: "Name of your childhood favourite movie",
      value: "Name of your childhood favourite movie",
    },
    {
      label: "Name of dream city for holiday",
      value: "Name of dream city for holiday",
    },
  ];

  const genderOptions = [
    { label: "Male", value: "Male" },
    {
      label: "Female",
      value: "Female",
    },
  ];
  const roleOptions = [
    { label: "Anonymous", value: "Anonymous" },
    {
      label: "Counsellor",
      value: "Counsellor",
    },
  ];
  const handleSubmit = (event) => {
    setValidateErrors(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (
        !shows1error &&
        !shows2error &&
        !shows3error &&
        !showcountryerror &&
        !showgendererror &&
        !showstateerror
      ) {
        if (password === confirmPassword) {
          console.log(
            usercode,
            gender,
            dob,
            selectedCountry,
            selectedState,
            rq1,
            rqanswer1,
            rq2,
            rqanswer2,
            rq3,
            rqanswer3,
            password,
            confirmPassword
          );
          registerUser();
        } else {
          setErrorMessage("Passwords do not match");
        }
      }
    }
    event.preventDefault();
    setValidated(true);
  };

  const registerUser = async () => {
    setLoading(true);

    try {
      console.log(loading);
      if (role.value === "Anonymous") {
        await Axios.post(
          "https://restapis.myconfessionz.com/api/register",
          {
            usercode: usercode,
            password: password,
            gender: gender.value,
            dob: dob,
            state: selectedState.value,
            country: selectedCountry.value,
            recovery_question1: rq1.value,
            recovery_question2: rq2.value,
            recovery_question3: rq3.value,
            answer1: rqanswer1,
            answer2: rqanswer2,
            answer3: rqanswer3,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setLoading(false);
        setErrorMessage("Successfully Registered");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        console.log({
          username: username,
          password: password,
          gender: gender.value,
          dob: dob,
          counselingField: field.value,
          image: myimage,
          bio: bio,
          state: selectedState.value,
          country: selectedCountry.value,
          recovery_question1: rq1.value,
          recovery_question2: rq2.value,
          recovery_question3: rq3.value,
          answer1: rqanswer1,
          answer2: rqanswer2,
          answer3: rqanswer3,
          firstName: firstname,
          lastName: lastname,
        });
        const data = await Axios.post(
          "https://restapis.myconfessionz.com/api/register-counselor",
          {
            username: username,
            password: password,
            gender: gender.value,
            dob: dob,
            counselingField: field.value,
            image: myimage,
            bio: bio,
            state: selectedState.value,
            country: selectedCountry.value,
            recovery_question1: rq1.value,
            recovery_question2: rq2.value,
            recovery_question3: rq3.value,
            answer1: rqanswer1,
            answer2: rqanswer2,
            answer3: rqanswer3,
            firstName: firstname,
            lastName: lastname,
            satisfied_clients: 0,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        setLoading(false);
        setErrorMessage("Counsellor Registered");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response.data.message);

      console.log(error);
    }
  };

  const getCountries = () => {
    const newData = [];
    countryData.map((item) => {
      newData.push({ label: item.country, value: item.country });
    });
    setAllCountries(newData);
  };
  const getState = () => {
    const newData = [];
    const count = countryData.find((item) => {
      return item.country === selectedCountry.value;
    });

    count.states.map((item) => {
      newData.push({ label: item, value: item });
    });
    setAllStates(newData);
    console.log(allStates);
    // console.log(allStates);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry !== "") {
      getState();
    }
  }, [selectedCountry]);

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

  return (
    !user &&
    allCountries.length > 1 && (
      <div className="bg-pink-50">
        <Navbar></Navbar>
        {errorMessage !== "" && (
          <div className="bg-[#ff00002f] py-3 text-center text-[red] text-xl font-bold">
            {errorMessage}
          </div>
        )}
        <div className="relative flex items-center justify-center">
          {loading === true && (
            <div className="fixed top-0   h-[100vh] w-screen z-50 overflow-x-hidden bg-[#00000064] bg-cover flex justify-center items-center">
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
          <div className=" resetpage relative z-30 py-[30px] md:py-[20px]  reset    flex justify-center items-center  ">
            <div className="flex flex-col bg-opacity-10 bg-white justify-center items-center  rounded-b-2xl fade-in-bck1">
              <div className="form-top bg-[red] flex py-3 pl-4  text-white text-xl rounded-t-xl items-center w-[350px] sm:w-[600px]   ">
                Register
              </div>

              <div className=" inputs py-3 px-3 md:px-5  shadow-2xl rounded-b-2xl  w-[350px] sm:w-[600px]  border-x-2 border-b-2 border-red-300">
                <div className="mb-5 text-center text-sm md:text-base leading-[20px] md:leading-[20px] text-[red] px-4  ">
                  We urge users to input Real and Genuine Date of Birth, Gender,
                  Country and State of Origin in this form. This will help us in
                  the information we give to you and other important things and
                  as well as other users to relate well with the stories you
                  share on this platform. Do not forget that these informations
                  CANNOT be traced to you. <br /> We will never in anyway at any
                  time request for other personal informations such as email
                  addresses, residential addresses, phone numbers or any of the
                  social media platforms such as facebook usernames or links or
                  anything related to that. <br /> Please note that you should
                  be completely anonymous here unless you choose to show your
                  identity yourself which we strongly discourage.
                </div>
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
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
                      className="lg:w-[70%] lg:ml-[85px] rounded-lg"
                    />

                    {role.value !== "Anonymous" && (
                      <div className="fade-in-bck1">
                        <Form.Label className="mb-2 text-sm text-black mt-4 lg:ml-[85px]">
                          Counselling Field
                        </Form.Label>
                        <Select
                          value={field.value}
                          //   onChange={this.handleChange}
                          options={rooms}
                          onChange={(e) => {
                            setField(e);
                          }}
                          placeholder={field.value}
                          isSearchable={true}
                          className="lg:w-[70%] lg:ml-[85px] rounded-lg"
                        />
                        <Form.Label className="mb-2 text-sm text-black mt-4 lg:ml-[85px]">
                          Image
                        </Form.Label>
                        <br />
                        <input
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setImage(e.target.files[0]);

                            // console.log(e);
                            // console.log(image);
                          }}
                          className=" py-2 lg:w-[70%] lg:ml-[85px] "
                          required
                        />
                        <br />
                        <Form.Label className="mb-2 mt-4  text-sm text-black lg:ml-[85px] fade-in-bck1  ">
                          First Name
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={firstname}
                          onChange={(e) => {
                            setFirstname(e.target.value);
                          }}
                        />
                        <Form.Label className="mb-2 mt-4  text-sm text-black lg:ml-[85px] fade-in-bck1  ">
                          Last Name
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={lastname}
                          onChange={(e) => {
                            setLastname(e.target.value);
                          }}
                        />
                        <br />
                        <Form.Label className="mb-2 mt-4  text-sm text-black lg:ml-[85px] fade-in-bck1  ">
                          BIO
                        </Form.Label>
                        <br />
                        <textarea
                          name="bio"
                          id=""
                          rows={10}
                          value={bio}
                          placeholder="Tell us About you"
                          className="bio lg:ml-[85px] rounded w-full lg:w-[400px]  placeholder:text-black p-3"
                          onChange={(e) => {
                            setBio(e.target.value);
                          }}
                        ></textarea>

                        <br />
                        <Form.Label className="mb-2 mt-4  text-sm text-black lg:ml-[85px] fade-in-bck1  ">
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

                    {role.value === "Anonymous" && (
                      <div>
                        <Form.Label className="mb-2 mt-4  text-sm text-black lg:ml-[85px] fade-in-bck1  ">
                          Usercode
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={usercode}
                          onChange={(e) => {
                            setUsercode(e.target.value);
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
                  <Form.Group controlId="validationCustom01" className="">
                    <Form.Label className="mb-2 text-sm text-black mt-4 lg:ml-[85px]">
                      Gender
                    </Form.Label>
                    <Select
                      value={gender}
                      onChange={(e) => {
                        setGender(e);

                        if (validateErrors !== "hello") {
                          setValidateErrors(!validateErrors);
                        }
                      }}
                      //   onChange={this.handleChange}
                      options={genderOptions}
                      isSearchable={true}
                      className="lg:w-[70%] lg:ml-[85px]  rounded-lg "
                    />
                    {showgendererror && (
                      <div className="mt-3  lg:ml-[85px] text-xs text-[red]">
                        This field can't be empty
                      </div>
                    )}
                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      Please provide a valid Gender.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustom01" className="mt-4 ">
                    <Form.Label className="mb-2 text-sm text-black lg:ml-[85px]">
                      Date of Birth
                    </Form.Label>
                    <Form.Control
                      required
                      type="date"
                      value={dob}
                      onChange={(e) => {
                        setDob(e.target.value);
                      }}
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      Please provide a valid date.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustom01">
                    <Form.Label className="mb-2 text-sm text-black mt-4 lg:ml-[85px]">
                      Country
                    </Form.Label>
                    <Select
                      value={selectedCountry}
                      onChange={(e) => {
                        setSelectedCountry(e);
                        setSelectedState("");
                        if (validateErrors !== "hello") {
                          setValidateErrors(!validateErrors);
                        }
                      }}
                      options={allCountries}
                      isSearchable={true}
                      className="lg:w-[70%] lg:ml-[85px] rounded-lg"
                    />
                    {showcountryerror && (
                      <div className="mt-3  lg:ml-[85px] text-xs text-[red]">
                        This field can't be empty
                      </div>
                    )}

                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      Please provide a valid Country.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustom01">
                    <Form.Label className="mb-2 text-sm text-black mt-4 lg:ml-[85px]">
                      State
                    </Form.Label>
                    <Select
                      value={selectedState}
                      //   onChange={this.handleChange}
                      options={allStates}
                      onChange={(e) => {
                        setSelectedState(e);
                        if (validateErrors !== "hello") {
                          setValidateErrors(!validateErrors);
                        }
                      }}
                      isSearchable={true}
                      className="lg:w-[70%] lg:ml-[85px] rounded-lg"
                    />
                    {showstateerror && (
                      <div className="mt-3  lg:ml-[85px] text-xs text-[red]">
                        This field can't be empty
                      </div>
                    )}

                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      Please provide a valid State.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="validationCustom01">
                    <Form.Label className="mb-2 text-sm text-black mt-4 lg:ml-[85px]">
                      Password Recovery Question 1
                    </Form.Label>
                    <Select
                      value={rq1}
                      onChange={(e) => {
                        setRq1(e);
                        if (validateErrors !== "hello") {
                          setValidateErrors(!validateErrors);
                        }
                      }}
                      options={recoveryQuestions}
                      isSearchable={true}
                      className="lg:w-[70%] lg:ml-[85px] rounded-lg"
                    />
                    {shows1error && (
                      <div className="mt-3  lg:ml-[85px] text-xs text-[red]">
                        This field can't be empty
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
                    <Form.Label className="mb-2 text-sm text-black lg:ml-[85px]">
                      Answer
                    </Form.Label>
                    <Form.Control
                      required
                      minLength={2}
                      type="text"
                      value={rqanswer1}
                      onChange={(e) => {
                        setRqanswer1(e.target.value);
                      }}
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      This field can't be empty
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustom01">
                    <Form.Label className="mb-2 text-sm text-black mt-4 lg:ml-[85px]">
                      Password Recovery Question 2
                    </Form.Label>
                    <Select
                      value={rq2}
                      onChange={(e) => {
                        setRq2(e);
                        if (validateErrors !== "hello") {
                          setValidateErrors(!validateErrors);
                        }
                      }}
                      required
                      options={recoveryQuestions}
                      isSearchable={true}
                      className="lg:w-[70%] lg:ml-[85px] rounded-lg"
                    />
                    {shows2error && (
                      <div className="mt-3  lg:ml-[85px] text-xs text-[red]">
                        This field can't be empty
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
                    <Form.Label className="mb-2 text-sm text-black lg:ml-[85px]">
                      Answer
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      min="2"
                      value={rqanswer2}
                      onChange={(e) => {
                        setRqanswer2(e.target.value);
                      }}
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      This field can't be empty
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustom01">
                    <Form.Label className="mb-2 text-sm text-black mt-4 lg:ml-[85px]">
                      Password Recovery Question 3
                    </Form.Label>

                    <Select
                      value={rq3}
                      onChange={(e) => {
                        setRq3(e);
                        if (validateErrors !== "hello") {
                          setValidateErrors(!validateErrors);
                        }
                      }}
                      options={recoveryQuestions}
                      isSearchable={true}
                      className="lg:w-[70%] lg:ml-[85px] rounded-lg"
                    />
                    {shows3error && (
                      <div className="mt-3  lg:ml-[85px] text-xs text-[red]">
                        This field can't be empty
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
                    <Form.Label className="mb-2 text-sm text-black lg:ml-[85px]">
                      Answer
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={rqanswer3}
                      onChange={(e) => {
                        setRqanswer3(e.target.value);
                      }}
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      This field can't be empty
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustom01" className="mt-4 ">
                    <Form.Label className="mb-2 text-sm text-black  lg:ml-[85px]">
                      Password
                    </Form.Label>
                    <Form.Control
                      required
                      minLength={8}
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      This field should be at least 8 characters long
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustom01" className="mt-4 ">
                    <Form.Label className="mb-2 text-sm text-black  lg:ml-[85px]">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      required
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmpassword(e.target.value);
                      }}
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="mt-3  lg:ml-[85px] text-xl"
                    >
                      This field can't be empty
                    </Form.Control.Feedback>
                  </Form.Group>

                  <button
                    type="submit"
                    className="  form-top text-white px-[30px] py-[15px] rounded-2xl mt-4 lg:ml-[85px] mb-3 "
                  >
                    Register
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>

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
    )
  );
};

export default Register;

// npm init vite
