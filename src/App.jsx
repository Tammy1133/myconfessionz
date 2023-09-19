import "./App.css";
import { Main } from "./components/main";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes } from "react-router-dom";
import Login from "./subcomponents/login";
import Register from "./subcomponents/register";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PasswordReset } from "./subcomponents/password-reset";
import { HomePage } from "./components/homepage";
import { Terms } from "./components/terms";
import { Privacy } from "./components/privacy";
import { EachPost } from "./components/eachpost";
import { Explore } from "./components/explore";
import { Rooms } from "./components/rooms";

import { CreateNew } from "./components/createnew";
import { Profile } from "./components/profile";
import { Eachcounsellor } from "./components/eachcounsellor";
import { Searchcounsellors } from "./components/searchcounsellors";
import { EachRoom } from "./components/eachrooms";
import { Chats } from "./components/chats";
import { Chatsright } from "./components/chatsright";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/chats" element={<Chatsright></Chatsright>}></Route>

        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/homepage" element={<HomePage></HomePage>}></Route>
        <Route path="/terms" element={<Terms></Terms>}></Route>
        <Route path="/privacy" element={<Privacy></Privacy>}></Route>
        <Route path="/explore" element={<Explore></Explore>}></Route>
        <Route path="/rooms" element={<Rooms></Rooms>}></Route>
        {/* <Route path="/room/:name" element={<EachRoom></EachRoom>}></Route> */}
        <Route path="/post/show/:id" element={<EachPost></EachPost>}></Route>
        <Route path="/post/create" element={<CreateNew></CreateNew>}></Route>
        <Route
          path="/counsellor/:id"
          element={<Eachcounsellor></Eachcounsellor>}
        ></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>

        <Route
          path="/password-reset"
          element={<PasswordReset></PasswordReset>}
        ></Route>
        <Route
          path="/searchcounsellors"
          element={<Searchcounsellors></Searchcounsellors>}
        ></Route>
        <Route path="/room/:name" element={<EachRoom></EachRoom>}></Route>
      </Routes>
    </div>
  );
}

export default App;
