import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MypageHeader from "../../components/layout/MypageHeader";
import { useSelector } from "react-redux";
import axios from "axios";
import DescriptionIcon from "@material-ui/icons/Description";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal";
import { setAlert, setModal } from "../../reducers/store/user";
import Alert from "../../components/Alert";
import App from "../../components/App";

interface IForms {
    id: string;
    title: string;
    updatedAt: string;
}

interface IData {
    UserEmail: string;
    formContents: [];
    id: string;
    subTitle: string;
    title: string;
    userEmail: string;
    createdAt: string;
    updatedAt: string;
}

const MyForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    // 접속한 유저의 이메일
    const email = useSelector(({ user }: any) => user.userInfo.email);
    // 설문지 목록
    const [forms, setForms] = useState<IForms[]>([]);

    // 설문지 목록요청
    const requestForms = (): void => {
        axios
            .post(`https://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/form/list/${email}`, { email: email })
            .then((res) => {
                setForms(
                    res.data.data.map((obj: IData): IForms => {
                        delete obj.UserEmail;
                        delete obj.userEmail;
                        delete obj.formContents;
                        delete obj.subTitle;
                        delete obj.createdAt;
                        // const updatedAt: string = obj.updatedAt.split("T")[0];
                        // return {
                        //     ...obj,
                        //     updatedAt: updatedAt,
                        // };
                        return obj;
                    })
                );
            })
            .catch((err) => {
                console.log(err);
                setForms([]);
            });
    };

    // 페이지 입장 시 설문지 목록 불러옴
    useEffect(() => {
        requestForms();
    }, []);
    // 설문지 클릭시 설문지 페이지로 이동
    const showForm = (id: string): void => {
        router.push(`/forms/${id}`);
    };

    // 유저아이콘 클릭 시 모달의 보임 유무 state 관리
    const [selectedId, setSelectedId] = useState<string>("");
    const [beDeletedId, setBeDeletedId] = useState<string>("");

    // 정말 삭제 할지 모달 띄우기
    const openModal = (): void => {
        setBeDeletedId(selectedId);
        setSelectedId("");
        dispatch(setModal(true));
    };

    // 설문지 삭제요청
    const requestDeleteForm = (): void => {
        axios
            .delete(`https://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/form/delete/${beDeletedId}`)
            .then((res) => {
                requestForms();
                dispatch(setAlert(true));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <App />
            <MypageHeader setSelectedId={setSelectedId} />
            <div
                className="flex justify-center py-5 min-h-myforms"
                onClick={() => {
                    setSelectedId("");
                }}
            >
                {forms.length !== 0 ? (
                    <div className="w-222 inline-block">
                        <div className={`flex items-center w-full text-slate-600 border-slate-300 py-2`}>
                            <div className="w-10 flex justify-center items-center" />
                            <div className="w-8/12 pr-4 text-ellipsis overflow-hidden whitespace-nowrap">제목</div>
                            <div className="w-3/12">최근 수정날짜</div>
                        </div>
                        {forms.map(({ id, title, updatedAt }, idx) => {
                            return (
                                <div
                                    className={`flex items-center w-full text-slate-600 border-t-1 border-slate-300 py-2 hover:border-white hover:bg-yellow-100 hover:rounded-full ${idx === 0 && "border-none"}`}
                                    key={id}
                                    onClick={() => {
                                        showForm(id);
                                    }}
                                >
                                    <div className="w-10 flex justify-center items-center">
                                        <DescriptionIcon />
                                    </div>
                                    <div className="w-8/12 pr-4 text-ellipsis overflow-hidden whitespace-nowrap">{title}</div>
                                    <div className="w-3/12">{updatedAt}</div>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedId(id);
                                        }}
                                        className="relative"
                                    >
                                        <IconButton size={"small"}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        {selectedId === id && (
                                            <div className=" bg-white absolute z-10 -left-12 top-9 w-32 py-2 border-1 rounded-md text-xs text-slate-500 shadow-md">
                                                <p
                                                    className="hover:bg-gray-100 cursor-pointer px-2 py-2 font"
                                                    onClick={() => {
                                                        showForm(id);
                                                    }}
                                                >
                                                    설문지 보기
                                                </p>
                                                <div className="flex justify-center mt-2 mb-1">
                                                    <div className=" inline-flex w-28 h-1 border-t-1" />
                                                </div>
                                                <p
                                                    className="hover:bg-gray-100 cursor-pointer px-2 py-2 text-red-400"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openModal();
                                                    }}
                                                >
                                                    설문지 삭제
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="w-222 inline-block">폼이 없습니다. 메인화면에서 폼을 만들어주세요.</div>
                )}
            </div>
            <Modal title={"폼 삭제"} subTitle={"정말로 폼을 삭제 하시겠습니까?"} onClick={requestDeleteForm} />
            <Alert title={"폼 삭제"} subTitle={"폼이 삭제 되었습니다."} />
        </>
    );
};

export default MyForm;
