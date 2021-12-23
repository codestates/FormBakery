import Card from "../../../components/Card";
import React, { useState, useEffect } from "react";
import { Button, RadioGroup, FormControlLabel, Radio, Checkbox, Select, MenuItem, Divider } from "@material-ui/core";
import Input from "../../../components/Input";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { v4 as uuid } from "uuid";
import App from "../../../components/App";
import Alert from "../../../components/Alert";
import { setAlert } from "../../../reducers/store/user";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "white",
        color: "gray",
        boxShadow: "none",
        padding: "0 10px",
        fontSize: 14,
        height: 36,
        "&:hover": {
            backgroundColor: "#f8f8f8",
            boxShadow: "none",
        },
    },
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
}));

interface IOptions {
    text: string;
    uuid: string;
}

interface IQuestions {
    question: string;
    type: string;
    isNeccessary: boolean;
    uuid: string;
    options: IOptions[];
}

interface IState {
    title: string;
    subTitle: string;
    color: string;
    questions: IQuestions[];
}

const Viewform = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    // 상태관리
    const [state, setState] = useState<IState>({
        title: "", // 제목
        subTitle: "", // 부제목
        color: "rgba(71, 85, 105", // 색
        questions: [
            // 질문들
            {
                question: "", // 질문제목
                type: "", // 타입
                isNeccessary: false, // 필수 여부
                uuid: uuid(), // 아이디
                options: [
                    // 라디오, 체크박스, 드롭다운의 경우 옵션들
                    {
                        text: "",
                        uuid: uuid(),
                    },
                ],
            },
        ],
    });

    // 폼 아이디로 폼 조회
    useEffect((): void => {
        // 폼 아이디
        if (router.query.form) {
            axios
                .get(`https://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/form/get/${router.query.form}`)
                .then((res) => {
                    const dbQuestion = res.data.data.formContents.map((question) => {
                        delete question.id;
                        if (question.type === "long" || question.type === "short" || question.type === "calendar" || question.type === "time") {
                            return {
                                ...question,
                                isNeccessary: question.isNeccessary === "n" ? false : true,
                                options: [{ text: "옵션 1", uuid: uuid() }],
                                uuid: uuid(),
                            };
                        } else {
                            return {
                                ...question,
                                isNeccessary: question.isNeccessary === "n" ? false : true,
                                options: question.formOptions.map((val) => {
                                    return {
                                        text: val.text,
                                        uuid: uuid(),
                                    };
                                }),
                                uuid: uuid(),
                            };
                        }
                    });
                    setState({
                        title: res.data.data.title,
                        subTitle: res.data.data.subTitle,
                        color: "rgba(71, 85, 105",
                        questions: dbQuestion,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [router.query.form]);

    const classes = useStyles();
    const [radioArray, setRadioArray] = useState([]);
    const [checkBoxArray, setCheckBoxArray] = useState([]);
    const [dropDownArray, setDropDownArray] = useState([]);
    const [textArray, setTextArray] = useState([]);
    const [shortArray, setShortArray] = useState([]);
    const [isRequiredItem, setIsRequiredItems] = useState(false);

    useEffect(() => {
        const newRadioArray = state.questions
            .filter((v, i) => {
                return v.type === "radio";
            })
            .map((value, index) => {
                return {
                    uuid: value.uuid,
                    value: "",
                    radioList: value.options,
                };
            });
        setRadioArray(newRadioArray);
        const newCheckBoxArray = state.questions
            .filter((v, i) => {
                return v.type === "check";
            })
            .map((value, index) => {
                return {
                    uuid: value.uuid,
                    checkList: value.options.map((val, idx) => {
                        return {
                            uuid: val.uuid,
                            text: val.text,
                            isChecked: false,
                        };
                    }),
                };
            });
        setCheckBoxArray(newCheckBoxArray);
        const newDropDownArray = state.questions
            .filter((v, i) => {
                return v.type === "drop";
            })
            .map((value, index) => {
                return {
                    uuid: value.uuid,
                    value: "select",
                    dropDownList: value.options,
                };
            });
        setDropDownArray(newDropDownArray);
        state.questions.forEach((v, i) => {
            if (v.isNeccessary) {
                setIsRequiredItems(true);
                return;
            }
        });
        const newTextArray = state.questions
            .filter((v, i) => {
                return v.type === "long";
            })
            .map((value, index) => {
                return {
                    uuid: value.uuid,
                    text: "",
                };
            });
        setTextArray(newTextArray);
        const newShortArray = state.questions
            .filter((v, i) => {
                return v.type === "short";
            })
            .map((value, index) => {
                return {
                    uuid: value.uuid,
                    text: "",
                };
            });
        setShortArray(newShortArray);
    }, [state]);

    // 제출 횟수
    const [countAnswer, setCountAnswer] = useState<number>(0);

    return (
        <div className="bg-subMain w-screen min-h-screen -mt-3 py-4">
            <App />
            <div style={{ width: 768, margin: "0 auto", position: "relative", paddingBottom: 50 }} id={"cardContainer"}>
                <Card barPosition={["top"]} display={"none"} cardTopBarColor={`${state.color},1)`}>
                    <>
                        <div style={{ fontSize: 32, height: 50 }}>{state.title}</div>
                        {state.subTitle && <div style={{ fontSize: 14, height: 24, marginTop: 5 }}>{state.subTitle}</div>}
                        {isRequiredItem && (
                            <div
                                style={{
                                    fontSize: 13,
                                    marginTop: 5,
                                    color: "rgba(219, 68, 55, 1)",
                                }}
                            >
                                * 필수항목
                            </div>
                        )}
                    </>
                </Card>
                {state.questions.map((v, i) => {
                    const selectedRadioObject = radioArray.filter((val) => {
                        return val.uuid === v.uuid;
                    })[0];
                    const selectedDropDownObject = dropDownArray.filter((val) => {
                        return val.uuid === v.uuid;
                    })[0];
                    const selectedTextObject = textArray.filter((val) => {
                        return val.uuid === v.uuid;
                    })[0];
                    const selectedShortObject = shortArray.filter((val) => {
                        return val.uuid === v.uuid;
                    })[0];
                    return v.type === "radio" ? (
                        <Card barPosition={[]} key={v.uuid}>
                            <>
                                <div>
                                    {v.question}{" "}
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
                                {radioArray.length > 0 && (
                                    <div>
                                        <RadioGroup
                                            style={{ marginTop: 15 }}
                                            value={selectedRadioObject.value}
                                            onChange={(e) => {
                                                const cp = [...radioArray];
                                                const ind = cp.findIndex((x) => x.uuid === v.uuid);
                                                cp[ind].value = e.target.value;
                                                setRadioArray(cp);
                                            }}
                                        >
                                            {selectedRadioObject.radioList.map((value, index) => {
                                                return (
                                                    <FormControlLabel
                                                        key={value.uuid}
                                                        value={value.uuid}
                                                        control={
                                                            <Radio
                                                                style={{
                                                                    color: selectedRadioObject.value === value.uuid ? `${state.color},1)` : undefined,
                                                                }}
                                                            />
                                                        }
                                                        label={value.text}
                                                    />
                                                );
                                            })}
                                        </RadioGroup>
                                        {!v.isNeccessary && (
                                            <div
                                                style={{
                                                    textAlign: "end",
                                                    height: selectedRadioObject.value ? 36 : 0,
                                                    overflow: "hidden",
                                                    transition: "height 0.1s ease-in-out",
                                                }}
                                            >
                                                <Button
                                                    className={classes.button}
                                                    variant="contained"
                                                    onClick={(e) => {
                                                        const cp = [...radioArray];
                                                        const ind = cp.findIndex((x) => x.uuid === v.uuid);
                                                        cp[ind].value = "";
                                                        setRadioArray(cp);
                                                    }}
                                                >
                                                    선택해제
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        </Card>
                    ) : v.type === "check" ? (
                        <Card barPosition={[]} key={v.uuid}>
                            <>
                                <div>
                                    {v.question}{" "}
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
                                {checkBoxArray.length > 0 &&
                                    checkBoxArray
                                        .filter((val, idx) => {
                                            return val.uuid === v.uuid;
                                        })[0]
                                        .checkList.map((value, index) => {
                                            return (
                                                <div
                                                    style={{
                                                        marginTop: index === 0 ? 15 : 0,
                                                    }}
                                                    key={value.uuid}
                                                >
                                                    <FormControlLabel
                                                        label={value.text}
                                                        control={
                                                            <Checkbox
                                                                checked={value.isChecked}
                                                                style={{
                                                                    color: value.isChecked ? `${state.color},1)` : undefined,
                                                                }}
                                                                onChange={() => {
                                                                    const cp = [...checkBoxArray];
                                                                    const ind = cp.findIndex((x) => x.uuid === v.uuid);
                                                                    const newCheckList = cp[ind].checkList;
                                                                    const idxx = newCheckList.findIndex((xx) => xx.uuid === value.uuid);
                                                                    newCheckList[idxx] = {
                                                                        ...newCheckList[idxx],
                                                                        isChecked: !newCheckList[idxx].isChecked,
                                                                    };
                                                                    setCheckBoxArray(cp);
                                                                }}
                                                                // name="gilad"
                                                            />
                                                        }
                                                    />
                                                </div>
                                            );
                                        })}
                            </>
                        </Card>
                    ) : v.type === "drop" ? (
                        <Card barPosition={[]} key={v.uuid}>
                            <>
                                <div>
                                    {v.question}{" "}
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
                                {dropDownArray.length > 0 && (
                                    <div>
                                        <Select
                                            value={selectedDropDownObject.value}
                                            onChange={(e) => {
                                                const cp = [...dropDownArray];
                                                const ind = cp.findIndex((x) => x.uuid === v.uuid);
                                                cp[ind].value = e.target.value;
                                                setDropDownArray(cp);
                                            }}
                                            variant="outlined"
                                            className={classes.select}
                                            style={{ marginTop: 30, width: 300 }}
                                        >
                                            <MenuItem value={"select"} className={classes.MenuItem}>
                                                선택
                                            </MenuItem>
                                            <Divider
                                                style={{
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                }}
                                            />
                                            {selectedDropDownObject.dropDownList.map((value, index) => {
                                                return (
                                                    <MenuItem value={value.uuid} className={classes.MenuItem} key={value.uuid}>
                                                        {value.text}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </div>
                                )}
                            </>
                        </Card>
                    ) : v.type === "long" ? (
                        <Card barPosition={[]} key={v.uuid}>
                            <>
                                <div>
                                    {v.question}{" "}
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
                                {textArray.length > 0 && (
                                    <div style={{ marginTop: 40 }}>
                                        <Input
                                            active={true}
                                            placeholder={"내 답변"}
                                            value={selectedTextObject.text}
                                            onChange={(e) => {
                                                const cp = [...textArray];
                                                const ind = cp.findIndex((x) => x.uuid === v.uuid);
                                                cp[ind].text = e.target.value;
                                                setTextArray(cp);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key == "Enter") {
                                                    e.preventDefault();
                                                }
                                            }}
                                            fontSize={14}
                                            height={24}
                                        />
                                    </div>
                                )}
                            </>
                        </Card>
                    ) : v.type === "short" ? (
                        <Card barPosition={[]} key={v.uuid}>
                            <>
                                <div>
                                    {v.question}{" "}
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
                                {shortArray.length > 0 && (
                                    <div style={{ marginTop: 40 }}>
                                        <Input
                                            active={true}
                                            placeholder={"내 답변"}
                                            value={selectedShortObject.text}
                                            onChange={(e) => {
                                                const cp = [...shortArray];
                                                const ind = cp.findIndex((x) => x.uuid === v.uuid);
                                                cp[ind].text = e.target.value;
                                                setShortArray(cp);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key == "Enter") {
                                                    e.preventDefault();
                                                }
                                            }}
                                            fontSize={14}
                                            height={24}
                                        />
                                    </div>
                                )}
                            </>
                        </Card>
                    ) : null;
                })}
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: `${state.color},1)`,
                        color: "white",
                        padding: "0 24px",
                        fontSize: 14,
                        height: 36,
                    }}
                    onClick={() => {
                        setCountAnswer(countAnswer + 1);
                        dispatch(setAlert(true));
                    }}
                >
                    제출
                </Button>
            </div>
            <Alert title={countAnswer !== 1 ? "답변 제출" : "답변 제출"} subTitle={countAnswer !== 1 ? "이미 답변을 제출 하셨습니다." : "답변을 제출 하였습니다."} />
        </div>
    );
};

export default Viewform;
