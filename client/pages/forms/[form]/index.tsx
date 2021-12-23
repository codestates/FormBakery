import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import Card from "../../../components/Card";
import Toggle from "../../../components/Toggle";
import Input from "../../../components/Input";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem, Tooltip, IconButton, Divider, Button } from "@material-ui/core";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import WarningIcon from "@material-ui/icons/Warning";
import SubjectIcon from "@material-ui/icons/Subject";
import Logo from "../../../components/Logo";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Alert from "../../../components/Alert";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../reducers/store/user";
import App from "../../../components/App";

// @material-ui/core/styles 적용
const useStyles = makeStyles((theme) => ({
    select: {
        backgroundColor: "white",
        width: 208,
        height: 48,
        color: "#5f6368",
        outline: "none",
        inline: "none",
        "&:focus": {
            backgroundColor: "white",
        },
        "&:hover": {
            backgroundColor: "white",
        },
        "&:active": {
            backgroundColor: "white",
        },
        "&:link": {
            backgroundColor: "white",
        },
        "&:visited": {
            backgroundColor: "white",
        },
    },
    MenuItem: {
        color: "#5F6368",
        "&:hover": {
            backgroundColor: "#EEEEEE",
        },
        "&:focus": {
            backgroundColor: "rgba(26,115,232,0.078)",
        },
        "&:focus:hover": {
            backgroundColor: "rgba(26,115,232,0.039)",
        },
    },
    icon: {
        marginRight: 10,
    },
    MenuItemList: {
        display: "flex",
        alignItems: "center",
    },
    MenuItemListLabel: {
        marginTop: 3,
        marginLeft: 10,
    },
}));

interface IGridData {
    row: number;
    col: number;
    rawName: string[];
    colName: string[];
}

interface IFormOptions {
    text: string;
    uuid: string;
}

interface IQuestions {
    question: string; // 질문제목
    type: string; // 타입 (short, long, check, radio, drop, calender, time)
    order: number; // 순서
    section: number; // 페이지
    content?: string; // 질문설명
    isNeccessary?: boolean; // 필수
    gridData?: IGridData; // 그리드
    formOptions?: IFormOptions[]; //체크박스,라디오,드롭다운
    uuid: string; // 문제ID
}

