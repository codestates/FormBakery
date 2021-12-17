import React, { useState } from "react";
import Image from "next/image";
import MypageHeader from "../../../components/layout/MypageHeader";
import AccountLeftPannel from "../../../components/layout/AccountLeftPannel";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";

const proflie = () => {
    // 사진 업로드
    const uploadPhoto = () => {
        alert("사진 업로드");
    };

    const [showDropDown, setShowDropDown] = useState(true);
    const toggleDropDown = () => {
        setShowDropDown((prev) => !prev);
    };

    return (
        <>
            <MypageHeader />
            <main className="mt-1 text-center pt-8">
                <div className="inline-flex w-222">
                    <AccountLeftPannel />
                    <div className="w-5/6 text-left pl-4">
                        <p className="text-lg font-semibold">프로필 설정</p>
                        <div className="mt-5">
                            <div
                                className={`flex items-center p-4 w-96 justify-between border-2 border-slate-200 ${
                                    showDropDown ? "rounded-t-md" : "rounded-md"
                                }`}
                            >
                                <div className="font-semibold">프로필 사진</div>
                                {showDropDown ? (
                                    <KeyboardArrowUp
                                        className={`text-gray-500 hover:text-black`}
                                        onClick={toggleDropDown}
                                    />
                                ) : (
                                    <KeyboardArrowDown
                                        className={`text-gray-500 hover:text-black`}
                                        onClick={toggleDropDown}
                                    />
                                )}
                            </div>
                            {showDropDown && (
                                <div className="p-4 w-96 h-80 border-2 -mt-0.5 border-slate-200 rounded-b-md text-center">
                                    <div className="inline-block w-56 h-56 rounded-full border-2 border-slate-200">
                                        <Image
                                            src="/profile.png"
                                            alt="user"
                                            width={224}
                                            height={224}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div className="text-right mt-5">
                                        <button
                                            className={`w-36 h-10 rounded-md border-2 border-slate-500 text-slate-500 text-sm font-semibold`}
                                            onClick={uploadPhoto}
                                        >
                                            사진 업로드
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default proflie;
