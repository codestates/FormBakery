import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../reducers/store/user";

interface IProps {
    title: string;
    subTitle: string;
    onClick: () => void;
}

const Modal = ({ title, subTitle, onClick }: IProps) => {
    const dispatch = useDispatch();
    // 모달 창 보임 유무
    const isVisible = useSelector(({ user }: any) => user.modal);
    const toggleModal = (): void => {
        dispatch(setModal(!isVisible));
    };
    return (
        <>
            <div
                className={`w-full absolute top-0 left-0 bg-black bg-opacity-20 flex justify-center items-center ${
                    isVisible
                        ? "z-10 opacity-100 h-full"
                        : "-z-10 opacity-0 h-0"
                }`}
                onClick={toggleModal}
            >
                <div
                    className={`w-96 h-48 rounded-md bg-white relative p-6 border-1 shadow-md transition-all ${
                        isVisible ? "opacity-100 top-0" : "opacity-0 top-10"
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="text-lg font-bold">{title}</div>
                    <div className="text-sm mt-4">{subTitle}</div>
                    <div className="mt-8 text-right space-x-2 absolute bottom-6 right-6">
                        <button
                            className={`w-20 h-8 rounded-md border-1 border-main text-main text-sm`}
                            onClick={toggleModal}
                        >
                            취소
                        </button>
                        <button
                            className={`w-20 h-8 rounded-md bg-main text-white text-sm`}
                            onClick={() => {
                                toggleModal();
                                onClick();
                            }}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
