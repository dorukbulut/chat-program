"use client";
import { useAxios } from "@/hooks";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
export default function Dashboard() {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    username: "",
  });

  const { data } = useSession({
    required: true,
  });

  const { api } = useAxios(data?.user?.access_token);

  useEffect(() => {
    if (data) {
      console.log(data);
      api
        .get(`/user/get/${data.user.username}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [data]);
  const Logout = async (e) => {
    e.preventDefault();

    const reqdata = {
      token: data.user.access_token,
    };
    try {
      const res = await api.post("/user/revoke", reqdata);
      await signOut({
        callbackUrl: "http://localhost:3000/login",
        redirect: true,
      });
      destroyAuth();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="flex flex-col h-screen p-5  gap-10">
      <section className="flex flex-row items-center place-content-between gap-10 bg-[#31304D] rounded-xl p-7">
        <div className="flex gap-16 items-center">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100.353 100.353"
            style={{
              enableBackground: "new 0 0 100.353 100.353",
              fill: "#231F20",
            }}
            xmlSpace="preserve"
            width="50" // Adjust the width as needed
            height="50" // Adjust the height as needed
          >
            <path
              style={{ fill: "#B6BBC4" }}
              d="M92.016 18.026H55.518c-2.857 0-5.181 2.324-5.181 5.181v4.354H9.46c-3.669 0-6.654 2.985-6.654 6.655v30.723c0 3.668 2.985 6.652 6.654 6.652h6.391v12.884c0 0.594 0.35 1.131 0.893 1.372c0.195 0.086 0.401 0.128 0.606 0.128c0.366 0 0.728-0.134 1.009-0.39l15.403-13.994h26.804c3.668 0 6.653-2.984 6.653-6.652v-14.61h7.273l10.877 9.881c0.282 0.256 0.643 0.39 1.009 0.39c0.205 0 0.412-0.042 0.607-0.128c0.543-0.24 0.893-0.778 0.893-1.372v-8.771h4.137c2.855 0 5.178-2.325 5.178-5.182v-21.94C97.194 20.35 94.872 18.026 92.016 18.026zM64.22 64.938c0 2.014-1.639 3.652-3.653 3.652H33.183c-0.373 0-0.732 0.139-1.009 0.39L18.85 81.085V70.09c0-0.829-0.671-1.5-1.5-1.5H9.459c-2.015 0-3.654-1.638-3.654-3.652V34.215c0-2.015 1.639-3.655 3.654-3.655h42.363c0.005 0 0.01 0.001 0.015 0.001s0.01-0.001 0.015-0.001h8.715c2.015 0 3.653 1.64 3.653 3.655L64.22 64.938L64.22 64.938zM94.194 45.147c0 1.203-0.977 2.182-2.178 2.182h-5.637c-0.828 0-1.5 0.671-1.5 1.5v6.882l-8.798-7.992c-0.276-0.25-0.636-0.39-1.009-0.39h-7.853V34.216c0-3.669-2.985-6.655-6.653-6.655h-7.229v-4.354c0-1.203 0.979-2.181 2.181-2.181h36.498c1.201 0 2.178 0.978 2.178 2.181V45.147z"
            />
          </svg>
          <div>
            <p className="tracking-wider font-bold text-[#B6BBC4]">
              {user.name + " " + user.surname}
            </p>
            <div>
              <div className="flex items-center gap-2">
                <p className="tracking-wider font-light text-[#B6BBC4]">
                  Online
                </p>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style={{
                    enableBackground: "new 0 0 512 512",
                    width: "16px",
                    height: "16px",
                  }}
                  xmlSpace="preserve"
                >
                  <style>
                    {`
        .st0{fill:none;stroke:#00D000;stroke-width:15;stroke-miterlimit:10;}
        .st1{fill:#00D000;}
        .st2{fill:none;}
        .st3{fill:#FFFFFF;}
        .st4{font-family:'ArialMT';}
        .st5{font-size:250px;}
      `}
                  </style>
                  <g id="Layer_1">
                    <g id="Layer_2_background">
                      <g>
                        <circle
                          className="st0"
                          cx="256.0887"
                          cy="255.7101"
                          r="239.3491"
                        ></circle>
                      </g>
                    </g>
                    <circle
                      className="st1"
                      cx="256"
                      cy="255.7101"
                      r="222.1893"
                    ></circle>
                  </g>
                  <g id="Layer_2">
                    <rect
                      x="49.0213"
                      y="174.9574"
                      className="st2"
                      width="407.2979"
                      height="184.5957"
                    ></rect>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="max-w-md mx-auto flex items-center   bg-[#161A30] rounded-lg shadow">
            <svg
              style={{ width: "70px", height: "70px" }}
              version="1.1"
              className="ml-5 mr-2"
              viewBox="0 0 129 129"
              enableBackground="new 0 0 129 129"
            >
              <g>
                <path
                  className="fill-current text-gray-500"
                  d="M51.6,96.7c11,0,21-3.9,28.8-10.5l35,35c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2c1.6-1.6,1.6-4.2,0-5.8l-35-35   c6.5-7.8,10.5-17.9,10.5-28.8c0-24.9-20.2-45.1-45.1-45.1C26.8,6.5,6.5,26.8,6.5,51.6C6.5,76.5,26.8,96.7,51.6,96.7z M51.6,14.7   c20.4,0,36.9,16.6,36.9,36.9C88.5,72,72,88.5,51.6,88.5c-20.4,0-36.9-16.6-36.9-36.9C14.7,31.3,31.3,14.7,51.6,14.7z"
                ></path>
              </g>
            </svg>
            <input
              className="w-screen  focus:outline-none text-sm bg-[#161A30] text-white"
              type="text"
              placeholder="Search Users by username..."
            />
          </div>
        </div>

        <div className="flex items-center gap-10">
          <svg
            className="w-6 h-6 stroke-current text-white "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path
              className="fill-white"
              d="M26,21.5L25,20c-1.6-2.4-2.4-5.3-2.4-8.2c0-3.1-2-5.7-4.7-6.5C17.6,4.5,16.8,4,16,4s-1.6,0.5-1.9,1.3
    c-2.7,0.8-4.7,3.4-4.7,6.5c0,2.9-0.8,5.8-2.4,8.2l-1,1.5c-0.4,0.7,0,1.5,0.8,1.5h18.3C25.9,23,26.4,22.1,26,21.5z"
            ></path>
            <path
              className="fill-white"
              d="M19,26c0,1.7-1.3,3-3,3s-3-1.3-3-3"
            ></path>
          </svg>

          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3" y2="6"></line>
            <line x1="3" y1="12" x2="3" y2="12"></line>
            <line x1="3" y1="18" x2="3" y2="18"></line>
          </svg>

          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <defs>
              <style>
                {`.a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;}`}
              </style>
            </defs>
            <title>cog</title>
            <path
              className="a"
              d="M20.254,13.5H22.5a1,1,0,0,0,1-1v-1a1,1,0,0,0-1-1H20.253a11.8,11.8,0,0,0-1-2.922L20.839,5.99a1,1,0,0,0,0-1.414L19.424,3.161a1,1,0,0,0-1.414,0L16.42,4.75a11.769,11.769,0,0,0-2.92-1V1.5a1,1,0,0,0-1-1h-1a1,1,0,0,0-1,1V3.748a11.777,11.777,0,0,0-2.921,1L5.989,3.161a1,1,0,0,0-1.414,0L3.16,4.576a1,1,0,0,0,0,1.414L4.75,7.579a11.821,11.821,0,0,0-1,2.921H1.5a1,1,0,0,0-1,1v1a1,1,0,0,0,1,1H3.746a11.821,11.821,0,0,0,1,2.921l-1.59,1.59a1,1,0,0,0,0,1.414l1.415,1.414a1,1,0,0,0,1.414,0l1.589-1.589A11.8,11.8,0,0,0,10.5,20.254V22.5a1,1,0,0,0,1,1h1a1,1,0,0,0,1-1V20.254a11.8,11.8,0,0,0,2.92-1l1.591,1.589a1,1,0,0,0,1.414,0l1.414-1.414a1,1,0,0,0,0-1.414l-1.589-1.59A11.821,11.821,0,0,0,20.254,13.5Z"
            ></path>
            <circle className="a" cx="12" cy="12" r="4.5"></circle>
          </svg>
          <svg
            className="w-6 h-6 hover:cursor-pointer"
            onClick={Logout}
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.2607 59.6533H5.09375C3.74334 59.6519 2.44864 59.1148 1.49371 58.16C0.538772 57.2051 0.00158553 55.9105 0 54.5601L0 5.43896C0.00158553 4.08855 0.538772 2.7939 1.49371 1.83906C2.44864 0.88422 3.74334 0.347159 5.09375 0.345703H35.2607C36.6111 0.347194 37.9056 0.884297 38.8604 1.83916C39.8152 2.79402 40.3522 4.08865 40.3535 5.43896V19.6108C40.3535 19.8761 40.2482 20.1304 40.0606 20.318C39.8731 20.5055 39.6187 20.6108 39.3535 20.6108C39.0883 20.6108 38.834 20.5055 38.6464 20.318C38.4589 20.1304 38.3535 19.8761 38.3535 19.6108V5.43896C38.3526 4.61895 38.0265 3.83277 37.4467 3.25289C36.8669 2.673 36.0808 2.34675 35.2607 2.3457H5.09375C4.27359 2.34656 3.48725 2.67272 2.90726 3.25262C2.32727 3.83252 2.00099 4.6188 2 5.43896V54.5601C2.00099 55.3802 2.32727 56.1665 2.90726 56.7464C3.48725 57.3263 4.27359 57.6525 5.09375 57.6533H35.2607C36.0808 57.6523 36.8669 57.326 37.4467 56.7461C38.0265 56.1663 38.3526 55.3801 38.3535 54.5601V40.3696C38.3535 40.1044 38.4589 39.8501 38.6464 39.6625C38.834 39.475 39.0883 39.3696 39.3535 39.3696C39.6187 39.3696 39.8731 39.475 40.0606 39.6625C40.2482 39.8501 40.3535 40.1044 40.3535 40.3696V54.5601C40.3522 55.9104 39.8152 57.205 38.8604 58.1599C37.9056 59.1147 36.6111 59.6518 35.2607 59.6533V59.6533ZM53.2334 29.9966C53.2334 29.8653 53.2076 29.7352 53.1573 29.6139C53.1071 29.4925 53.0334 29.3823 52.9406 29.2894C52.8477 29.1965 52.7375 29.1229 52.6161 29.0726C52.4948 29.0224 52.3647 28.9965 52.2334 28.9966H24.5254C24.2602 28.9966 24.0058 29.1019 23.8183 29.2895C23.6308 29.477 23.5254 29.7314 23.5254 29.9966C23.5254 30.2618 23.6308 30.5162 23.8183 30.7037C24.0058 30.8912 24.2602 30.9966 24.5254 30.9966H52.2334C52.3647 30.9966 52.4948 30.9708 52.6161 30.9205C52.7375 30.8703 52.8477 30.7966 52.9406 30.7038C53.0334 30.6109 53.1071 30.5006 53.1573 30.3793C53.2076 30.258 53.2334 30.1279 53.2334 29.9966V29.9966ZM52.9404 39.1656L58.5078 33.5982C59.4617 32.6423 59.9975 31.3471 59.9975 29.9966C59.9975 28.6462 59.4617 27.3509 58.5078 26.3951L52.9404 20.8277C52.8476 20.7348 52.7373 20.6612 52.616 20.6109C52.4947 20.5607 52.3647 20.5348 52.2334 20.5348C52.1021 20.5348 51.972 20.5607 51.8507 20.6109C51.7294 20.6612 51.6192 20.7348 51.5263 20.8277C51.4335 20.9205 51.3598 21.0308 51.3096 21.1521C51.2593 21.2734 51.2335 21.4034 51.2335 21.5347C51.2335 21.666 51.2593 21.7961 51.3096 21.9174C51.3598 22.0387 51.4335 22.1489 51.5263 22.2418L57.0937 27.8091C57.673 28.3898 57.9983 29.1765 57.9983 29.9966C57.9983 30.8168 57.673 31.6035 57.0937 32.1841L51.5264 37.7515C51.4326 37.8441 51.358 37.9544 51.307 38.076C51.256 38.1975 51.2295 38.328 51.2291 38.4598C51.2287 38.5917 51.2543 38.7223 51.3046 38.8442C51.3548 38.966 51.4287 39.0768 51.5219 39.17C51.6152 39.2632 51.7259 39.3371 51.8478 39.3873C51.9697 39.4376 52.1003 39.4633 52.2321 39.4628C52.364 39.4624 52.4944 39.4359 52.616 39.3849C52.7375 39.3339 52.8478 39.2593 52.9404 39.1655L52.9404 39.1656Z"
              fill="white"
            ></path>
          </svg>
        </div>
      </section>
      <section className="grid grid-cols-8 h-screen bg-[#31304D] rounded-xl">
        <div className="flex flex-col gap-10 col-span-2 border-r-[#161A30] p-5 border-r-2 border-opacity-25">
          <p className="font-bold text-[#B6BBC4] tracking-wider">Messages</p>
          <div className="space-y-3">
            <div className="bg-[#161A30] p-3 rounded-lg flex items-center place-content-between">
              <div className="flex gap-5 items-center ">
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  style={{ width: "50px", height: "50px" }}
                >
                  <title>Profile</title>
                  <path
                    id="User_Circle"
                    data-name="User Circle"
                    d="M12.5,25A12.5,12.5,0,1,1,25,12.5,12.51,12.51,0,0,1,12.5,25ZM4.75,21a11.48,11.48,0,0,0,15.5,0c-.69-1.58-2.71-2.42-4.34-3.09S14,16.3,14,15.5a3,3,0,0,1,.93-2.12,3.41,3.41,0,0,0,1.14-2.64A3.51,3.51,0,0,0,12.5,7,3.44,3.44,0,0,0,9,10.74a3.35,3.35,0,0,0,1.08,2.64A3,3,0,0,1,11,15.5c0,.8-.22,1.7-1.84,2.36S5.44,19.41,4.75,21ZM12.5,6a4.5,4.5,0,0,1,4.57,4.74,4.38,4.38,0,0,1-1.48,3.39A2,2,0,0,0,15,15.5c0,.44,0,.94,1.21,1.44,1.68.7,3.82,1.59,4.78,3.31a11.5,11.5,0,1,0-17,0C5,18.53,7.1,17.64,8.7,17,10,16.44,10,15.92,10,15.5a2,2,0,0,0-.56-1.37A4.36,4.36,0,0,1,8,10.74,4.41,4.41,0,0,1,12.5,6Z"
                    fill="#B6BBC4"
                  ></path>
                </svg>
                <div>
                  <p className="font-extrabold opacity-75 tracking-wide">
                    Enes Sevim
                  </p>
                  <p className="font-extrabold text-sm">
                    Enes: Bırak bu işleri.
                  </p>
                </div>
              </div>
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 54 54"
                style={{
                  enableBackground: "new 0 0 54 54",
                  width: "25px",
                  height: "25px",
                }}
                xmlSpace="preserve"
              >
                <path
                  style={{ fill: "#43B05C" }}
                  d="M43.5,19c-4.971,0-9-4.029-9-9c0-0.688,0.084-1.356,0.231-2H4.735C2.396,8,0.5,9.896,0.5,12.235
        v37.53C0.5,52.104,2.396,54,4.735,54h37.53c2.339,0,4.235-1.896,4.235-4.235V18.477C45.56,18.81,44.554,19,43.5,19z"
                ></path>
                <circle
                  style={{
                    fill: "#DD352E",
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeMiterlimit: 10,
                  }}
                  cx="43.5"
                  cy="10"
                  r="9"
                ></circle>
                {/* Add additional elements or groups if needed */}
              </svg>
            </div>

            <div className="bg-[#161A30] p-3 rounded-lg flex items-center place-content-between">
              <div className="flex gap-5 items-center ">
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  style={{ width: "50px", height: "50px" }}
                >
                  <title>Profile</title>
                  <path
                    id="User_Circle"
                    data-name="User Circle"
                    d="M12.5,25A12.5,12.5,0,1,1,25,12.5,12.51,12.51,0,0,1,12.5,25ZM4.75,21a11.48,11.48,0,0,0,15.5,0c-.69-1.58-2.71-2.42-4.34-3.09S14,16.3,14,15.5a3,3,0,0,1,.93-2.12,3.41,3.41,0,0,0,1.14-2.64A3.51,3.51,0,0,0,12.5,7,3.44,3.44,0,0,0,9,10.74a3.35,3.35,0,0,0,1.08,2.64A3,3,0,0,1,11,15.5c0,.8-.22,1.7-1.84,2.36S5.44,19.41,4.75,21ZM12.5,6a4.5,4.5,0,0,1,4.57,4.74,4.38,4.38,0,0,1-1.48,3.39A2,2,0,0,0,15,15.5c0,.44,0,.94,1.21,1.44,1.68.7,3.82,1.59,4.78,3.31a11.5,11.5,0,1,0-17,0C5,18.53,7.1,17.64,8.7,17,10,16.44,10,15.92,10,15.5a2,2,0,0,0-.56-1.37A4.36,4.36,0,0,1,8,10.74,4.41,4.41,0,0,1,12.5,6Z"
                    fill="#B6BBC4"
                  ></path>
                </svg>
                <div>
                  <p className="font-extrabold opacity-75 tracking-wide">
                    Deniz Türk
                  </p>
                  <p className="font-extrabold opacity-50 text-sm">
                    Siz: Havelsan Nası.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center col-span-6 p-5">
          <div>
            <p className="text-2xl text-[#B6BBC4] tracking-wide font-extrabold">
              Welcome to the chat app!
            </p>
            <p className=" mt-4 text-gray-400">
              Your conversations will be displayed here.
            </p>
          </div>

          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100.353 100.353"
            style={{
              enableBackground: "new 0 0 100.353 100.353",
              fill: "#231F20",
            }}
            xmlSpace="preserve"
            width="100" // Adjust the width as needed
            height="100" // Adjust the height as needed
          >
            <path
              style={{ fill: "#B6BBC4" }}
              d="M92.016 18.026H55.518c-2.857 0-5.181 2.324-5.181 5.181v4.354H9.46c-3.669 0-6.654 2.985-6.654 6.655v30.723c0 3.668 2.985 6.652 6.654 6.652h6.391v12.884c0 0.594 0.35 1.131 0.893 1.372c0.195 0.086 0.401 0.128 0.606 0.128c0.366 0 0.728-0.134 1.009-0.39l15.403-13.994h26.804c3.668 0 6.653-2.984 6.653-6.652v-14.61h7.273l10.877 9.881c0.282 0.256 0.643 0.39 1.009 0.39c0.205 0 0.412-0.042 0.607-0.128c0.543-0.24 0.893-0.778 0.893-1.372v-8.771h4.137c2.855 0 5.178-2.325 5.178-5.182v-21.94C97.194 20.35 94.872 18.026 92.016 18.026zM64.22 64.938c0 2.014-1.639 3.652-3.653 3.652H33.183c-0.373 0-0.732 0.139-1.009 0.39L18.85 81.085V70.09c0-0.829-0.671-1.5-1.5-1.5H9.459c-2.015 0-3.654-1.638-3.654-3.652V34.215c0-2.015 1.639-3.655 3.654-3.655h42.363c0.005 0 0.01 0.001 0.015 0.001s0.01-0.001 0.015-0.001h8.715c2.015 0 3.653 1.64 3.653 3.655L64.22 64.938L64.22 64.938zM94.194 45.147c0 1.203-0.977 2.182-2.178 2.182h-5.637c-0.828 0-1.5 0.671-1.5 1.5v6.882l-8.798-7.992c-0.276-0.25-0.636-0.39-1.009-0.39h-7.853V34.216c0-3.669-2.985-6.655-6.653-6.655h-7.229v-4.354c0-1.203 0.979-2.181 2.181-2.181h36.498c1.201 0 2.178 0.978 2.178 2.181V45.147z"
            />
          </svg>
        </div>
      </section>
    </main>
  );
}
