import { ErrorResponse, useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError() as ErrorResponse;

    return (
        <div className="space-y-6 md:space-x-10 h-screen lg:flex-row flex-col flex items-center justify-center">
            <h1 className="text-9xl font-bold duration-75 hover:text-red-600 hover:cursor-pointer font-mono">
                Oops!
            </h1>
            <h3 className="md:text-7xl text-6xl text-pretty font-light font-mono text-center">
                {error ? error.status.toString().concat(' ', error.statusText) : '404 Not Found'}
                <p className="text-3xl hidden md:block">
                    Click <button onClick={() => navigate(-1)} className="font-black cursor-pointer duration-75 hover:text-blue-500">
                        me
                    </button> to go back
                </p>
            </h3>
            <div className="block md:hidden">
                <button onClick={() => navigate(-1)} className="hover:underline font-sans text-md text-blue-700 duration-100 text-xl hover:text-blue-300">
                    Back to previous page
                </button>
            </div>
        </div>
    )
}