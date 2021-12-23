import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface IOption {
    id: string;
    label: string;
}

const AccountLeftPannel = () => {
    const router = useRouter();
    const leftPanelOption: IOption[] = [
        {
            id: "profile",
            label: "프로필 설정",
        },
        { id: "changePassword", label: "비밀번호 변경" },
        { id: "deleteAccount", label: "계정 삭제" },
    ];
    const [selectedOption, setSelectedOption] = useState<string>(
        router.pathname.split("/")[3]
    );
    return (
        <div className="w-56 text-sm text-gray-600 text-left space-y-1">
            {leftPanelOption.map((v, i) => {
                return (
                    <Link href={`/mypage/account/${v.id}`} key={v.id} passHref>
                        <div
                            className={`pl-2 py-2 rounded-md cursor-pointer  ${
                                v.id === selectedOption
                                    ? "bg-slate-600 text-main"
                                    : "hover:bg-gray-200"
                            }`}
                            onClick={() => {
                                setSelectedOption(v.id);
                            }}
                        >
                            {v.label}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default AccountLeftPannel;
