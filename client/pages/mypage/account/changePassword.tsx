import React, { useRef, useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import MypageHeader from "../../../components/layout/MypageHeader";
import AccountLeftPannel from "../../../components/layout/AccountLeftPannel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../reducers/store/user";
import Alert from "../../../components/Alert";
import App from "../../../components/App";

interface IPassword {
    password: string;
    newPassword: string;
    reNewPassword: string;
}

const ChangePassword = () => {
    const dispatch = useDispatch();
    // 회원 이메일
    const email = useSelector(({ user }: any) => user.userInfo.email);
    // ref
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const reNewPasswordRef = useRef<HTMLInputElement>(null);

    // 새 비밀번호, 비밀번호 확인
    const [passwordInfo, setPasswordInfo] = useState<IPassword>({
        password: "",
        newPassword: "",
        reNewPassword: "",
    });

    // usestate 변경 관련
    const stateHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.id === "password") {
            setPasswordInfo({
                ...passwordInfo,
                password: e.target.value,
            });
        } else if (e.target.id === "newPassword") {
            setPasswordInfo({
                ...passwordInfo,
                newPassword: e.target.value,
            });
        } else if (e.target.id === "reNewPassword") {
            setPasswordInfo({
                ...passwordInfo,
                reNewPassword: e.target.value,
            });
        }
    };

    // 비밀번호가 같지 않을 경우 오류 메세지
    const [matchError, setMatchError] = useState<string>("");

    // 현재 비밀번호가 틀렸을때 오류 메세지
    const [passwordError, setPasswordError] = useState<string>("");

    // 저장 버튼 활성화 관련
    const [isDisable, setIsDisable] = useState<boolean>(true);

    useEffect((): void => {
        if (passwordInfo.password === "" || passwordInfo.newPassword === "" || passwordInfo.reNewPassword === "") {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [passwordInfo]);

    // 엔터 단축키 관련
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
        const target = e.target as HTMLInputElement;
        if (target.id === "password" && e.code === "Enter") {
            newPasswordRef.current.focus();
        } else if (target.id === "newPassword" && e.code === "Enter") {
            reNewPasswordRef.current.focus();
        } else if (target.id === "reNewPassword" && e.code === "Enter" && !isDisable) {
            reNewPasswordRef.current.blur();
            requestModify();
        }
    };

    // HTTP 응답
    const [statusCode, setStatusCode] = useState<number>(0);

    // 비밀번호 수정 요청
    const requestModify = (): void => {
        if (passwordInfo.newPassword === passwordInfo.reNewPassword) {
            setMatchError("");
            axios
                .put(`http://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/user/changePassword/${email}`, {
                    password: passwordInfo.password,
                    newPassword: passwordInfo.newPassword,
                })
                .then((res) => {
                    setStatusCode(200);
                    setPasswordInfo({
                        password: "",
                        newPassword: "",
                        reNewPassword: "",
                    });
                    setTimeout(() => {
                        dispatch(setAlert(true));
                    }, 50);
                })
                .catch((err) => {
                    if (err.response.data.message === "unAuthorized") {
                        setStatusCode(401);
                        setTimeout(() => {
                            dispatch(setAlert(true));
                        }, 50);
                    }
                });
        } else {
            setMatchError("새 비밀번호가 일치하지 않습니다.");
        }
    };

    return (
        <>
            <App />
            <MypageHeader />
            <main className="mt-1 text-center pt-8">
                <div className="inline-flex w-222">
                    <AccountLeftPannel />
                    <div className="w-5/6 text-left pl-4">
                        <div className="text-lg font-semibold">비밀번호 변경</div>
                        <div className="mt-8 pl-4 space-y-6 relative">
                            <div className="flex items-center space-x-12 text-sm">
                                <span>현재 비밀번호</span>
                                <input
                                    id="password"
                                    className="border-2 border-slate-200 w-80 h-10 rounded-md pl-2 outline-main left-0.5 relative"
                                    type={"password"}
                                    value={passwordInfo.password}
                                    onChange={(e) => {
                                        stateHandler(e);
                                    }}
                                    placeholder="현재 비밀번호를 입력해주세요"
                                    onKeyDown={(e) => {
                                        pressEnter(e);
                                    }}
                                />
                            </div>
                            <div className="flex items-center space-x-16 text-sm">
                                <span>새 비밀번호</span>
                                <input
                                    id="newPassword"
                                    className="border-2 border-slate-200 w-80 h-10 rounded-md pl-2 outline-main"
                                    type={"password"}
                                    value={passwordInfo.newPassword}
                                    onChange={(e) => {
                                        stateHandler(e);
                                    }}
                                    placeholder="새 비밀번호를 입력해주세요"
                                    onKeyDown={(e) => {
                                        pressEnter(e);
                                    }}
                                    ref={newPasswordRef}
                                />
                            </div>
                            <div className="flex items-center space-x-8 text-sm">
                                <span>새 비밀번호 확인</span>
                                <input
                                    id="reNewPassword"
                                    className="border-2 border-slate-200 w-80 h-10 rounded-md pl-2 outline-main"
                                    type={"password"}
                                    value={passwordInfo.reNewPassword}
                                    onChange={(e) => {
                                        stateHandler(e);
                                    }}
                                    placeholder="새 비밀번호를 다시 입력해주세요"
                                    onKeyDown={(e) => {
                                        pressEnter(e);
                                    }}
                                    ref={reNewPasswordRef}
                                />
                            </div>
                            <div className="text-sm text-red-400 absolute top-36 left-40">{matchError}</div>
                        </div>

                        <div className="text-right mt-20">
                            <button className={`w-36 h-10 rounded-md ${isDisable ? "bg-slate-100 text-slate-300" : "bg-main text-white"}`} disabled={isDisable} onClick={requestModify}>
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Alert title={"비밀번호 변경"} subTitle={statusCode === 200 ? "비밀번호를 변경하였습니다." : "현재 비밀번호가 틀렸습니다."} />
        </>
    );
};

export default ChangePassword;
