import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../Logo";
import Modal from "../Modal";

const Header = () => {
    // 유저아이콘 클릭 시 모달의 보임 유무 state 관리
    const [isVisible, setIsVisible] = useState(false);
    const toggleModal = () => {
        setIsVisible((prev) => !prev);
    };

    // 계정 삭제버튼 클릭시 모달 활성화
    const [showModal, setShowModal] = useState(false);

    const buttonHandler = () => {
        toggleModal();
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 100);
    };

    const requestSignout = () => {
        alert("로그아웃 요청");
    };

    return (
        <>
            <header className="bg-white h-16 flex shadow-md justify-center space-x-96">
                <Link href="/">
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <Logo />
                        <p className="text-main font-serif font-semibold text-3xl underline whitespace-nowrap w-auto ">
                            Form Bakery
                        </p>
                    </div>
                </Link>
                <div className="flex items-center space-x-3 relative">
                    <Link href="/auth/login">
                        <button className="border-1 border-main rounded-md text-main text-md px-2 py-1 w-auto whitespace-nowrap ">
                            sign in
                        </button>
                    </Link>
                    <button
                        className="border-2 border-main bg-main rounded-md text-white text-md px-2 py-1 w-auto whitespace-nowrap"
                        onClick={() => {
                            alert("Advance Challenge");
                        }}
                    >
                        Free experience
                    </button>
                    <div
                        className={`h-11.5 w-11.5 rounded-full flex justify-center items-center  cursor-pointer hover:bg-gray-200 ${
                            isVisible ? "bg-gray-200" : "bg-white"
                        }`}
                        onClick={toggleModal}
                    >
                        <Image
                            src="/profile.png"
                            alt="user"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </div>
                    {isVisible && (
                        <div className=" bg-white absolute z-10 right-0 top-14.5 w-32 py-2 border-1 rounded-md text-xs text-gray-500 shadow-md">
                            <Link href={"/mypage/myForm"}>
                                <p className="hover:bg-gray-100 cursor-pointer px-2 py-2 font">
                                    내 설문지
                                </p>
                            </Link>
                            <Link href={"/mypage/account/profile"}>
                                <p className="hover:bg-gray-100 cursor-pointer px-2 py-2">
                                    계정관리
                                </p>
                            </Link>
                            <div className="flex justify-center mt-2 mb-1">
                                <div className=" inline-flex w-28 h-1 border-t-1" />
                            </div>
                            <p
                                className="hover:bg-gray-100 cursor-pointer px-2 py-2 text-red-400"
                                onClick={buttonHandler}
                            >
                                로그아웃
                            </p>
                        </div>
                    )}
                </div>
            </header>
            {isVisible && (
                <div
                    className="bg-transparent absolute top-0 left-0 w-screen h-screen z-0"
                    onClick={toggleModal}
                ></div>
            )}
            <Modal
                title={"로그아웃"}
                subTitle={"정말로 계정을 로그아웃 하시겠습니까?"}
                show={showModal}
                onClick={requestSignout}
            />
        </>
    );
};

export default Header;
