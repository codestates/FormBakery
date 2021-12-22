import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../Logo";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { logout, setAlert, setModal } from "../../reducers/store/user";
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    // 로그인 유무
    const isLogin = useSelector(({ user }: any) => user.login);
    // 닉네임
    const nickname = useSelector(({ user }: any) => user.userInfo.nickname);
    // 유저아이콘 클릭 시 모달의 보임 유무 state 관리
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleModal = (): void => {
        setIsVisible((prev) => !prev);
    };

    // 로그아웃 클릭시 모달 활성화
    const buttonHandler = (): void => {
        toggleModal();
        dispatch(setModal(true));
    };

    // 로그아웃 요청
    const requestLogout = (): void => {
        dispatch(logout());
        router.push("/auth/login");
        setTimeout(() => {
            dispatch(setAlert(true));
        }, 50);
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
                <div className="flex items-center relative w-72 justify-end pr-8">
                    {!isLogin && (
                        <Link href="/auth/login">
                            <button className="border-1 border-main rounded-md text-main text-md px-2 py-1 w-auto whitespace-nowrap ">
                                sign in
                            </button>
                        </Link>
                    )}
                    {!isLogin && (
                        <button
                            className="border-2 border-main bg-main rounded-md text-white text-md px-2 py-1 ml-2 w-auto whitespace-nowrap"
                            onClick={() => {
                                alert("Advance Challenge");
                            }}
                        >
                            Free experience
                        </button>
                    )}
                    {isLogin && (
                        <div className="text-slate-500 font-semibold text-sm mr-2">
                            {`${nickname}님 환영합니다`}
                        </div>
                    )}
                    {isLogin && (
                        <div
                            className={`h-11.5 w-11.5 rounded-full flex justify-center items-center  cursor-pointer hover:bg-slate-200 ${
                                isVisible ? "bg-slate-200" : "bg-white"
                            }`}
                            onClick={(): void => {
                                if (isLogin) {
                                    toggleModal();
                                } else {
                                    router.push("/auth/login");
                                }
                            }}
                        >
                            <Image
                                src="/profile.png"
                                alt="user"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </div>
                    )}
                    {isVisible && (
                        <div className=" bg-white absolute z-10 right-8 top-14.5 w-32 py-2 border-1 rounded-md text-xs text-slate-500 shadow-md">
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
                subTitle={"정말로 로그아웃 하시겠습니까?"}
                onClick={requestLogout}
            />
        </>
    );
};

export default Header;
