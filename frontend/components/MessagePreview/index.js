export default function MessagePreview({ name, surname }) {
  return (
    <div className="hover:cursor-pointer bg-[#161A30] p-3 rounded-lg flex items-center place-content-between">
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
            {name + " " + surname}
          </p>
        </div>
      </div>
    </div>
  );
}
