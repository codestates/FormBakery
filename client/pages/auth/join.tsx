import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../components/layout/Header";
import AuthContainer from "../../components/layout/AuthContainer";
import { isValidEmail } from "../../utils/regex";
import Logo from "../../components/Logo";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAccessToken, setAlert } from "../../reducers/store/user";
import App from "../../components/App";

interface IUserInfo {
    email: string;
    name: string;
    nickname: string;
    password: string;
    rePassword: string;
    auth: string;
}

interface IError {
    passwordError: string;
    authError: string;
}

interface IDisable {
    authDisable: boolean;
    singUpDisable: boolean;
}

const join = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    // ref
    const nameRef = useRef<HTMLInputElement>(null);
    const nicknameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const rePasswordRef = useRef<HTMLInputElement>(null);
    const authRef = useRef<HTMLInputElement>(null);

    // 사용자의 이메일, 페스워드 state
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        email: "",
        name: "",
        nickname: "",
        password: "",
        rePassword: "",
        auth: "",
    });

    // 인증번호 관련
    const [authNumber, setAuthNumber] = useState<string>("");
    const [showAuthNumber, setShowAuthNumber] = useState<boolean>(false);

    // input 상태 관리
    const stateHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.id === "email") {
            setUserInfo({
                ...userInfo,
                email: e.target.value,
            });
        } else if (e.target.id === "name") {
            setUserInfo({
                ...userInfo,
                name: e.target.value,
            });
        } else if (e.target.id === "nickname") {
            setUserInfo({
                ...userInfo,
                nickname: e.target.value,
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
    const [error, setError] = useState<IError>({
        passwordError: "", // 비밀번호 불일치
        authError: "", // 인증번호 불일치
    });

    // 버튼 활성화
    const [isDisable, setIsDisable] = useState<IDisable>({
        authDisable: true,
        singUpDisable: true,
    });

    // 인증번호 요청 버튼 활성화 관련
    useEffect((): void => {
        if (userInfo.name === "" || userInfo.nickname === "" || userInfo.password === "" || userInfo.rePassword === "" || !isValidEmail(userInfo.email)) {
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
    useEffect((): void => {
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

    // 엔터 단축키 관련 >>> 한글 마지막 글자가 다음 input에 써지는 에러가 있습니다.
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
        const target = e.target as HTMLInputElement;
        if (target.id === "email" && e.code === "Enter") {
            // nameRef.current.focus();
        } else if (target.id === "name" && e.code === "Enter") {
            // nicknameRef.current.focus();
        } else if (target.id === "nickname" && e.code === "Enter") {
            // passwordRef.current.focus();
        } else if (target.id === "password" && e.code === "Enter") {
            // rePasswordRef.current.focus();
        } else if (target.id === "re-password" && !isDisable.authDisable && e.code === "Enter") {
            requestAuth();
        }
        if (target.id === "auth" && e.code === "Enter" && !isDisable.singUpDisable) {
            requestSignUp();
        }
    };

    // 타이머
    const [showTimer, setShowTimer] = useState<boolean>(false);
    const [min, setMin] = useState<number>(3);
    const [sec, setSec] = useState<number>(0);
    const time = useRef<number>(179);
    const timerId = useRef(null);

    useEffect((): void => {
        // 시간이 끝난 경우
        if (time.current < 0) {
            clearInterval(timerId.current);
            setAuthNumber("");
        }
    }, [sec]);

    // 인증번호 요청
    const requestAuth = (): void => {
        if (userInfo.password !== userInfo.rePassword) {
            setError({
                ...error,
                passwordError: "비밀번호가 일치하지 않습니다.",
            });
        } else {
            setShowAuthNumber(false);
            setShowTimer(false);
            setIsDisable({
                ...isDisable,
                authDisable: true,
            });
            setError({
                passwordError: "",
                authError: "",
            });
            clearInterval(timerId.current);
            time.current = 180;
            setMin(3);
            setSec(0);
            timerId.current = setInterval(() => {
                setMin(parseInt(String(time.current / 60)));
                setSec(time.current % 60);
                time.current -= 1;
            }, 1000);
            axios
                .post("http://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/user/signupEmailAuth/", {
                    email: userInfo.email,
                })
                .then((res) => {
                    setUserInfo({
                        ...userInfo,
                        auth: "",
                    });
                    setAuthNumber(String(res.data.data));
                    setIsDisable({
                        ...isDisable,
                        authDisable: false,
                    });
                    setShowAuthNumber(true);
                    setShowTimer(true);
                    authRef.current.focus();
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    };

    // 회원가입 요청
    const requestSignUp = (): void => {
        // 인증번호가 일치하지 않을 경우
        if (userInfo.auth !== authNumber) {
            setError({
                ...error,
                authError: "인증번호가 일치하지 않습니다.",
            });
        } else {
            setError({
                ...error,
                authError: "",
            });
            axios
                .post("http://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/user/signup/", {
                    email: userInfo.email,
                    name: userInfo.name,
                    nickname: userInfo.nickname,
                    password: userInfo.password,
                })
                .then((res) => {
                    dispatch(setAccessToken(res.data.data.accessToken));
                    clearInterval(timerId.current);
                    router.push({
                        pathname: "/",
                        query: {
                            signup: true,
                        },
                    });
                    setTimeout(() => {
                        dispatch(setAlert(true));
                    }, 50);
                })
                .catch((err) => {
                    // if (err.response.data.message === "unAuthorized") {
                    //     setLoginError("비밀번호를 확인해 주세요.");
                    // } else if (
                    //     err.response.data.message === "not exists user email"
                    // ) {
                    //     setLoginError("등록되지 않는 이메일 입니다.");
                    // }
                    if (err.response.data.message === "email exists") {
                        setError({
                            ...error,
                            authError: "이미 가입된 메일입니다.",
                        });
                    }
                });
            // router.push("/auth/login");
        }
    };

    useEffect(() => {
        console.log(authNumber);
    }, [authNumber]);

    return (
        <>
            <App />
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
                <p className="inline-flex mt-4 w-96 text-gray-600 text-sm">기본 정보</p>
                <div className="mt-2">
                    <input
                        id="email"
                        className="border-2 w-96 border-slate-200 h-12 rounded-md pl-2 outline-main"
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
                        id="name"
                        className="border-2 w-96 border-slate-200 h-12 rounded-md pl-2 outline-main"
                        type={"text"}
                        value={userInfo.name}
                        onChange={(e) => {
                            stateHandler(e);
                        }}
                        placeholder="이름을 입력해주세요"
                        onKeyDown={(e) => {
                            pressEnter(e);
                        }}
                        ref={nameRef}
                    />
                </div>
                <div className="mt-2">
                    <input
                        id="nickname"
                        className="border-2 w-96 border-slate-200 h-12 rounded-md pl-2 outline-main"
                        type={"text"}
                        value={userInfo.nickname}
                        onChange={(e) => {
                            stateHandler(e);
                        }}
                        placeholder="닉네임을 입력해주세요"
                        onKeyDown={(e) => {
                            pressEnter(e);
                        }}
                        ref={nicknameRef}
                    />
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        className="border-2 w-96 border-slate-200 h-12 rounded-md pl-2 outline-main"
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
                        className="border-2 w-96 border-slate-200 h-12 rounded-md pl-2 outline-main"
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
                        <p className="text-red-400 absolute top-2 left-2 text-sm">{error.passwordError}</p>
                        {showTimer && <p className="text-red-400 absolute top-2 right-40 text-sm">{time.current !== -1 ? `${min}분 ${sec}초` : "인증시간을 초과하였습니다."}</p>}
                        <button className={`w-36 h-10 rounded-md ${isDisable.authDisable ? "bg-slate-100 text-slate-300" : "bg-main text-white"}`} disabled={isDisable.authDisable} onClick={requestAuth}>
                            인증번호 요청
                        </button>
                    </div>
                </div>
                {showAuthNumber && (
                    <>
                        <p className="inline-flex mt-4 w-96 text-gray-600 text-sm">이메일 인증</p>
                        <div className="mt-2">
                            <input
                                id="auth"
                                className="border-2 w-96 border-slate-200 h-12 rounded-md pl-2 outline-main"
                                type={"text"}
                                value={userInfo.auth}
                                onChange={(e) => {
                                    stateHandler(e);
                                }}
                                placeholder="인증번호 6자리를 입력해주세요"
                                onKeyDown={(e) => {
                                    pressEnter(e);
                                }}
                                ref={authRef}
                            />
                        </div>
                        {error.authError && <p className="inline-flex text-red-400 w-96 pl-2 text-sm">{error.authError}</p>}
                        <div className="mt-6">
                            <button className={`w-96 h-12 rounded-md ${isDisable.singUpDisable ? "bg-slate-100 text-slate-300" : "bg-main text-white"}`} disabled={isDisable.singUpDisable} onClick={requestSignUp}>
                                회원가입
                            </button>
                        </div>
                    </>
                )}
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
