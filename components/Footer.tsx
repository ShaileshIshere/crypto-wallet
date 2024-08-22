type FooterProps = {};
const Footer: React.FC<FooterProps> = () => {
    return (
        <>
            <div className="h-[6vh] w-full flex flex-col items-center justify-center gap-3 px-6">
                <div className="flex gap-4 justify-center items-center border-t-[0.2vh] border-gray-500 pt-4 w-full flex-wrap">
                <div className="flex gap-2">
                    <h1 className="font-normal ">Created and devloped by</h1>
                    <h1 className="font-medium ">Shailesh</h1>
                </div>
                <a className="flex " href="https://github.com/keshav-exe/projekt-kosh">
                    <h1 className="font-normal ">Design and inspired by</h1>
                    <h1 className="font-semibold text-zinc-900 pl-2 dark:text-white ">Kosh</h1>
                </a>
                </div>
            </div>
        </>
    );
};

export default Footer;