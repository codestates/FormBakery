import React, { useEffect, useState } from "react";

interface Modal {
    title: string;
    subTitle: string;
    onClick: () => void;
    show: boolean;
}

const Modal = ({ title, subTitle, onClick, show }: Modal) => {
    // 모달 창 보임 유무
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (show) {
            setIsVisible(show);
        }
    }, [show]);
    const toggleModal = () => {
        setIsVisible((prev) => !prev);
    };
    return (
        <>
            {isVisible && (
                <div
                    className="w-full h-full absolute top-0 left-0 z-10 bg-black bg-opacity-20 flex justify-center items-center"
                    onClick={toggleModal}
                >
                    <div
                        className="w-96 h-48 rounded-md bg-white p-6 relative"
                        onClick={toggleModal}
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
            )}
        </>
    );
};

export default Modal;
