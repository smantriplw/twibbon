import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Navbar: React.FC = () => {
    const [closed, setClosed] = React.useState<boolean>(false);

    // React.useEffect(() => {
    //     console.log(closed);
    // }, [closed]);

    return (
        <section className="flex space-x-5 flex-row m-5 bg-teal-700/90 rounded-3xl px-4 py-4 shadow-lg ring-1 ring-black/20 backdrop-blur-2xl">
                <div className="md:hidden block text-3xl cursor-pointer" onClick={() => setClosed(!closed)}>
                    <FontAwesomeIcon icon={faPhotoFilm} className="text-slate-200" />
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-extrabold font-mono md:font-black antialiased tracking-wide cursor-not-allowed text-slate-200">
                        Twiboo
                    </h1>   
                </div>

                <div className="hidden md:block flex-row">
                    <h1 className="text-3xl font-mono">
                        <NavLink to={'/'} className={({ isActive }) => twMerge(isActive ? 'font-medium text-lime-100 underline' : 'text-white font-semibold', 'duration-100', 'hover:underline')}>
                            Home
                        </NavLink>
                    </h1>
                </div>
                <div className="hidden md:block flex-row">
                    <h1 className="text-3xl font-mono">
                        <NavLink to={'/about'} className={({ isActive }) => twMerge(isActive ? 'font-medium text-lime-100 underline' : 'text-white font-semibold', 'duration-100', 'hover:underline')}>
                            About
                        </NavLink>
                    </h1>
                </div>
                <div className="hidden md:block flex-row flex-1">
                    <h1 className="text-3xl font-mono">
                        <NavLink to={'/terms-of-service'} className={({ isActive }) => twMerge(isActive ? 'font-medium text-lime-100 underline' : 'text-white font-semibold', 'duration-100', 'hover:underline')}>
                            ToS
                        </NavLink>
                    </h1>
                </div>
                <div className="hidden md:block flex-row">
                    <a href={'https://github.com/hansputera/twiboo'} className="text-3xl align-middle font-mono text-white text-center hover:underline hover:cursor-pointer">
                        FOSS ❤️
                    </a>
                </div>
        </section>
    )
}

export default Navbar;
