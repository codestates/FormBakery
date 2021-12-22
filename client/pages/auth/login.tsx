import React, { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/layout/Header";
import Logo from "../../components/Logo";
import AuthContainer from "../../components/layout/AuthContainer";
import { isValidEmail } from "../../utils/regex";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../reducers/store/user";
import { useRouter } from "next/router";
import Alert from "../../components/Alert";
import { setAlert } from "../../reducers/store/user";
import App from "../../components/App";

interface IUserInfo {
    email: string;
    password: string;
}

const login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const invaildRefreshTokenQuery = router.query.invaildRefreshToken;
    const resetPasswordQuery = router.query.resetPassword;
    const createNewFormQuery = router.query.createNewForm;
    // ref
    const passwordRef = useRef<HTMLInputElement>(null);

    // 사용자의 이메일, 페스워드 state
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        email: "",
        password: "",
    });

    const stateHandler = (e: ChangeEvent<HTMLInputElement>): void => {
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
    const [isDisable, setIsDisable] = useState<boolean>(true);

    useEffect((): void => {
        if (userInfo.password === "" || !isValidEmail(userInfo.email)) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [userInfo]);

    // 이메일에서 엔터를 누를 경우 비밀번호로 이동
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
        const target = e.target as HTMLInputElement;
        if (target.id === "email" && e.code === "Enter") {
            passwordRef.current.focus();
        } else if (target.id === "password" && !isDisable && e.code === "Enter") {
            requestLogin();
        }
    };

    // 로그인 에러
    const [loginError, setLoginError] = useState<string>("");

    // 로그인 요청
    const requestLogin = (): void => {
        axios
            .post(`http://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/user/login/${userInfo.email}`, { password: userInfo.password })
            .then((res) => {
                dispatch(setAccessToken(res.data.data.accessToken));
                router.push("/");
                setTimeout(() => {
                    dispatch(setAlert(true));
                }, 50);
            })
            .catch((err) => {
                if (err.response.data.message === "unAuthorized") {
                    setLoginError("비밀번호를 확인해 주세요.");
                } else if (err.response.data.message === "not exists user email") {
                    setLoginError("등록되지 않는 이메일 입니다.");
                }
            });
    };

    return (
        <>
            <App />
            <Header />
            <AuthContainer>
                <div className="flex justify-center items-center space-x-2">
                    <Logo />
                </div>
                <div className="mt-6">
                    <input
                        id="email"
                        className="border-2 border-slate-200 w-96 h-12 rounded-md pl-2 outline-main"
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
                        className="border-2 border-slate-200 w-96 h-12 rounded-md pl-2 outline-main"
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
                {loginError && <div className="text-sm text-red-400 w-96 inline-block text-left pl-2">{loginError}</div>}
                <div className="mt-6">
                    <button className={`w-96 h-12 rounded-md ${isDisable ? "bg-slate-100 text-slate-300" : "bg-main text-white"}`} onClick={requestLogin} disabled={isDisable}>
                        로그인
                    </button>
                </div>
                <Link href={"/auth/resetPassword"}>
                    <p className="mt-8 text-sm text-slate-500 cursor-pointer inline-flex">비밀번호를 잊으셨나요?</p>
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
                <p className="mt-6 text-gray-600">아직 폼 베이커리 계정이 없으신가요?</p>
                <div className="mt-6">
                    <Link href="/auth/join">
                        <button className={"w-96 h-12 rounded-md border-1 border-main text-main"}>회원가입</button>
                    </Link>
                </div>
            </AuthContainer>
            <Alert
                title={invaildRefreshTokenQuery ? "토큰 만료" : resetPasswordQuery ? "비밀번호 재설정" : createNewFormQuery ? "로그인" : "로그아웃"}
                subTitle={invaildRefreshTokenQuery ? "토큰이 만료되었습니다. 다시 로그인 해주세요." : resetPasswordQuery ? "비밀번호를 재설정하였습니다." : createNewFormQuery ? "폼 생성을 위해 로그인해주세요." : "로그아웃 하였습니다."}
            />
        </>
    );
};

export default login;
