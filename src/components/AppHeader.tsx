import logo from "../../assets/images/tornado-main.svg"; // TODO REMOVE THIS, cool but stolen from Tornado Cash
import { APP_NAME } from "../constants";

const AppHeader = () => {
  return (
    <>
      <img
        src="/indago-main.png"
        className="animate-speed h-96"
        style={{ animationDuration: "20s" }}
        alt="logo"
      />
      <p className="z-50 -mt-16 bg-gradient-to-r from-tornado-green to-green-600 bg-clip-text text-5xl font-black text-transparent selection:bg-transparent">
        <span className="font-mono italic">{APP_NAME.toUpperCase()}</span>
      </p>
      <p className="bg-gradient-to-r from-tornado-green to-green-600 bg-clip-text text-xl font-black text-transparent selection:bg-transparent">
        <span className="font-mono">Money Laundering Detection</span>
      </p>
    </>
  );
};

export default AppHeader;
