import React, { ChangeEvent, useEffect, useState } from "react";
import MypageHeader from "../../../components/layout/MypageHeader";
import AccountLeftPannel from "../../../components/layout/AccountLeftPannel";
import Modal from "../../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setAlert, logout } from "../../../reducers/store/user";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "../../../components/Alert";
import App from "../../../components/App";

const DeleteAccount = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const email = useSelector(({ user }: any) => user.userInfo.email);
    // 비밀번호 입력
    const [password, setPassword] = useState<string>("");
    const stateHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    // 계정 삭제버튼 활성화
    const [isDisable, setIsDisable] = useState<boolean>(true);

    useEffect((): void => {
        if (password === "") {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [password]);

    // 계정 삭제버튼 클릭시 모달 활성화
    const buttonHandler = (): void => {
        dispatch(setModal(true));
    };

    // 계정 삭제요청
    const requestDelete = (): void => {
        axios
            .post(`https://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/user/signout/${email}`, { password: password })
            .then((res) => {
                router.push({
                    pathname: "/",
                    query: {
                        signout: true,
                    },
                });
                dispatch(logout());
                setTimeout(() => {
                    dispatch(setAlert(true));
                }, 50);
            })
            .catch((err) => {
                if (err.response.data.message === "incorrect password") {
                    dispatch(setAlert(true));
                }
            });
    };

    // 비밀번호 에러 메세지
    return (
        <>
            <App />
            <MypageHeader />
            <main className="mt-1 text-center pt-8">
                <div className="inline-flex w-222">
                    <AccountLeftPannel />
                    <div className="w-5/6 text-left pl-4">
                        <p className="text-lg font-semibold">계정 삭제</p>
                        <div className="text-center mt-5 text-sm">
                            <p className="text-2xl">폼 베이커리 탈퇴 전 꼭 확인해 주세요!</p>
                            <p className="mt-2">폼 베이커리계정을 탈퇴하면 계정 정보 및 폼 베이커리 서비스 이용기록 등 모든 정보가 삭제됩니다.</p>
                            <p>탈퇴된 폼 베이커리계정으로는 로그인 할 수 없으므로 서비스 이용을 할 수 없게 됩니다.</p>
                            <p>탈퇴된 폼 베이케러계정 정보와 서비스 이용기록 등은 복구할 수 없으니 신중하게 선택해주시기 바랍니다.</p>
                        </div>
                        <div className="border-t-2 border-slate-200 mt-5" />
                        <div className="text-center mt-3">
                            <input
                                className="border-2 w-80 border-slate-200 h-10 rounded-md pl-2 outline-red-400 mr-2 text-sm"
                                type={"password"}
                                value={password}
                                onChange={(e) => {
                                    stateHandler(e);
                                }}
                                placeholder="계정삭제를 위해 비밀번호를 입력해주세요."
                                onKeyDown={(e) => {
                                    if (e.code === "Enter") {
                                        buttonHandler();
                                    }
                                }}
                            />
                            <button className={`w-36 h-10 rounded-md ${isDisable ? "bg-slate-100 text-slate-300" : "bg-red-400 text-white"}`} disabled={isDisable} onClick={buttonHandler}>
                                계정 삭제
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Modal title={"계정 삭제"} subTitle={"정말로 계정을 삭제하시겠습니까? ㅠㅠㅠㅠㅠ"} onClick={requestDelete} />
            <Alert title={"계정삭제"} subTitle={"비밀번호가 틀렸습니다."} />
        </>
    );
};

export default DeleteAccount;
