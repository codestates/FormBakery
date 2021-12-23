import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../Logo";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout, setAlert, setModal } from "../../reducers/store/user";
import Modal from "../Modal";

interface IOption {
    id: string;
    label: string;
}

interface IProps {
    setSelectedId?: any;
}

const MypageHeader = ({ setSelectedId } : IProps) => {
    const router = useRouter();
    const dispatch = useDispatch();

    // 닉네임
    const nickname = useSelector(({ user }: any) => user.userInfo.nickname);

    // 유저아이콘 클릭 시 모달의 보임 유무 state 관리
    const [isVisible, setIsVisible] = useState<boolean>(false);

    // mypage 옵션
    const headerOption: IOption[] = [
        { id: "myForm", label: "내 설문지" },
        { id: "account", label: "계정관리" },
    ];

    // 선택된 옵션 (초기값은 url에서 받아옴)
    const [selectedOption, setSelectedOption] = useState<string>(
        router.pathname.split("/")[2]
    );

    // 유저 아이콘 토글 모달
    const toggleModal = (): void => {
        setIsVisible((prev) => !prev);
    };

    // 로그아웃 클릭시 모달 활성화
    const buttonHandler = (): void => {
        toggleModal();
        toggleLogoutModal();
    };

    // 로그아웃 요청
    const requestLogout = (): void => {
        dispatch(logout());
        router.push("/auth/login");
        setTimeout(() => {
            dispatch(setAlert(true));
        }, 50);
    };

    // 로그아웃 모달 보임 유무
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
    const toggleLogoutModal = (): void => {
        setIsVisibleModal((prev) => !prev);
    };

    return (
        <>
            <header
                className="bg-white h-16 flex shadow-md justify-center space-x-96"
                onClick={() => {
                    setSelectedId && setSelectedId("");
                }}
            >
                <Link href="/" passHref>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <Logo />
                        <p className="text-main font-serif font-semibold text-3xl underline whitespace-nowrap w-auto ">
                            Form Bakery
                        </p>
                    </div>
                </Link>
                <div className="flex items-center relative w-72 justify-end pr-8">
                    <div className="text-slate-500 font-semibold text-sm mr-2">
                        {`${nickname}'s page`}
                    </div>
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
                        <div className=" bg-white absolute z-10 right-8 top-14.5 w-32 py-2 border-1 rounded-md text-xs text-gray-500 shadow-md">
                            <p
                                className="hover:bg-gray-100 cursor-pointer px-2 py-2 font"
                                onClick={() => {
                                    if (selectedOption === "myForm") {
                                        router.reload();
                                    } else if (selectedOption === "account") {
                                        router.push("/mypage/myForm");
                                    }
                                }}
                            >
                                내 설문지
                            </p>
                            <p
                                className="hover:bg-gray-100 cursor-pointer px-2 py-2"
                                onClick={() => {
                                    if (selectedOption === "account") {
                                        router.reload();
                                    } else if (selectedOption === "myForm") {
                                        router.push("/mypage/account/profile");
                                    }
                                }}
                            >
                                계정관리
                            </p>
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
            <header
                className="mt-1 text-center bg-white h-10 shadow-md"
                onClick={() => {
                    setSelectedId && setSelectedId("");
                }}
            >
                <div className="inline-flex w-222 h-full items-center relative">
                    {headerOption.map((v, i) => {
                        return (
                            <Link
                                href={
                                    v.id === "myForm"
                                        ? "/mypage/myForm"
                                        : "/mypage/account/profile"
                                }
                                passHref
                                key={v.id}
                            >
                                <div
                                    className={`text-sm cursor-pointer ${
                                        i !== 0 && "ml-4"
                                    } ${
                                        selectedOption === v.id
                                            ? "text-gray-600 font-semibold"
                                            : "text-gray-300"
                                    }`}
                                    onClick={() => {
                                        setSelectedOption(v.id);
                                    }}
                                >
                                    {v.label}
                                </div>
                            </Link>
                        );
                    })}
                    <div
                        className={`inline-block bg-main h-0.75 rounded-sm absolute bottom-0 transition-all ${
                            selectedOption === "myForm"
                                ? "w-15 left-0"
                                : "w-14 left-19"
                        }`}
                    />
                </div>
            </header>
            {isVisible && (
                <div
                    className="bg-transparent absolute top-0 left-0 w-screen h-screen z-0"
                    onClick={toggleModal}
                ></div>
            )}
            <div
                className={`w-full absolute top-0 left-0 bg-black bg-opacity-20 flex justify-center items-center ${
                    isVisibleModal
                        ? "z-10 opacity-100 h-full"
                        : "-z-10 opacity-0 h-0"
                }`}
                onClick={toggleLogoutModal}
            >
                <div
                    className={`w-96 h-48 rounded-md bg-white relative p-6 border-1 shadow-md transition-all ${
                        isVisibleModal
                            ? "opacity-100 top-0"
                            : "opacity-0 top-10"
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="text-lg font-bold">로그아웃</div>
                    <div className="text-sm mt-4">
                        정말로 로그아웃 하시겠습니까?
                    </div>
                    <div className="mt-8 text-right space-x-2 absolute bottom-6 right-6">
                        <button
                            className={`w-20 h-8 rounded-md border-1 border-main text-main text-sm`}
                            onClick={toggleLogoutModal}
                        >
                            취소
                        </button>
                        <button
                            className={`w-20 h-8 rounded-md bg-main text-white text-sm`}
                            onClick={() => {
                                toggleLogoutModal();
                                requestLogout();
                            }}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MypageHeader;
