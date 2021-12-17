import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/layout/Header";
import Logo from "../../components/Logo";
import AuthContainer from "../../components/layout/AuthContainer";
import { isValidEmail } from "../../utils/regex";

interface login {
    email: string;
    password: string;
}

const login = () => {
    // ref
    const passwordRef = useRef<HTMLInputElement>(null);

    // 사용자의 이메일, 페스워드 state
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });
    const stateHandler = (e) => {
        if (e.target.id === "email") {
            setUserInfo({
                ...userInfo,
                email: e.target.value,
            });
        } else if (e.target.id === "password") {
            setUserInfo({
                ...userInfo,
                password: e.target.value,
            });
        }
    };
    // 로그인 버튼 활성화관련
    const [isDisable, setIsDisable] = useState(true);

    useEffect(() => {
        if (userInfo.password === "" || !isValidEmail(userInfo.email)) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [userInfo]);

    // 이메일에서 엔터를 누를 경우 비밀번호로 이동
    const pressEnter = (e) => {
        if (e.target.id === "email" && e.code === "Enter") {
            passwordRef.current.focus();
        } else if (
            e.target.id === "password" &&
            !isDisable &&
            e.code === "Enter"
        ) {
            alert("로그인 시도!");
        }
    };

    return (
        <>
            <Header />
            <AuthContainer>
                <div className="flex justify-center items-center space-x-2">
                    <Logo />
                </div>
                <div className="mt-6">
                    <input
                        id="email"
                        className="border-2 w-96 h-12 rounded-md pl-2 outline-main"
                        type={"email"}
                        value={userInfo.email}
                        onChange={(e) => {
                            stateHandler(e);
                        }}
                        placeholder="이메일 주소(ID)를 입력하세요"
                        onKeyDown={(e) => {
                            pressEnter(e);
                        }}
                    />
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        className="border-2 w-96 h-12 rounded-md pl-2 outline-main"
                        type={"password"}
                        value={userInfo.password}
                        onChange={(e) => {
                            stateHandler(e);
                        }}
                        onKeyDown={(e) => {
                            pressEnter(e);
                        }}
                        placeholder="비밀번호를 입력하세요"
                        ref={passwordRef}
                    />
                </div>
                <div className="mt-6">
                    <button
                        className={`w-96 h-12 rounded-md ${
                            isDisable
                                ? "bg-slate-100 text-slate-300"
                                : "bg-main text-white"
                        }`}
                        disabled={isDisable}
                    >
                        로그인
                    </button>
                </div>
                <Link href={"/auth/resetPassword"}>
                    <p className="mt-8 text-sm text-gray-400 cursor-pointer inline-flex">
                        비밀번호를 잊으셨나요?
                    </p>
                </Link>
                <div className="mt-8">
                    <p className="mb-4 text-gray-600">소셜 계정으로 로그인</p>
                    <Image
                        className="cursor-pointer"
                        src="/github.png"
                        alt="formBakery Logo"
                        width={40}
                        height={40}
                        onClick={() => {
                            alert("github 연동");
                        }}
                    />
                </div>
                <p className="mt-6 text-gray-600">
                    아직 폼 베이커리 계정이 없으신가요?
                </p>
                <div className="mt-6">
                    <Link href="/auth/join">
                        <button
                            className={
                                "w-96 h-12 rounded-md border-1 border-main text-main"
                            }
                        >
                            회원가입
                        </button>
                    </Link>
                </div>
            </AuthContainer>
        </>
    );
};

export default login;
