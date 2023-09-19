import React, { useEffect } from "react";

import red1 from "../utils/red1.jpg";
// import red1 from "../utils/redbg1.jpg";
import { Navbar } from "../subcomponents/navbar";
import logo from "../utils/secondconfess.png";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, EffectFade } from "swiper";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" ">
      <Navbar></Navbar>
      <div className="relative">
        <img
          loading="eager"
          src={red1}
          alt=""
          className="absolute h-[100%] lg:min-h-[100vh]    w-screen object-cover brightness-[10%]"
        />
        <div className="relative    text-white h-[100%]  lg:min-h-[90vh]  flex flex-col lg:flex-row justify-center items-center  lg:ml-[10px] pt-[12vh] md:pt-[4vh] pb-[15vh] lg:pt-[4vh] lg:pb-[10vh]   ">
          <div className="lg:w-[60vw]  flex items-center justify-center flex-col">
            <div className="lefthome md:mt-9">
              <div className=" welcome  self-center lg:self-start  text-[40px] md:text-[65px] lg:text-[60px]  leading-[50px] md:leading-[70px] lg:leading-[70px] slide-in-left  ">
                <span> Welcome to</span> <br />
              </div>
              <p
                style={{ color: "red" }}
                className=" welcome  self-center lg:self-start  text-[40px] md:text-[65px] lg:text-[60px]  leading-[50px] md:leading-[70px] lg:leading-[70px] p-0 slide-in-left2"
              >
                MyConfessionz
              </p>
              <Swiper
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay]}
                className=" self-start mt-[50px] md:mt-[20px] lg:mt-[30px] slide-in-left3 "
              >
                <SwiperSlide>
                  " I've Had 5 Abortions For My Husband's Dad!, My Husband Is
                  Not Aware, Now I'm Carrying Another Baby And It's Still Not My
                  Husband's "<p className="mt-3 fw-bold">- anonymous32210 -</p>
                </SwiperSlide>
                <SwiperSlide>
                  Share Your Dark Confessions Anonymously!
                </SwiperSlide>
                <SwiperSlide>
                  I Like To Be Beaten In A Relationship, If You Don't Beat Me, I
                  Believe You Don't Love Me, Am I Not Normal? "
                  <p className="mt-3 fw-bold">- anonymous52126 -</p>
                </SwiperSlide>
                <SwiperSlide>
                  Share Your Dark Confessions Anonymously!
                </SwiperSlide>
                <SwiperSlide>
                  " I Already Lost My Womb To One Of My Abortions In The
                  University I've Been Married For Close To 7 Years Now And I
                  Don't Have A Child And My Husband Does Not Know Why "
                  <p className="mt-3 fw-bold">- anonymous225536 -</p>
                </SwiperSlide>
                <SwiperSlide>
                  Explore Diverse Pool Of Dark And Deep Confessions!
                </SwiperSlide>
                <SwiperSlide>
                  " Had A One Nyt Stand Wit Dis Guy, Nw I've Bn Diagnosed Of A
                  Disease Only Found In Dead Bodies, Later Askd Where He Wrks,
                  Turned To B A Morgue, Omg! Def Must've Bn Slping Wit Dead
                  Bodies!, I Feel So Disgusted! "
                  <p className="mt-3 fw-bold">- anonymous5573698 -</p>
                </SwiperSlide>

                <SwiperSlide>
                  Share Your Dark Confessions Anonymously!
                </SwiperSlide>
              </Swiper>
              <div className=" mt-[50px] mb-[90px] lg:mt-[20px] lg:mb-[0]  flex justify-center items-center  text-center lg:justify-start lg:text-start slide-in-left3 ">
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  class="button-83 uppercase "
                  style={{}}
                  role="button"
                >
                  Register now
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  class="button-83 uppercase button-83mod"
                  role="button"
                >
                  Login now
                </button>
              </div>
            </div>
          </div>

          <div className="logo flex justify-center    lg:w-[60vw] fade-in-bck">
            <img
              loading="lazy"
              src={logo}
              alt=""
              className="h-[50vh] md:h-[70vh]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
