import { useState } from "react";
import logo from "../assets/images/tornado-main.svg"; // TODO REMOVE THIS, cool but stolen from Tornado Cash
import InputField from "./components/InputField";

function App() {
  return (
    <div className="text-center selection:bg-green-900">
      <header className="flex min-h-screen flex-col items-center justify-center bg-tornado-dark text-white">
        <img
          src={logo}
          className="animate-speed h-60 motion-safe:animate-spin"
          alt="logo"
        />
        <style>
          {
            "\
            .animate-speed{\
              animation-duration:20s;\
            }\
          "
          }
        </style>
        <p className="mt-14 bg-gradient-to-r from-tornado-green to-green-600 bg-clip-text text-4xl font-black text-transparent selection:bg-transparent">
          0x<span className="italic">AML</span>
        </p>
        <p className="bg-gradient-to-r from-tornado-green to-green-600 bg-clip-text text-2xl font-black text-transparent selection:bg-transparent">
          Money Laundering Detection
        </p>
        <div className="mt-4 w-96 max-w-full px-5">
          <InputField />
        </div>
        <p className="mt-3 flex gap-3 text-center text-[#8d96a7]">
          <a
            className="text-tornado-green transition-all hover:text-green-700"
            href="https://github.com/ethereum-aml-tool"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {" | "}
          <a
            className="text-tornado-green transition-all hover:text-green-700"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            What is this?
          </a>
          {" | "}
          <a
            className="text-tornado-green transition-all hover:text-green-700"
            href="https://www.chalmers.se/en/education/programmes/masters-info/Pages/Software-Engineering-and-Technology.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chalmers
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
