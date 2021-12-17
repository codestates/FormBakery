import React from "react";
import Image from "next/image";

const Logo = () => {
    return (
        <>
            <Image
                src="/logo.jpg"
                alt="formBakery Logo"
                width={35}
                height={45}
            />
        </>
    );
};

export default Logo;
