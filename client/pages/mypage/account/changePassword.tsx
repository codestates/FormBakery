import React, {
    useRef,
    useState,
    useEffect,
    ChangeEvent,
    KeyboardEvent,
} from "react";
import MypageHeader from "../../../components/layout/MypageHeader";
import AccountLeftPannel from "../../../components/layout/AccountLeftPannel";

interface IPassword {
    newPassword: string;
    reNewPassword: string;
}

const changePassword = () => {
    // ref
    const reNewPasswordRef = useRef<HTMLInputElement>(null);

    // 새 비밀번호, 비밀번호 확인
    const [passwordInfo, setPasswordInfo] = useState<IPassword>({
        newPassword: "",
        reNewPassword: "",
    });

    // usestate 변경 관련
    const stateHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.id === "newPassword") {
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

    // 저장 버튼 활성화 관련
    const [isDisable, setIsDisable] = useState<boolean>(true);

    useEffect((): void => {
        if (
            passwordInfo.newPassword === "" ||
            passwordInfo.reNewPassword === ""
        ) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [passwordInfo]);

    // 엔터 단축키 관련
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
        const target = e.target as HTMLInputElement;
        if (target.id === "newPassword" && e.code === "Enter") {
            reNewPasswordRef.current.focus();
        } else if (target.id === "reNewPassword" && e.code === "Enter") {
            requestModify();
        }
    };

    // 비밀번호 수정 요청
    const requestModify = (): void => {
        if (passwordInfo.newPassword === passwordInfo.reNewPassword) {
            setMatchError("");
            alert("비밀번호 수정 요청");
        } else {
            setMatchError("비밀번호가 일치하지 않습니다.");
        }
    };

    return (
        <>
            <MypageHeader />
            <main className="mt-1 text-center pt-8">
                <div className="inline-flex w-222">
                    <AccountLeftPannel />
                    <div className="w-5/6 text-left pl-4">
                        <div className="text-lg font-semibold">
                            비밀번호 변경
                        </div>
                        <div className="mt-8 pl-4 space-y-6 relative">
                            <div className="flex items-center space-x-16 text-sm">
                                <span>새 비밀번호</span>
                                <input
                                    id="newPassword"
                                    className="border-2 w-80 h-10 rounded-md pl-2 outline-main"
                                    type={"password"}
                                    value={passwordInfo.newPassword}
                                    onChange={(e) => {
                                        stateHandler(e);
                                    }}
                                    placeholder="새 비밀번호를 입력해주세요"
                                    onKeyDown={(e) => {
                                        pressEnter(e);
                                    }}
                                />
                            </div>
                            <div className="flex items-center space-x-8 text-sm">
                                <span>새 비밀번호 확인</span>
                                <input
                                    id="reNewPassword"
                                    className="border-2 w-80 h-10 rounded-md pl-2 outline-main"
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
                            <div className="text-sm text-red-400 absolute top-20 left-40">
                                {matchError}
                            </div>
                        </div>

                        <div className="text-right mt-20">
                            <button
                                className={`w-36 h-10 rounded-md ${
                                    isDisable
                                        ? "bg-slate-100 text-slate-300"
                                        : "bg-main text-white"
                                }`}
                                disabled={isDisable}
                                onClick={requestModify}
                            >
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default changePassword;
