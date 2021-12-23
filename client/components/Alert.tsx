import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../reducers/store/user";

interface IProps {
    title: string;
    subTitle: string;
}

const Alert = ({ title, subTitle }: IProps) => {
    const dispatch = useDispatch();
    // 모달 창 보임 유무
    const isVisible = useSelector(({ user }: any) => user.alert);
    const toggleModal = (): void => {
        dispatch(setAlert(!isVisible));
    };
    return (
        <>
            <div
                className={`w-full absolute top-0 left-0 white bg-opacity-100 flex justify-center items-start ${
                    isVisible ? "z-10 opacity-100 h-full" : "-z-10 opacity-0 h-0"
                }`}
                onClick={toggleModal}
            >
                <div
                    className={`w-96 h-32 rounded-md bg-white p-6 relative border-1 shadow-md transition-all ${
                        isVisible ? "top-10 opacity-100" : "top-0 opacity-0"
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="text-lg font-bold">{title}</div>
                    <div className="text-sm mt-4">{subTitle}</div>
                    <div className="mt-8 text-right space-x-2 absolute bottom-6 right-6">
                        <button
                            className={`w-20 h-8 rounded-md bg-main text-white text-sm`}
                            onClick={toggleModal}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Alert;
