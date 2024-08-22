import { Box } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar"
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <nav className="md:h-[10vh] h-[6vh] w-full flex justify-between items-center md:px-5 px-2 py-2">
        <div className="flex justify-center items-center gap-2">
            <Box className="md:size-12 size-6" />
            <div className="flex flex-col flex-wrap">
                <span className="md:text-4xl tracking-tighter text-lg font-extrabold text-primary flex gap-2 items-center">
                    Crypto Wallet{" "}
                </span>
                <span className="text-gray-300 w-fit text-sm md:text-lg flex">
                    version - 1.0.0
                </span>
            </div>
        </div>
        <div className="flex flex-col gap-1 md:mr-52 sm:mr-20 mr-0">
            <div className="flex justify-center">
                <Avatar className="md:mt-0 mt-2 cursor-grab">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/156584350?v=4" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ShaileshIshere"
            >
                <h1 className="font-bold text-2xl tracking-tighter leading-none hidden md:block">
                    ShaileshIsHere
                </h1>
            </a>
        </div>
        <ModeToggle />
    </nav>
  );
};

export default Navbar;