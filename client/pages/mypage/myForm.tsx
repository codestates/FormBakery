import React, { useState } from "react";
// import { useRouter } from "next/router";
import Link from "next/link";
import MypageHeader from "../../components/layout/MypageHeader";
import AuthContainer from "../../components/layout/AuthContainer";
import { isValidEmail } from "../../utils/regex";

// interface profile {
//     email: string;
//     password: string;
// }

const myForm = () => {
    // const router = useRouter();

    // 사용자의 이메일
    const [email, setEmail] = useState("");
    const changeEmail = (e) => {
        setEmail(e.target.value);
    };

    // 에러 메세지
    const [emailError, setEmailError] = useState("");
    const [emailTypeError, setEmailTypeError] = useState("");

    // 엔터 단축키 관련
    const pressEnter = (e) => {
        if (e.code === "Enter") {
            requestLink();
        }
    };

    // 비밀번호 재설정 링크 요청
    const requestLink = () => {
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
            <MypageHeader />
        </>
    );
};

export default myForm;
