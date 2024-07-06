// This file will be removed soon

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import TypewriterComponent from "typewriter-effect";
import { hexToUint8Array, uint8ArrayToString } from "uint8array-extras";
import { CanvasTwibbon } from '../components/twibbon/canvas';
import { useTwibbonCanvas } from "../hooks/useTwibbonCanvas";
import CopyToClipboard from "react-copy-to-clipboard";
import { captionTemplate } from "../constants/caption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faDownload, faGears, faRefresh } from "@fortawesome/free-solid-svg-icons";

const MplsTwibbonPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const canvasHook = useTwibbonCanvas();

    const [decoded, setDecode] = React.useState<string>();
    const [fileName, setFileName] = React.useState<string>();
    const [generatedUrl, setGeneratedUrl] = React.useState<string>();
    const [formShowed, setShowed] = React.useState<boolean>(false);

    const message = params.name_hash!;
    React.useEffect(() => {
        try {
            setDecode(uint8ArrayToString(hexToUint8Array(message)));
        } catch {
            navigate('/');
        }
    }, [setDecode, navigate, message]);

    React.useEffect(() => {
        canvasHook.addBackground('/mpls_smanti.png');
    }, [formShowed]);

    return (
        <section className="flex justify-center items-center flex-col space-y-4 md:space-y-6">
            <h1 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                MPLS TWIBOO
            </h1>
            {decoded && <TypewriterComponent onInit={(typewriter) => {
                typewriter
                    .typeString('Hai!')
                    .pauseFor(1000)
                    .deleteChars(1)
                    .typeString(`, <span class="font-bold">${decoded}</span>!`)
                    .pauseFor(1000)
                    .typeString(`<p>Upload foto terbaik dirimu dibawah ya...</p>`)
                    .pauseFor(500)
                    .typeString(`<p class="font-bold">Terimakasih!</p>`)
                    .pauseFor(1000)
                    .callFunction(() => canvasHook.addBackground('/mpls_smanti.png'))
                    .callFunction(() => setShowed(true))
                    .start();
            }} options={{
                delay: 30,
                deleteSpeed: 0.5,
                autoStart: true,
                wrapperClassName: 'text-lg md:text-2xl',
                cursorClassName: twMerge('Typewriter__cursor', 'text-2xl'),
            }} />}

            <form hidden={!formShowed}>
                <div className="flex flex-row items-center">
                    <input
                        type="file"
                        id="foto_profile"
                        onChange={async (ev) => {
                            setFileName(ev.currentTarget.files?.[0]?.name);
                            
                            if (ev.currentTarget.files?.length) {
                                canvasHook.addFrame(URL.createObjectURL(ev.currentTarget.files[0]));
                            }
                        }}
                        hidden
                    />
                    <label
                        htmlFor="foto_profile"
                        className="block mr-4 py-1 px-2 lg:py-2 lg:px-4
                            rounded-md border-0 lg:text-xl text-md font-semibold bg-teal-100
                            text-teal-700 hover:bg-teal-200 cursor-pointer duration-100"
                        >
                        Choose file
                    </label>
                    <label className="lg:text-xl text-md text-slate-500">{fileName ?? '-'}</label>
                </div>
            </form>

            <div className="flex justify-center items-center space-y-4 flex-col" hidden={!formShowed}>
                <CanvasTwibbon hidden={!formShowed} width={canvasHook.recommendedSize.width} height={canvasHook.recommendedSize.height} canvasid="canvas_twb" ref={canvasHook.canvasRef} />
                <div hidden={!fileName?.length}>
                    <label className="text-lg font-semibold text-slate-600">Zoom</label>
                    <input
                        type="range"
                        min="0.01"
                        max="5"
                        step="0.01"
                        value={canvasHook.scaledNumber}
                        onChange={(ev) => {
                            canvasHook.setScaled(parseFloat(ev.currentTarget.value));
                        }}
                        className="w-full bg-teal-500"
                    />
                </div>
                <div className="space-x-4 flex items-center justify-center">
                    <button onClick={() => {
                        const dataUrl = canvasHook.toDataUrl();
                        
                        if (dataUrl) {
                            setGeneratedUrl(dataUrl);
                        }
                    }} hidden={!formShowed} disabled={!fileName?.length} className="focus:bg-teal-900 disabled:cursor-not-allowed disabled:blur-[1px] disabled:bg-teal-700 text-xl font-sans font-semibold p-3 bg-teal-400 rounded-full text-white px-4 duration-300 hover:shadow-lg">
                        <FontAwesomeIcon icon={faGears} /> Generate
                    </button>
                    <button hidden={!formShowed} onClick={() => navigate(0)} className="text-xl font-sans font-semibold p-3 bg-teal-400 rounded-full text-white px-4 duration-300 hover:shadow-lg">
                        <FontAwesomeIcon icon={faRefresh} /> Refresh
                    </button>
                    <a href={generatedUrl ?? '#'} download={'MPLS_SMANTI_2024_'.concat(decoded?.replace(/\s+/g, '_') ?? '.jpeg', '.jpeg')} hidden={!generatedUrl?.length} className="disabled:cursor-not-allowed disabled:blur-[1px] disabled:bg-teal-700 text-xl font-sans font-semibold p-3 bg-teal-400 rounded-full text-white px-4 duration-300 hover:shadow-lg">
                        <FontAwesomeIcon icon={faDownload} /> Download
                    </a>
                    {(decoded?.length && formShowed && fileName?.length) && <CopyToClipboard text={captionTemplate(decoded!)} onCopy={() => window.alert('copied')}>
                        <button className="text-xl font-sans font-semibold p-3 bg-teal-400 rounded-full text-white px-4 duration-300 hover:shadow-lg">
                            <FontAwesomeIcon icon={faCopy} /> Copy Caption
                        </button>
                    </CopyToClipboard>}
                </div>
            </div>
        </section>
    )
}

export default MplsTwibbonPage;