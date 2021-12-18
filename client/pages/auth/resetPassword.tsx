import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import Link from "next/link";
import Header from "../../components/layout/Header";
import AuthContainer from "../../components/layout/AuthContainer";
import { isValidEmail } from "../../utils/regex";

const resetPassword = () => {
    // 사용자의 이메일
    const [email, setEmail] = useState<string>("");
    const changeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    // 에러 메세지
    const [emailError, setEmailError] = useState<string>("");
    const [emailTypeError, setEmailTypeError] = useState<string>("");

    // 엔터 단축키 관련
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.code === "Enter") {
            requestLink();
        }
    };

    // 비밀번호 재설정 링크 요청
    const requestLink = (): void => {
        // 없는 메일일 경우
        if (!isValidEmail(email)) {
            setEmailTypeError("이메일 형식이 올바르지 않습니다.");
        } else {
            setEmailTypeError("");
            if (email !== "aaa@naver.com") {
                setEmailError("이 이메일에 등록된 계정이 없습니다.");
            } else {
                setEmailError("");
                alert("비밀번호 재설정 링크로 이동");
                // router.push("/auth/login"); 어디로 이동할지 정하자
            }
        }
    };

    return (
        <>
            <Header />
            <AuthContainer>
                <h1 className="font-bold text-5xl">비밀번호 재설정</h1>
                <p className="text-gray-600 mt-6 inline-flex w-96 text-left">
                    이메일을 입력하시면, 비밀번호를 재설정 하실 수 있는 링크를
                    보내드립니다. (등록된 테스트 이메일은 aaa@naver.com 입니다.)
                </p>
                <div className="mt-6">
                    <input
                        className="border-2 w-96 h-12 rounded-md pl-2 outline-main"
                        type={"email"}
                        value={email}
                        onChange={(e) => {
                            changeEmail(e);
                        }}
                        placeholder="이메일을 입력해주세요"
                        onKeyDown={(e) => {
                            pressEnter(e);
                        }}
                    />
                </div>
                {emailError && (
                    <p className="mt-0.5 inline-flex w-96 text-left pl-2 text-red-400">
                        {emailError}
                    </p>
                )}
                {emailTypeError && (
                    <p className="mt-0.5 inline-flex w-96 text-left pl-2 text-red-400">
                        {emailTypeError}
                    </p>
                )}
                <div className="mt-4">
                    <button
                        className={"w-96 h-12 rounded-md bg-main text-white"}
                        onClick={requestLink}
                    >
                        제출 하기
                    </button>
                </div>
                <p className="inline-flex w-96 mt-4 text-sm text-gray-400">
                    비밀번호가 생각나셨나요?{" "}
                    <Link href={"/auth/login"}>
                        <span className="ml-2 text-main cursor-pointer">
                            로그인
                        </span>
                    </Link>
                </p>
            </AuthContainer>
        </>
    );
};

export default resetPassword;