// form 생성영역
const CreateForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const classes = useStyles();
    //ref
    const rightDiv = useRef<HTMLDivElement>(null);
    const headerTitle = useRef<HTMLInputElement>(null);
    const footer = useRef<HTMLDivElement>();

    // 폼 아이디로 폼 조회
    useEffect((): void => {
        // 폼 아이디
        if (router.query.form) {
            axios
                .get(`https://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/form/get/${router.query.form}`)
                .then((res) => {
                    setTitle(res.data.data.title);
                    setSubTitle(res.data.data.subTitle);
                    setQuestions(
                        res.data.data.formContents.map((question) => {
                            if (question.type === "long" || question.type === "short" || question.type === "calendar" || question.type === "time") {
                                delete question.id;
                                return {
                                    ...question,
                                    isNeccessary: question.isNeccessary === "n" ? false : true,
                                    formOptions: [{ text: "옵션 1", uuid: uuid() }],
                                    uuid: uuid(),
                                };
                            } else {
                                delete question.id;
                                return {
                                    ...question,
                                    isNeccessary: question.isNeccessary === "n" ? false : true,
                                    formOptions: question.formOptions.map((val) => {
                                        return {
                                            text: val.text,
                                            uuid: uuid(),
                                        };
                                    }),
                                    uuid: uuid(),
                                };
                            }
                        })
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [router.query.form]);

    // 제목 설정
    const [title, setTitle] = useState<string>("");
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setTitle(e.target.value);
    };

    // 부제목 설정
    const [subTitle, setSubTitle] = useState<string>("");
    const onChangeSubTitle = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setSubTitle(e.target.value);
    };

    // 질문 설정
    const [questions, setQuestions] = useState<IQuestions[]>([
        {
            question: "제목없는 질문",
            type: "radio",
            order: 1,
            section: 1,
            isNeccessary: false,
            formOptions: [{ text: "옵션 1", uuid: uuid() }],
            uuid: uuid(),
        },
    ]);

    // 선택된 질문 index
    const [cardIndex, setCardIndex] = useState<number>(1);

    // 헤더의 제목 focus시 밑줄 효과
    const [focus, setFocus] = useState<boolean>(false);

    // 옵션의 id
    const [optionUuid, setOptionUuid] = useState<string>("");

    // 별표 유무
    const [fillStar, setFillStar] = useState<boolean>(false);

    // 경고메세지표시 index
    const [warningIndex, setWarningIndex] = useState<string>("");

    // 우측 질문추가 버튼 위치 조정
    const itemClickHandler = (i: number): void => {
        const newTopHeight: HTMLElement | any = cardIndex === 0 ? document.getElementById("cardContainer").children[0] : document.getElementById("cardContainer").children[1].children[cardIndex - 1];
        if (newTopHeight !== null) {
            rightDiv.current.style.top = newTopHeight.offsetTop + "px";
        }
    };

    // 헤더 제목에 따른 제목 너비변화
    useEffect((): void => {
        headerTitle.current.style.width = (headerTitle.current.value.replace(/\s/gi, "").length + 1) * 18 + (headerTitle.current.value.match(/ /g) || []).length * 5 + "px";
    }, [title]);

    // 질문 갯수에 따라서 질문 focus 바뀜
    const [questionsLength, setQuestionsLength] = useState<number>(1);

    // 질문 갯수가 늘어날 때 최근에 늘어난 곳으로 focus이동, 만약 삭제될 경우 그 전 질문으로 focus 이동
    useEffect((): void => {
        if (questions.length === questionsLength + 1) {
            setCardIndex(cardIndex + 1);
            if (cardIndex === questions.length - 1) {
                footer.current.scrollIntoView({ behavior: "smooth" });
            }
        } else if (questions.length === questionsLength - 1) {
            if (cardIndex === 1 && questions.length != 0) {
                setCardIndex(cardIndex);
            } else {
                setCardIndex(cardIndex - 1);
            }
        }
        setQuestionsLength(questions.length);
    }, [questions]);

    // // 사이트 나갈 때 경고창
    // useEffect(() => {
    //     itemClickHandler(1);
    //     window.onbeforeunload = function (e) {
    //         var dialogText = "Dialog text here";
    //         e.returnValue = dialogText;
    //         return dialogText;
    //     };
    // }, []);

    // 선택 이전 카드내역
    const [prevCardIndex, setprevCardIndex] = useState<number>(1);

    // 선택 카드가 바뀔때마다 해당 질문 블록지정
    useEffect((): void => {
        itemClickHandler(cardIndex);
        if (cardIndex != prevCardIndex && cardIndex != 0) {
            if (cardIndex === 0) {
                const textarea = document.getElementById("cardContainer").children[0].getElementsByClassName("customTextarea")[0] as HTMLTextAreaElement;
                textarea.select();
            } else {
                const textarea = document.getElementById("cardContainer").children[1].children[cardIndex - 1].getElementsByClassName("customTextarea")[0] as HTMLTextAreaElement;
                textarea.select();
            }
        }
        setprevCardIndex(cardIndex);
    }, [cardIndex]);

    // 옵션 섞는 기능
    const shuffleArray = (array: IFormOptions[]): IFormOptions[] => {
        for (let i = 0; i < array.length; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            const x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    };

    useEffect((): void => {
        document.body.onkeydown = (e) => {
            if (e.ctrlKey && e.key === "Enter") {
                if (cardIndex === 0) {
                    return;
                }
                const cp = [...questions];
                cp[cardIndex - 1].formOptions = shuffleArray(cp[cardIndex - 1].formOptions);
                setQuestions(cp);
            }
        };
    }, [cardIndex, questions]);

    // drag and drop
    const handleOnDragEnd = (result: any): void => {
        if (!result.destination) return;
        const items = Array.from(questions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setCardIndex(result.destination.index + 1);
        setQuestions(items);
    };

    // 폼 수정 저장
    const requestFormUpdate = (e: any): void => {
        const temp_questions = questions.map((obj, i) => {
            if (obj.type === "long" || obj.type === "short" || obj.type === "calendar" || obj.type === "time") {
                delete obj.uuid;
                delete obj.formOptions;
                return {
                    ...obj,
                    isNeccessary: obj.isNeccessary ? "y" : "n",
                    section: 1,
                    order: i + 1,
                };
            } else {
                delete obj.uuid;
                return {
                    ...obj,
                    formOptions: obj.formOptions.map((v) => {
                        return v.text;
                    }),
                    isNeccessary: obj.isNeccessary ? "y" : "n",
                    section: 1,
                    order: i + 1,
                };
            }
        });
        const body = {
            title: title,
            subTitle: subTitle,
            questions: temp_questions,
        };
        console.log(body);
        axios
            .put(`https://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/form/update/${router.query.form}`, body)
            .then((res) => {
                console.log(res);
                {
                    e === 1 ? router.push(`/forms/${router.query.form}/viewform`) : dispatch(setAlert(true));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // 미리보기
    const preview = (): void => {
        requestFormUpdate(1);
    };

    // 보내기 모달 보임 유무
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
    const toggleLogoutModal = (): void => {
        setIsVisibleModal((prev) => !prev);
    };

    // 클립보드 복사 성공 모달
    const [isCopyed, setIsCopyed] = useState<boolean>(false);

    // 클립보드에 복사
    const handleCopyClipBoard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopyed(true);
            setTimeout(() => {
                setIsCopyed(false);
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-forms" style={{ paddingBottom: 50, backgroundColor: "#ffffef" }}>
            <App />
            <div className="bg-white border-b-2 shadow-sm h-16 flex justify-center items-center">
                <div className="inline-flex w-222 justify-between">
                    <div className="flex fdr aic">
                        <Link href={"/"} passHref>
                            <div className="flex items-center">
                                <Logo />
                            </div>
                        </Link>
                        <div style={{ marginLeft: 16, position: "relative" }}>
                            <input
                                className="outline-none border-none text-lg max-w-md text-ellipsis overflow-hidden whitespace-nowrap"
                                ref={headerTitle}
                                value={title}
                                onChange={(e) => {
                                    onChangeTitle(e);
                                }}
                                onFocus={() => setFocus(true)}
                                onBlur={() => {
                                    setFocus(false);
                                    if (!title) {
                                        setTitle("제목 없는 설문지");
                                    }
                                }}
                                onClick={(e) => {
                                    const target = e.target as HTMLInputElement;
                                    target.select();
                                }}
                            />
                            <div
                                className={classNames("customTextareaBottomBorder", {
                                    active: focus,
                                })}
                                style={{
                                    backgroundColor: focus ? "black" : undefined,
                                    bottom: -5,
                                }}
                            ></div>
                        </div>
                        <Tooltip title="폴더로 이동">
                            <IconButton size={"small"}>
                                <FolderOpenIcon style={{ color: "#5f6368" }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="별표"
                            style={{ marginLeft: 8 }}
                            onClick={() => {
                                setFillStar((prev) => !prev);
                            }}
                        >
                            <IconButton size={"small"}>{fillStar ? <StarIcon className="text-main" /> : <StarBorderIcon style={{ color: "#5f6368" }} />}</IconButton>
                        </Tooltip>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="relative -left-2">
                            <Tooltip title="미리보기" onClick={preview}>
                                <IconButton>
                                    <VisibilityOutlinedIcon style={{ color: "#5f6368" }} />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <Button
                            variant="contained"
                            style={{
                                color: "white",
                                backgroundColor: "rgb(71, 85, 105)",
                                borderRadius: 5,
                                fontSize: 14,
                            }}
                            onClick={requestFormUpdate}
                        >
                            저장
                        </Button>
                        <Button
                            variant="contained"
                            style={{
                                color: "white",
                                backgroundColor: "rgb(71, 85, 105)",
                                borderRadius: 5,
                                fontSize: 14,
                            }}
                            onClick={toggleLogoutModal}
                        >
                            보내기
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ width: 768, margin: "0 auto", position: "relative" }} id={"cardContainer"}>
                <Card
                    barPosition={["top", "left"]}
                    onClick={() => {
                        setCardIndex(0);
                        itemClickHandler(0);
                    }}
                    active={cardIndex === 0 ? true : false}
                    cardTopBarColor={`rgb(71, 85, 105),1)`}
                >
                    <>
                        <Input
                            active={cardIndex === 0 ? true : false}
                            placeholder={"설문지 제목"}
                            value={title}
                            onChange={onChangeTitle}
                            onKeyDown={(e) => {
                                if (e.key == "Enter") {
                                    e.preventDefault();
                                }
                            }}
                            onBlur={() => {
                                if (!title) {
                                    setTitle("제목 없는 설문지");
                                }
                            }}
                            fontSize={32}
                            height={50}
                        />
                        <Input active={cardIndex === 0 ? true : false} placeholder={"설문지 설명"} value={subTitle} onChange={onChangeSubTitle} fontSize={14} height={24} constainerStyle={{ marginTop: 8 }} />
                    </>
                </Card>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="questions">
                        {(provided: any) => (
                            <ul className="questions" {...provided.droppableProps} ref={provided.innerRef}>
                                {questions.map((v, i) => {
                                    return (
                                        <Draggable key={v.uuid} draggableId={v.uuid} index={i}>
                                            {(provided: any) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps}>
                                                    <Card
                                                        barPosition={["left"]}
                                                        onClick={() => {
                                                            setCardIndex(i + 1);
                                                            itemClickHandler(i + 1);
                                                        }}
                                                        active={cardIndex === i + 1 ? true : false}
                                                        provided={provided}
                                                    >
                                                        {cardIndex === i + 1 ? (
                                                            <div>
                                                                <div className="flex fdr">
                                                                    <Input
                                                                        constainerStyle={{
                                                                            width: "100%",
                                                                            padding: 16,
                                                                            marginRight: 60,
                                                                            paddingBottom: 10,
                                                                        }}
                                                                        active={cardIndex === i + 1 ? true : false}
                                                                        height={28}
                                                                        fontSize={16}
                                                                        backgroundColor={"#f8f8f8"}
                                                                        bottomBorderColor={"black"}
                                                                        value={v.question}
                                                                        placeholder={"질문"}
                                                                        onChange={(e) => {
                                                                            const cp = [...questions];
                                                                            const index = cp.findIndex((x) => x.uuid === v.uuid);
                                                                            cp[index] = {
                                                                                ...cp[index],
                                                                                question: e.target.value,
                                                                            };
                                                                            setQuestions(cp);
                                                                        }}
                                                                        onKeyDown={(e) => {
                                                                            if (e.key == "Enter") {
                                                                                e.preventDefault();
                                                                            }
                                                                        }}
                                                                    />
                                                                    <div
                                                                        style={{
                                                                            position: "absolute",
                                                                            top: 25,
                                                                            right: 238,
                                                                        }}
                                                                    >
                                                                        <IconButton>
                                                                            <ImageOutlinedIcon style={{ color: "#5f6368" }} />
                                                                        </IconButton>
                                                                    </div>
                                                                    <div>
                                                                        <Select
                                                                            value={v.type}
                                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                                const cp = [...questions];
                                                                                cp[cardIndex - 1].type = e.target.value;
                                                                                setQuestions(cp);
                                                                            }}
                                                                            renderValue={(value) => {
                                                                                switch (value) {
                                                                                    case "short":
                                                                                        return (
                                                                                            <div className={classes.MenuItemList}>
                                                                                                <SubjectIcon />
                                                                                                <span className={classes.MenuItemListLabel}>단문형</span>
                                                                                            </div>
                                                                                        );
                                                                                    case "long":
                                                                                        return (
                                                                                            <div className={classes.MenuItemList}>
                                                                                                <SubjectIcon />
                                                                                                <span className={classes.MenuItemListLabel}>장문형</span>
                                                                                            </div>
                                                                                        );
                                                                                    case "radio":
                                                                                        return (
                                                                                            <div className={classes.MenuItemList}>
                                                                                                <RadioButtonCheckedIcon />
                                                                                                <span className={classes.MenuItemListLabel}>객관식 질문</span>
                                                                                            </div>
                                                                                        );
                                                                                    case "check":
                                                                                        return (
                                                                                            <div className={classes.MenuItemList}>
                                                                                                <CheckBoxIcon /> <span className={classes.MenuItemListLabel}>체크박스</span>
                                                                                            </div>
                                                                                        );
                                                                                    case "drop":
                                                                                        return (
                                                                                            <div className={classes.MenuItemList}>
                                                                                                <ArrowDropDownCircleIcon />
                                                                                                <span className={classes.MenuItemListLabel}>드롭다운</span>
                                                                                            </div>
                                                                                        );
                                                                                }
                                                                            }}
                                                                            variant="outlined"
                                                                            className={classes.select}
                                                                        >
                                                                            <MenuItem value={"short"} className={classes.MenuItem}>
                                                                                <SubjectIcon className={classes.icon} />
                                                                                단문형
                                                                            </MenuItem>
                                                                            <MenuItem value={"long"} className={classes.MenuItem}>
                                                                                <SubjectIcon className={classes.icon} />
                                                                                장문형
                                                                            </MenuItem>
                                                                            <Divider
                                                                                style={{
                                                                                    marginTop: 10,
                                                                                    marginBottom: 10,
                                                                                }}
                                                                            />
                                                                            <MenuItem value={"radio"} className={classes.MenuItem}>
                                                                                <RadioButtonCheckedIcon className={classes.icon} />
                                                                                객관식 질문
                                                                            </MenuItem>
                                                                            <MenuItem value={"check"} className={classes.MenuItem}>
                                                                                <CheckBoxIcon className={classes.icon} />
                                                                                체크박스
                                                                            </MenuItem>
                                                                            <MenuItem value={"drop"} className={classes.MenuItem}>
                                                                                <ArrowDropDownCircleIcon className={classes.icon} />
                                                                                드롭다운
                                                                            </MenuItem>
                                                                        </Select>
                                                                    </div>
                                                                </div>

                                                                {v.type != "long" && v.type != "short" ? (
                                                                    <div>
                                                                        {v.formOptions.map((val, idx) => {
                                                                            return (
                                                                                <div
                                                                                    key={val.uuid}
                                                                                    className="flex fdr aic optionsContainer"
                                                                                    style={{
                                                                                        marginTop: idx === 0 ? 15 : 0,
                                                                                        position: "relative",
                                                                                        height: 48,
                                                                                    }}
                                                                                    onMouseOver={() => {
                                                                                        setOptionUuid(val.uuid);
                                                                                    }}
                                                                                    onMouseLeave={() => {
                                                                                        setOptionUuid("");
                                                                                    }}
                                                                                    onClick={(event) => {
                                                                                        const textarea = document.getElementsByClassName("cardWrapper")[i + 1].getElementsByClassName("customTextarea")[idx + 1] as HTMLTextAreaElement;
                                                                                        textarea.select();
                                                                                        event.stopPropagation();
                                                                                    }}
                                                                                >
                                                                                    {optionUuid === val.uuid && (
                                                                                        <div
                                                                                            style={{
                                                                                                position: "absolute",
                                                                                                left: -19,
                                                                                                top: 9,
                                                                                            }}
                                                                                        >
                                                                                            <DragIndicatorIcon
                                                                                                style={{
                                                                                                    color: "#B3B3B3",
                                                                                                    fontSize: "20px",
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    )}
                                                                                    {v.type === "radio" ? (
                                                                                        <RadioButtonUncheckedOutlinedIcon
                                                                                            style={{
                                                                                                color: "#B3B3B3",
                                                                                                position: "relative",
                                                                                                top: -2,
                                                                                            }}
                                                                                        />
                                                                                    ) : v.type === "check" ? (
                                                                                        <CheckBoxOutlineBlankIcon
                                                                                            style={{
                                                                                                color: "#B3B3B3",
                                                                                                position: "relative",
                                                                                                top: -2,
                                                                                            }}
                                                                                        />
                                                                                    ) : (
                                                                                        <span
                                                                                            style={{
                                                                                                fontSize: 14,
                                                                                                position: "relative",
                                                                                                top: -2,
                                                                                            }}
                                                                                        >
                                                                                            {idx + 1}
                                                                                        </span>
                                                                                    )}

                                                                                    <Input
                                                                                        customTextareaBottomBorderColor={warningIndex === `${i}-${idx}` ? "#E46337" : ""}
                                                                                        onBlur={() => {
                                                                                            const cp = [...questions];
                                                                                            const formOptions = cp[cardIndex - 1].formOptions;
                                                                                            if (!formOptions[idx].text.replace(/\s/gi, "")) {
                                                                                                formOptions[idx].text = `옵션 ${idx + 1}`;
                                                                                                setQuestions(cp);
                                                                                            } else if (warningIndex === `${i}-${idx}`) {
                                                                                                const formOptionsIndex = formOptions.findIndex((value) => {
                                                                                                    return value.uuid === val.uuid;
                                                                                                });
                                                                                                formOptions[formOptionsIndex].text = `옵션 ${formOptions.length}`;
                                                                                                setQuestions(cp);
                                                                                                setWarningIndex("");
                                                                                            }
                                                                                        }}
                                                                                        constainerStyle={{
                                                                                            width: "90%",
                                                                                            marginLeft: 10,
                                                                                        }}
                                                                                        fontSize={14}
                                                                                        height={24}
                                                                                        value={val.text}
                                                                                        borderBottom={optionUuid === val.uuid ? "y" : ""}
                                                                                        onChange={(e) => {
                                                                                            const cp = [...questions];
                                                                                            const index = cp.findIndex((x) => x.uuid === v.uuid);
                                                                                            const formOptions = cp[index].formOptions;
                                                                                            const formOptionsIndex = formOptions.findIndex((value) => {
                                                                                                return value.uuid === val.uuid;
                                                                                            });

                                                                                            formOptions[formOptionsIndex] = {
                                                                                                ...formOptions[formOptionsIndex],
                                                                                                text: e.target.value,
                                                                                            };
                                                                                            if (
                                                                                                formOptions
                                                                                                    .map((vv) => {
                                                                                                        return vv.text;
                                                                                                    })
                                                                                                    .filter((vvv, iii) => {
                                                                                                        return iii != idx;
                                                                                                    })
                                                                                                    .indexOf(e.target.value) === -1
                                                                                            ) {
                                                                                                setWarningIndex("");
                                                                                            } else {
                                                                                                setWarningIndex(`${i}-${idx}`);
                                                                                            }

                                                                                            setQuestions(cp);
                                                                                        }}
                                                                                        onKeyDown={(e) => {
                                                                                            if (e.ctrlKey && e.key === "Enter") {
                                                                                                e.preventDefault();
                                                                                            } else if (e.key == "Enter") {
                                                                                                const cp = [...questions];
                                                                                                const index = cp.findIndex((x) => x.uuid === v.uuid);
                                                                                                const formOptions = cp[index].formOptions;
                                                                                                const formOptionsIndex = formOptions.findIndex((xx) => xx.uuid === val.uuid);
                                                                                                formOptions.splice(formOptionsIndex + 1, 0, {
                                                                                                    uuid: uuid(),
                                                                                                    text: `옵션 ${v.formOptions.length + 1}`,
                                                                                                });
                                                                                                setQuestions(cp);
                                                                                                if (warningIndex === `${i}-${idx}`) {
                                                                                                    const cp = [...questions];
                                                                                                    const formOptions = cp[cardIndex - 1].formOptions;
                                                                                                    const formOptionsIndex = formOptions.findIndex((value) => {
                                                                                                        return value.uuid === val.uuid;
                                                                                                    });
                                                                                                    formOptions[formOptionsIndex].text = `옵션 ${formOptions.length - 1}`;
                                                                                                    setQuestions(cp);
                                                                                                    setWarningIndex("");
                                                                                                }
                                                                                                e.preventDefault();
                                                                                                setTimeout(() => {
                                                                                                    const textarea = document.getElementsByClassName("cardWrapper")[i + 1].getElementsByClassName("customTextarea")[idx + 2] as HTMLTextAreaElement;
                                                                                                    textarea.select();
                                                                                                }, 1);
                                                                                            } else if (e.key == "Backspace" && !val.text && v.formOptions.length != 1) {
                                                                                                const cp = [...questions];
                                                                                                const formOptions = cp[cardIndex - 1].formOptions;
                                                                                                const formOptionsIndex = formOptions.findIndex((value) => {
                                                                                                    return value.uuid === val.uuid;
                                                                                                });
                                                                                                formOptions.splice(formOptionsIndex, 1);
                                                                                                setQuestions(cp);
                                                                                                e.preventDefault();
                                                                                                if (idx === 0) {
                                                                                                    setTimeout(() => {
                                                                                                        const textarea = document.getElementsByClassName("cardWrapper")[i + 1].getElementsByClassName("customTextarea")[1] as HTMLTextAreaElement;
                                                                                                        textarea.select();
                                                                                                    }, 1);
                                                                                                } else {
                                                                                                    setTimeout(() => {
                                                                                                        const textarea = document.getElementsByClassName("cardWrapper")[i + 1].getElementsByClassName("customTextarea")[idx] as HTMLTextAreaElement;
                                                                                                        textarea.select();
                                                                                                    }, 1);
                                                                                                }
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                    {warningIndex === `${i}-${idx}` && (
                                                                                        <Tooltip
                                                                                            title="중복옵션은 지원되지 않습니다."
                                                                                            onClick={(event) => {
                                                                                                const cp = [...questions];
                                                                                                const formOptions = cp[cardIndex - 1].formOptions;
                                                                                                const formOptionsIndex = formOptions.findIndex((value) => {
                                                                                                    return value.uuid === val.uuid;
                                                                                                });
                                                                                                formOptions[formOptionsIndex].text = `옵션 ${formOptions.length}`;
                                                                                                setQuestions(cp);
                                                                                                setWarningIndex("");
                                                                                                const textarea = document.getElementsByClassName("cardWrapper")[i + 1].getElementsByClassName("customTextarea")[idx + 1] as HTMLTextAreaElement;
                                                                                                textarea.blur();
                                                                                                event.stopPropagation();
                                                                                            }}
                                                                                        >
                                                                                            <IconButton>
                                                                                                <WarningIcon
                                                                                                    style={{
                                                                                                        color: "#E46337",
                                                                                                    }}
                                                                                                />
                                                                                            </IconButton>
                                                                                        </Tooltip>
                                                                                    )}
                                                                                    {v.formOptions.length > 1 && (
                                                                                        <Tooltip
                                                                                            title="삭제"
                                                                                            onClick={() => {
                                                                                                const cp = [...questions];
                                                                                                const formOptions = cp[cardIndex - 1].formOptions;
                                                                                                const formOptionsIndex = formOptions.findIndex((value) => {
                                                                                                    return value.uuid === val.uuid;
                                                                                                });
                                                                                                formOptions.splice(formOptionsIndex, 1);
                                                                                                setQuestions(cp);
                                                                                            }}
                                                                                        >
                                                                                            <IconButton>
                                                                                                <ClearIcon
                                                                                                    style={{
                                                                                                        color: "#5f6368",
                                                                                                    }}
                                                                                                />
                                                                                            </IconButton>
                                                                                        </Tooltip>
                                                                                    )}
                                                                                </div>
                                                                            );
                                                                        })}
                                                                        <div
                                                                            className="flex fdr aic"
                                                                            style={{
                                                                                height: 44,
                                                                            }}
                                                                        >
                                                                            {v.type === "radio" ? (
                                                                                <RadioButtonUncheckedOutlinedIcon
                                                                                    style={{
                                                                                        color: "#B3B3B3",
                                                                                    }}
                                                                                />
                                                                            ) : v.type === "check" ? (
                                                                                <CheckBoxOutlineBlankIcon
                                                                                    style={{
                                                                                        color: "#B3B3B3",
                                                                                    }}
                                                                                />
                                                                            ) : (
                                                                                <span
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                    }}
                                                                                >
                                                                                    {v.formOptions.length + 1}
                                                                                </span>
                                                                            )}

                                                                            {v.type === "drop" ? (
                                                                                <div
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                        marginLeft: 12,
                                                                                    }}
                                                                                >
                                                                                    <span
                                                                                        className="addOption"
                                                                                        style={{
                                                                                            display: "inline-flex",
                                                                                            color: "#7f7f7f",
                                                                                            height: 35,
                                                                                            alignItems: "center",
                                                                                        }}
                                                                                        onClick={() => {
                                                                                            const cp = [...questions];
                                                                                            const index = cp.findIndex((x) => x.uuid === v.uuid);
                                                                                            const formOptions = cp[index].formOptions;
                                                                                            formOptions.push({
                                                                                                uuid: uuid(),
                                                                                                text: `옵션 ${v.formOptions.length + 1}`,
                                                                                            });
                                                                                            setQuestions(cp);
                                                                                        }}
                                                                                    >
                                                                                        옵션 추가
                                                                                    </span>
                                                                                </div>
                                                                            ) : (
                                                                                <div
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                        marginLeft: 12,
                                                                                    }}
                                                                                >
                                                                                    <span
                                                                                        className="addOption"
                                                                                        style={{
                                                                                            display: "inline-flex",
                                                                                            color: "#7f7f7f",
                                                                                            height: 35,
                                                                                            alignItems: "center",
                                                                                        }}
                                                                                        onClick={() => {
                                                                                            const cp = [...questions];
                                                                                            const index = cp.findIndex((x) => x.uuid === v.uuid);
                                                                                            const formOptions = cp[index].formOptions;
                                                                                            formOptions.push({
                                                                                                uuid: uuid(),
                                                                                                text: `옵션 ${v.formOptions.length + 1}`,
                                                                                            });
                                                                                            setQuestions(cp);
                                                                                        }}
                                                                                    >
                                                                                        옵션 추가
                                                                                    </span>{" "}
                                                                                    또는{" "}
                                                                                    <span
                                                                                        className="addOther"
                                                                                        style={{
                                                                                            display: "inline-flex",
                                                                                            color: "#4285F4",
                                                                                            alignItems: "center",
                                                                                            padding: "0 5px",
                                                                                            marginLeft: -3,
                                                                                            borderRadius: 4,
                                                                                            height: 35,
                                                                                        }}
                                                                                    >
                                                                                        {`'기타' 추가`}
                                                                                    </span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div
                                                                        style={{
                                                                            marginTop: 20,
                                                                            marginBottom: 15,
                                                                            fontSize: 14,
                                                                            color: "gray",
                                                                            borderBottom: "1px dotted black",
                                                                            paddingBottom: 5,
                                                                            width: 350,
                                                                        }}
                                                                    >
                                                                        {v.type === "long" ? "장문형 텍스트" : "단답형 텍스트"}
                                                                    </div>
                                                                )}
                                                                <div
                                                                    style={{
                                                                        position: "relative",
                                                                        top: 26,
                                                                        width: 720,
                                                                        height: 65,
                                                                        borderTop: "1px solid #d9d9d9",
                                                                        display: "flex",
                                                                        flexDirection: "row",
                                                                        alignItems: "center",
                                                                        justifyContent: "flex-end",
                                                                    }}
                                                                >
                                                                    <Tooltip
                                                                        title="복사"
                                                                        onClick={() => {
                                                                            const cp = [...questions];
                                                                            cp.splice(cardIndex, 0, {
                                                                                ...cp[cardIndex - 1],
                                                                                uuid: uuid(),
                                                                                formOptions: cp[cardIndex - 1].formOptions.map((x) => {
                                                                                    return {
                                                                                        text: x.text,
                                                                                        uuid: uuid(),
                                                                                    };
                                                                                }),
                                                                            });
                                                                            setQuestions(cp);
                                                                        }}
                                                                    >
                                                                        <IconButton>
                                                                            <FileCopyOutlinedIcon style={{ color: "#5f6368" }} />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip
                                                                        title="삭제"
                                                                        onClick={() => {
                                                                            const cp = [...questions];
                                                                            const index = cp.findIndex((x) => {
                                                                                return x.uuid == v.uuid;
                                                                            });
                                                                            cp.splice(index, 1);
                                                                            setQuestions(cp);
                                                                        }}
                                                                    >
                                                                        <IconButton>
                                                                            <DeleteOutlineIcon style={{ color: "#5f6368" }} />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <div
                                                                        style={{
                                                                            height: 30,
                                                                            borderLeft: "1px solid #d9d9d9",
                                                                            marginLeft: 15,
                                                                            marginRight: 20,
                                                                        }}
                                                                    ></div>
                                                                    <div className="flex fdr jcfe">
                                                                        <div className="flex fdr aic">
                                                                            <span
                                                                                style={{
                                                                                    marginRight: 16,
                                                                                    fontSize: 14,
                                                                                }}
                                                                            >
                                                                                필수
                                                                            </span>
                                                                            <Toggle
                                                                                active={questions[i].isNeccessary}
                                                                                setToggle={() => {
                                                                                    const cp = [...questions];
                                                                                    cp[cardIndex - 1].isNeccessary = !cp[cardIndex - 1].isNeccessary;
                                                                                    setQuestions(cp);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <IconButton style={{ marginLeft: 5 }}>
                                                                        <MoreVertIcon style={{ color: "#5f6368" }} />
                                                                    </IconButton>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <div>
                                                                    {v.question ? v.question : "질문"}{" "}
                                                                    {v.isNeccessary && (
                                                                        <span
                                                                            style={{
                                                                                fontSize: 13,
                                                                                color: "rgba(219, 68, 55, 1)",
                                                                                position: "relative",
                                                                                top: -3,
                                                                            }}
                                                                        >
                                                                            *
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                {v.type != "long" && v.type != "short" ? (
                                                                    v.formOptions.map((val, idx) => {
                                                                        return (
                                                                            <div
                                                                                key={val.uuid}
                                                                                className="flex fdr aic optionsContainer"
                                                                                style={{
                                                                                    marginTop: idx === 0 ? 15 : 0,
                                                                                    position: "relative",
                                                                                    height: 48,
                                                                                }}
                                                                                onClick={(event) => {
                                                                                    setTimeout(() => {
                                                                                        const textarea = document.getElementsByClassName("cardWrapper")[i + 1].getElementsByClassName("customTextarea")[idx + 1] as HTMLTextAreaElement;
                                                                                        textarea.select();
                                                                                        event.stopPropagation();
                                                                                    }, 1);
                                                                                }}
                                                                            >
                                                                                {v.type === "radio" ? (
                                                                                    <RadioButtonUncheckedOutlinedIcon
                                                                                        style={{
                                                                                            color: "#B3B3B3",
                                                                                            position: "relative",
                                                                                            top: 1,
                                                                                        }}
                                                                                    />
                                                                                ) : v.type === "check" ? (
                                                                                    <CheckBoxOutlineBlankIcon
                                                                                        style={{
                                                                                            color: "#B3B3B3",
                                                                                            position: "relative",
                                                                                            top: 1,
                                                                                        }}
                                                                                    />
                                                                                ) : (
                                                                                    <span
                                                                                        style={{
                                                                                            fontSize: 14,
                                                                                            position: "relative",
                                                                                            top: 1,
                                                                                        }}
                                                                                    >
                                                                                        {idx + 1}
                                                                                    </span>
                                                                                )}
                                                                                <span
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                        marginLeft: 10,
                                                                                    }}
                                                                                >
                                                                                    {val.text}
                                                                                </span>
                                                                            </div>
                                                                        );
                                                                    })
                                                                ) : (
                                                                    <div
                                                                        style={{
                                                                            marginTop: 20,
                                                                            marginBottom: 15,
                                                                            fontSize: 14,
                                                                            color: "gray",
                                                                            borderBottom: "1px dotted black",
                                                                            paddingBottom: 5,
                                                                            width: 350,
                                                                        }}
                                                                    >
                                                                        {v.type === "long" ? "장문형 텍스트" : "단답형 텍스트"}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </Card>
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                <div ref={footer} style={{ height: 1 }}></div>
                <div
                    ref={rightDiv}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        position: "absolute",
                        top: 0,
                        right: -60,
                        backgroundColor: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        fontSize: 25,
                        border: "1px solid #dadce0",
                        boxShadow: "0px 1px 1px rgb(148, 146, 146)",
                        transition: "top 0.25s ease-in-out",
                    }}
                >
                    <Tooltip
                        title="질문 추가"
                        onClick={() => {
                            const cp = [...questions];
                            cp.splice(cardIndex, 0, {
                                type: "radio",
                                question: "",
                                uuid: uuid(),
                                formOptions: [
                                    {
                                        text: "옵션 1",
                                        uuid: uuid(),
                                    },
                                ],
                                isNeccessary: false,
                                section: 1,
                                order: 1,
                            });
                            setQuestions(cp);
                        }}
                    >
                        <IconButton size={"small"}>
                            <AddCircleOutlineIcon style={{ color: "#5f6368" }} />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div
                style={{
                    fontSize: 20,
                    color: "gray",
                    textAlign: "center",
                    marginTop: 5,
                }}
            >
                색상변경 및 미리보기가 가능합니다.
                <br />
                옵션을 섞고싶은 카드를 선택한 뒤 Ctrl + Enter를 입력하시면 옵션을 무작위로 섞을 수 있습니다.
            </div>
            <Alert title={"폼 변경"} subTitle={"변경사항이 수정되었습니다."} />
            <div className={`w-full absolute top-0 left-0 bg-black bg-opacity-20 flex justify-center items-center ${isVisibleModal ? "z-10 opacity-100 h-full" : "-z-10 opacity-0 h-0"}`} onClick={toggleLogoutModal}>
                <div
                    className={`w-120 h-64 rounded-md bg-white relative p-6 border-1 shadow-md transition-all ${isVisibleModal ? "opacity-100 top-0" : "opacity-0 top-10"}`}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="text-lg font-bold">설문지 보내기</div>
                    <div className="text-md mt-6">링크</div>
                    <div className="mt-2">
                        <Input
                            // active={cardIndex === i + 1 ? true : false}
                            height={28}
                            fontSize={16}
                            backgroundColor={"#f8f8f8"}
                            bottomBorderColor={"black"}
                            value={`http://localhost:3000/forms/${router.query.form}/viewform`}
                        />
                    </div>
                    <div className="mt-8 text-right space-x-2 absolute bottom-6 right-6">
                        <button className={`w-20 h-8 rounded-md border-1 border-main text-main text-sm`} onClick={toggleLogoutModal}>
                            취소
                        </button>
                        <button
                            className={`w-20 h-8 rounded-md bg-main text-white text-sm`}
                            onClick={() => {
                                handleCopyClipBoard(`http://localhost:3000/forms/${router.query.form}/viewform`);
                            }}
                        >
                            저장
                        </button>
                    </div>
                </div>
                <div className={`rounded-sm bg-slate-800 text-white absolute left-20 p-2 text-sm transition-all ${isCopyed ? "bottom-10" : "-bottom-10"}`}>클립보드에 복사되었습니다.</div>
            </div>
        </div>
    );
};

export default CreateForm;
