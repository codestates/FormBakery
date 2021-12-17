import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../components/layout/Header";
import AuthContainer from "../../components/layout/AuthContainer";
import { isValidEmail } from "../../utils/regex";
import Logo from "../../components/Logo";

interface join {
    email: string;
    password: string;
}

const join = () => {
    const router = useRouter();
    // ref
    const passwordRef = useRef<HTMLInputElement>(null);
    const rePasswordRef = useRef<HTMLInputElement>(null);

    // 사용자의 이메일, 페스워드 state
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
        rePassword: "",
        auth: "",
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
        } else if (e.target.id === "re-password") {
            setUserInfo({
                ...userInfo,
                rePassword: e.target.value,
            });
        } else if (e.target.id === "auth") {
            setUserInfo({
                ...userInfo,
                auth: e.target.value,
            });
        }
    };

    // 에러 메세지
    const [error, setError] = useState({
        passwordError: "", // 비밀번호 불일치
        authError: "", // 인증번호 불일치
    });

    // 버튼 활성화
    const [isDisable, setIsDisable] = useState({
        authDisable: true,
        singUpDisable: true,
    });

    // 인증번호 요청 버튼 활성화 관련
    useEffect(() => {
        if (
            userInfo.password === "" ||
            userInfo.rePassword === "" ||
            !isValidEmail(userInfo.email)
        ) {
            setIsDisable({
                ...isDisable,
                authDisable: true,
            });
        } else {
            setIsDisable({
                ...isDisable,
                authDisable: false,
            });
        }
    }, [userInfo]);

    // 회원가입 버튼 활성화 관련
    useEffect(() => {
        if (userInfo.auth === "") {
            setIsDisable({
                ...isDisable,
                singUpDisable: true,
            });
        } else {
            setIsDisable({
                ...isDisable,
                singUpDisable: false,
            });
        }
    }, [userInfo.auth]);

    // 엔터 단축키 관련
    const pressEnter = (e) => {
        if (e.target.id === "email" && e.code === "Enter") {
            passwordRef.current.focus();
        } else if (e.target.id === "password" && e.code === "Enter") {
            rePasswordRef.current.focus();
        } else if (
            e.target.id === "re-password" &&
            !isDisable.authDisable &&
            e.code === "Enter"
        ) {
            requestAuth();
        }
        if (e.target.id === "auth" && e.code === "Enter") {
            requestSignUp();
        }
    };

    // 인증번호 요청
    const requestAuth = () => {
        if (userInfo.password !== userInfo.rePassword) {
            setError({
                ...error,
                passwordError: "비밀번호가 일치하지 않습니다.",
            });
        } else {
            setError({
                ...error,
                passwordError: "",
            });
            alert("인증번호 요청");
        }
    };

    // 회원가입 요청
    const requestSignUp = () => {
        // 인증번호가 일치하지 않을 경우
        if (userInfo.auth !== "123") {
            setError({
                ...error,
                authError: "인증번호가 일치하지 않습니다.",
            });
        } else {
            setError({
                ...error,
                authError: "",
            });
            alert("회원가입 post요청");
            router.push("/auth/login");
        }
    };

    return (
        <>
            <Header />
            <AuthContainer>
                <div className="flex justify-center items-center space-x-2">
                    <Logo />
                </div>
                <div className="mt-8">
                    <p className="mb-4 text-gray-600">소셜 계정으로 회원가입</p>
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
                <div className="inline-flex border-t-1 w-96 h-0.5 mt-4" />
                <p className="mt-2 text-gray-600">이메일로 가입</p>
                <p className="inline-flex mt-4 w-96 text-gray-600 text-sm">
                    기본 정보
                </p>
                <div className="mt-2">
                    <input
                        id="email"
                        className="border-2 w-96 h-12 rounded-md pl-2 outline-main"
                        type={"email"}
                        value={userInfo.email}
                        onChange={(e) => {
                            stateHandler(e);
                        }}
                        placeholder="이메일을 입력해주세요"
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
                        placeholder="비밀번호를 입력해주세요"
                        ref={passwordRef}
                    />
                </div>
                <div className="mt-2">
                    <input
                        id="re-password"
                        className="border-2 w-96 h-12 rounded-md pl-2 outline-main"
                        type={"password"}
                        value={userInfo.rePassword}
                        onChange={(e) => {
                            stateHandler(e);
                        }}
                        onKeyDown={(e) => {
                            pressEnter(e);
                        }}
                        placeholder="비밀번호를 한번 더 입력해주세요"
                        ref={rePasswordRef}
                    />
                </div>
                <div className="mt-2">
                    <div className="inline-flex relative w-96 justify-end">
                        <p className="text-red-400 absolute top-2 left-2 text-sm">
                            {error.passwordError}
                        </p>
                        <button
                            className={`w-36 h-10 rounded-md ${
                                isDisable.authDisable
                                    ? "bg-slate-100 text-slate-300"
                                    : "bg-main text-white"
                            }`}
                            disabled={isDisable.authDisable}
                            onClick={requestAuth}
                        >
                            인증번호 요청
                        </button>
                    </div>
                </div>
                <p className="inline-flex mt-4 w-96 text-gray-600 text-sm">
                    이메일 인증 (인증번호 테스트 번호는 123 입니당)
                </p>
                <div className="mt-2">
                    <input
                        id="auth"
                        className="border-2 w-96 h-12 rounded-md pl-2 outline-main"
                        type={"text"}
                        value={userInfo.auth}
                        onChange={(e) => {
                            stateHandler(e);
                        }}
                        placeholder="인증번호를 입력해주세요"
                        onKeyDown={(e) => {
                            pressEnter(e);
                        }}
                    />
                </div>
                {error.authError && (
                    <p className="inline-flex text-red-400 w-96 pl-2 text-sm">
                        {error.authError}
                    </p>
                )}
                <div className="mt-6">
                    <button
                        className={`w-96 h-12 rounded-md ${
                            isDisable.singUpDisable
                                ? "bg-slate-100 text-slate-300"
                                : "bg-main text-white"
                        }`}
                        disabled={isDisable.singUpDisable}
                        onClick={requestSignUp}
                    >
                        회원가입
                    </button>
                </div>
                <p className="inline-flex w-96 mt-4 text-sm text-gray-400">
                    이미 계정이 있으신가요?{" "}
                    <Link href={"/auth/login"}>
                        <span className="ml-2 text-main cursor-pointer">로그인</span>
                    </Link>
                </p>
            </AuthContainer>
        </>
    );
};

export default join;
