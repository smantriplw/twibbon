import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import TypewriterComponent from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { stringToUint8Array, uint8ArrayToHex } from "uint8array-extras";

export default function Homepage() {
    const navigate = useNavigate();
    const [name, setName] = React.useState<string>('');
    const [allowed, setAllowed] = React.useState<boolean>(false);

    return (
        <section className="m-5 flex h-screen justify-center items-center flex-col space-y-5">
            <h1 className="text-center text-6xl font-sans font-bold break-words">
                Welcome, <span className="text-5xl lg:text-6xl"><a href="/avartanasastra" className="underline">Avartanasastra</a>!</span>
            </h1>
            {/* <p className="lg:text-2xl text-lg text-center text-balance"> */}
                <TypewriterComponent onInit={(typewriter) => {
                    typewriter.typeString("❤️ Hi ladies and gentleman 😎")
                        .pauseFor(1500)
                        .typeString(", are you ready to start your journey? 🤩")
                        .pauseFor(1000)
                        .deleteChars('to start your journey? 🤩'.length)
                        .typeString('being part of us? 🎉')
                        .pauseFor(1000)
                        .callFunction(() => setAllowed(true))
                        .start();
                }} options={{
                    delay: 40,
                    deleteSpeed: 2,
                    autoStart: true,
                    wrapperClassName: 'text-2xl lg:text-3xl text-center text-balance font-light',
                    cursor: '|',
                    cursorClassName: 'text-2xl Typewriter__cursor'
                }} />
            {/* </p> */}
            <div className="flex lg:flex-row flex-col space-x-10 justify-center items-center space-y-3">
                <input disabled={!allowed} value={name} onChange={(ev) => setName(ev.target.value)} id="nama" name="nama" placeholder={allowed ? "Put your name here..." : "wait the typing..."} className="font-bold ring-1 rounded-md text-center px-16 md:px-48 py-4 text-lg lg:text-xl ring-slate-300 focus:outline-none" />
            </div>
            <div className="lg:space-x-80 md:space-x-[380px] space-x-[100px] font-sans mt-5 flex flex-row">
                <div>
                    <button onClick={() => navigate('/mpls_twibbon/'.concat(uint8ArrayToHex(stringToUint8Array(name))))} className={twMerge("hover:bg-green-300 text-white font-black py-3 lg:text-2xl p-3 bg-green-500/90 rounded-lg duration-500 hover:shadow-2xl px-8 lg:px-10", "disabled:bg-green-900 disabled:blur-[0.8px] disabled:cursor-not-allowed disabled:hover:shadow-none disabled:select-none")} disabled={!name.length || !allowed}>
                        <FontAwesomeIcon icon={faCheck} /> YES
                    </button>
                </div>
                <div>
                    <button onClick={() => navigate('/very-sad/'.concat(uint8ArrayToHex(stringToUint8Array(`Sedih ya ${name}, sampai ketemu di lain waktu yaww~`))))} className="hover:bg-red-800 text-white font-black lg:text-2xl py-3 p-3 bg-red-500/90 rounded-lg duration-500 hover:shadow-2xl px-8 lg:px-10 disabled:bg-red-900 disabled:blur-[0.8px] disabled:cursor-not-allowed disabled:hover:shadow-none disabled:select-none" disabled={!name.length || !allowed}>
                        <FontAwesomeIcon icon={faXmark} /> NO
                    </button>
                </div>
            </div>
        </section>
    )
}