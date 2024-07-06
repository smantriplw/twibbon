import React from "react";
import { useNavigate, useParams } from "react-router-dom"
import { hexToUint8Array, uint8ArrayToString } from "uint8array-extras";

const VerySadPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [decoded, setDecode] = React.useState<string>();

    const message = params.message_hash!;
    React.useEffect(() => {
        try {
            setDecode(uint8ArrayToString(hexToUint8Array(message)));
        } catch {
            navigate('/');
        }
    }, [setDecode, navigate, message]);

    return (
        <section className="min-h-screen flex justify-center items-center flex-col">
            <h1 className="text-4xl font-semibold lg:text-6xl">
                🥲 We are very sad
            </h1>
            <p className="text-2xl mt-4 text-balance text-center">
                {decoded}
            </p>
        </section>
    )
}

export default VerySadPage;