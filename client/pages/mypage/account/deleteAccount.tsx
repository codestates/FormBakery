import React, { ChangeEvent, useEffect, useState } from "react";
import MypageHeader from "../../../components/layout/MypageHeader";
import AccountLeftPannel from "../../../components/layout/AccountLeftPannel";
import Modal from "../../../components/Modal";

const deleteAccount = () => {
    // 탈퇴한다 입력창
    const [deleteAccount, setDeleteAccount] = useState<string>("");
    const stateHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setDeleteAccount(e.target.value);
    };

    // 계정 삭제버튼 활성화
    const [isDisable, setIsDisable] = useState<boolean>(true);

    useEffect((): void => {
        if (deleteAccount === "계정삭제") {
            setIsDisable(false);
        } else {
            setIsDisable(true);
        }
    }, [deleteAccount]);

    // 계정 삭제버튼 클릭시 모달 활성화
    const [showModal, setShowModal] = useState<boolean>(false);

    const buttonHandler = (): void => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 100);
    };

    // 계정 삭제요청
    const requestDelete = (): void => {
        alert("계정 삭제요청");
    };
    return (
        <>
            <MypageHeader />
            <main className="mt-1 text-center pt-8">
                <div className="inline-flex w-222">
                    <AccountLeftPannel />
                    <div className="w-5/6 text-left pl-4">
                        <p className="text-lg font-semibold">계정 탈퇴</p>
                        <div className="text-center mt-5 text-sm">
                            <p className="text-2xl">
                                폼 베이커리 탈퇴 전 꼭 확인해 주세요!
                            </p>
                            <p className="mt-2">
                                폼 베이커리계정을 탈퇴하면 계정 정보 및 폼
                                베이커리 서비스 이용기록 등 모든 정보가
                                삭제됩니다.
                            </p>
                            <p>
                                탈퇴된 폼 베이커리계정으로는 로그인 할 수
                                없으므로 서비스 이용을 할 수 없게 됩니다.
                            </p>
                            <p>
                                탈퇴된 폼 베이케러계정 정보와 서비스 이용기록
                                등은 복구할 수 없으니 신중하게 선택해주시기
                                바랍니다.
                            </p>
                        </div>
                        <div className="border-t-2 mt-5" />
                        <div className="text-center mt-3">
                            <input
                                className="border-2 w-80 h-10 rounded-md pl-2 outline-red-400 mr-2"
                                type={"text"}
                                value={deleteAccount}
                                onChange={(e) => {
                                    stateHandler(e);
                                }}
                                placeholder="'계정삭제'를 입력해주세요."
                            />
                            <button
                                className={`w-36 h-10 rounded-md ${
                                    isDisable
                                        ? "bg-slate-100 text-slate-300"
                                        : "bg-red-400 text-white"
                                }`}
                                disabled={isDisable}
                                onClick={buttonHandler}
                            >
                                계정 삭제
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Modal
                title={"계정 삭제"}
                subTitle={"정말로 계정을 삭제하시겠습니까? ㅠㅠㅠㅠㅠ"}
                show={showModal}
                onClick={requestDelete}
            />
        </>
    );
};

export default deleteAccount;
