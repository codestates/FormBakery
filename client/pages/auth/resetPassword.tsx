import React, { ChangeEvent, KeyboardEvent, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Header from "../../components/layout/Header";
import AuthContainer from "../../components/layout/AuthContainer";
import { isValidEmail } from "../../utils/regex";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAlert } from "../../reducers/store/user";
import App from "../../components/App";

interface IDisable {
    email: boolean;
    auth: boolean;
}

interface IPassword {
    resetPassword: string;
    reResetPassword: string;
}

const resetPassword = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    // ref
    const authRef = useRef<HTMLInputElement>(null);
    const resetPasswordRef = useRef<HTMLInputElement>(null);
    const reResetPasswordRef = useRef<HTMLInputElement>(null);

    // 사용자의 이메일
    const [email, setEmail] = useState<string>("");
    const changeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    // 이메일 인증번호
    const [auth, setAuth] = useState<string>("");
    const changeAuth = (e: ChangeEvent<HTMLInputElement>): void => {
        setAuth(e.target.value);
    };

    // 비밀번호 변경
    const [password, setPassword] = useState<IPassword>({
        resetPassword: "",
        reResetPassword: "",
    });
    const changePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.id === "resetPassword") {
            setPassword({
                ...password,
                resetPassword: e.target.value,
            });
        } else if (e.target.id === "reResetPassword") {
            setPassword({
                ...password,
                reResetPassword: e.target.value,
            });
        }
    };

    // 버튼 활성화
    const [isDisable, setIsDisable] = useState<IDisable>({
        email: true,
        auth: true,
    });

    // 이메일 제출버튼 활성화
    useEffect((): void => {
        if (isValidEmail(email)) {
            setIsDisable({
                ...isDisable,
                email: false,
            });
        } else {
            setIsDisable({
                ...isDisable,
                email: true,
            });
        }
    }, [email]);

    // 비밀번호 재설정버튼 활성화
    useEffect((): void => {
        if (auth === "" || password.resetPassword === "" || password.reResetPassword === "") {
            setIsDisable({
                ...isDisable,
                auth: true,
            });
        } else {
            setIsDisable({
                ...isDisable,
                auth: false,
            });
        }
    }, [auth, password]);

    // 에러 메세지
    const [emailError, setEmailError] = useState<string>("");
    const [authError, setAuthError] = useState<string>("");

    // 엔터 단축키 관련
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
        const target = e.target as HTMLInputElement;
        if (!isDisable.email && target.id === "email" && e.code === "Enter") {
            requestAuth();
        } else if (target.id === "auth" && e.code === "Enter") {
            resetPasswordRef.current.focus();
        } else if (target.id === "resetPassword" && e.code === "Enter") {
            reResetPasswordRef.current.focus();
        } else if (target.id === "reResetPassword" && e.code === "Enter" && !isDisable.auth) {
            requestForgetPassword();
        }
    };

    // 인증번호 관련
    const [authNumber, setAuthNumber] = useState<string>("");
    const [showAuth, setShowAuth] = useState<boolean>(false);

    useEffect(() => {
        console.log(authNumber);
    }, [authNumber]);

    // 타이머
    const [min, setMin] = useState<number>(3);
    const [sec, setSec] = useState<number>(0);
    const time = useRef<number>(180);
    const timerId = useRef(null);

    useEffect((): void => {
        // 시간이 끝난 경우
        if (time.current < 0) {
            clearInterval(timerId.current);
            setAuthNumber("");
        }
    }, [sec]);

    // 비밀번호 재설정 링크 요청
    const requestAuth = (): void => {
        setIsDisable({
            ...isDisable,
            email: true,
        });
        setShowAuth(false);
        setEmailError("");
        setAuthError("");
        setPassword({
            resetPassword: "",
            reResetPassword: "",
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
            .post("http://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/user/passwordEmailAuth/", {
                email: email,
            })
            .then((res) => {
                setAuthNumber(String(res.data.data));
                setShowAuth(true);
                setIsDisable({
                    ...isDisable,
                    email: false,
                });
                authRef.current.focus();
            })
            .catch((err) => {
                // 가입된 메일이 아닐경우
                clearInterval(timerId.current);
                setEmailError("등록된 계정이 없습니다.");
                setIsDisable({
                    ...isDisable,
                    email: false,
                });
            });
    };

    // 비밀번호 재설정 요청
    const requestForgetPassword = (): void => {
        if (password.resetPassword === password.reResetPassword) {
            if (authNumber === auth) {
                axios
                    .put(`http://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/user/forgetPassword/${email}`, {
                        newPassword: password.resetPassword,
                    })
                    .then((res) => {
                        clearInterval(timerId.current);
                        router.push({
                            pathname: "/auth/login",
                            query: {
                                resetPassword: true,
                            },
                        });
                        setTimeout(() => {
                            dispatch(setAlert(true));
                        }, 50);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                setAuthError("인증번호가 일지하지 않습니다.");
            }
        } else {
            setAuthError("새 비밀번호가 일치하지 않습니다.");
        }
    };

    return (
        <>
            <App />
            <Header />
            <AuthContainer>
                <h1 className="font-bold text-5xl">비밀번호 재설정</h1>
                <p className="text-gray-600 mt-6 inline-flex w-96 text-left">이메일을 입력하시면, 인증번호를 보내드립니다.</p>
                <div className="mt-6">
                    <input
                        id="email"
                        className="border-2 border-slate-200 w-96 h-12 rounded-md pl-2 outline-main"
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
                {emailError && <p className="mt-0.5 inline-flex w-96 text-left pl-2 text-red-400">{emailError}</p>}
                <div className="mt-4">
                    <button className={`w-96 h-12 rounded-md ${isDisable.email ? "bg-slate-100 text-slate-300" : "bg-main text-white"}`} disabled={isDisable.email} onClick={requestAuth}>
                        인증번호 요청
                    </button>
                </div>
                {/* {showAuthNumber && ( */}
                {/* {true && ( */}
                {showAuth && (
                    <>
                        <p className="inline-flex mt-4 w-96 text-gray-600 text-sm">
                            이메일 인증 <span className="text-red-400 text-sm ml-2">{time.current !== -1 ? `${min}분 ${sec}초` : "인증시간을 초과하였습니다."}</span>
                        </p>
                        <div className="mt-2">
                            <input
                                id="auth"
                                className="border-2 border-slate-200 w-96 h-12 rounded-md pl-2 outline-main"
                                type={"text"}
                                value={auth}
                                onChange={(e) => {
                                    changeAuth(e);
                                }}
                                placeholder="인증번호 6자리를 입력해주세요"
                                onKeyDown={(e) => {
                                    pressEnter(e);
                                }}
                                ref={authRef}
                            />
                        </div>
                        <div className="mt-2">
                            <input
                                id="resetPassword"
                                className="border-2 border-slate-200 w-96 h-12 rounded-md pl-2 outline-main"
                                type={"password"}
                                value={password.resetPassword}
                                onChange={(e) => {
                                    changePassword(e);
                                }}
                                placeholder="새로운 비밀번호를 입력해주세요."
                                onKeyDown={(e) => {
                                    pressEnter(e);
                                }}
                                ref={resetPasswordRef}
                            />
                        </div>
                        <div className="mt-2">
                            <input
                                id="reResetPassword"
                                className="border-2 border-slate-200 w-96 h-12 rounded-md pl-2 outline-main"
                                type={"password"}
                                value={password.reResetPassword}
                                onChange={(e) => {
                                    changePassword(e);
                                }}
                                placeholder="새로운 비밀번호를 다시 입력해주세요."
                                onKeyDown={(e) => {
                                    pressEnter(e);
                                }}
                                ref={reResetPasswordRef}
                            />
                        </div>
                        {authError && <p className="mt-0.5 inline-flex w-96 text-left pl-2 text-red-400">{authError}</p>}
                        <div className="mt-4">
                            <button
                                className={`w-96 h-12 rounded-md ${time.current < 0 ? "bg-slate-100 text-slate-300" : isDisable.auth ? "bg-slate-100 text-slate-300" : "bg-main text-white"}`}
                                disabled={time.current < 0 ? true : isDisable.auth}
                                onClick={requestForgetPassword}
                            >
                                비밀번호 재설정
                            </button>
                        </div>
                    </>
                )}
                <p className="inline-flex w-96 mt-4 text-sm text-slate-500">
                    비밀번호가 생각나셨나요?{" "}
                    <Link href={"/auth/login"}>
                        <span className="ml-2 text-main cursor-pointer">로그인</span>
                    </Link>
                </p>
            </AuthContainer>
        </>
    );
};

export default resetPassword;
