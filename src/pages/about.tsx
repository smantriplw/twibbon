const AboutPage = () => (
    <section className="m-5 lg:min-h-screen lg:flex lg:flex-col lg:justify-center lg:items-center">
        <h1 className="text-6xl font-extrabold tracking-wide lg:text-center font-mono">
            About me.
        </h1>
        <div className="flex items-center flex-col">
            <p className="text-black text-lg font-mono lg:text-center my-5 text-left lg:w-1/2 text-pretty">
                Twiboo is a minimal clone of <a href={'https://twibbonize.com'} className="text-teal-500">
                    https://twibbonize.com
                </a> created using React and TailwindCSS.
                If you're unfamiliar with Twibbonize, it functions similar to a photobooth or in-frame photo maker.
                This project is free and open-source software (FOSS), you can check out the source code on <a href="https://github.com/hansputera/twiboo" className="text-teal-500">GitHub</a>.
            </p>
            <p className="text-black text-lg font-mono lg:text-center my-5 text-left lg:w-1/2 text-pretty">
            This project exists because we, <strong>MPK/OSIS SMAN 3 PALU</strong>, chose to avoid using twibbonize.com temporarily due to watermark issues.
            We do not collect any information from users. Interestingly, we have always used twibbonize.com to create Instagram posts.
            Soon, our service will be available for public use. This means you can create watermark-free twibbons for your school as well, and it's completely free! 😎
            </p>
            <p className="text-black text-lg font-mono lg:text-center my-5 text-left lg:w-1/2 text-balance">
                Written by <a href={'mailto:hanifdwyputrasembiring@gmail.com'} className="hover:underline">Hanif Dwy Putra S</a>
            </p>
        </div>
        
    </section>
)

export default AboutPage;