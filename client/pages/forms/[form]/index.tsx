import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import Card from "../../../components/Card";
import Toggle from "../../../components/Toggle";
import Input from "../../../components/Input";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import {
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  Divider,
  Button,
} from "@material-ui/core";
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

// @material-ui/core/styles ??????
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
  question: string; // ????????????
  type: string; // ?????? (short, long, check, radio, drop, calender, time)
  order: number; // ??????
  section: number; // ?????????
  content?: string; // ????????????
  isNeccessary?: boolean; // ??????
  gridData?: IGridData; // ?????????
  formOptions?: IFormOptions[]; //????????????,?????????,????????????
  uuid: string; // ??????ID
}

// form ????????????
const CreateForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const classes = useStyles();
  //ref
  const rightDiv = useRef<HTMLDivElement>(null);
  const headerTitle = useRef<HTMLInputElement>(null);
  const footer = useRef<HTMLDivElement>();

  // ??? ???????????? ??? ??????
  useEffect((): void => {
    // ??? ?????????
    if (router.query.form) {
      axios
        .get(`https://nspark.shop/form/get/${router.query.form}`)
        .then((res) => {
          setTitle(res.data.data.title);
          setSubTitle(res.data.data.subTitle);
          setQuestions(
            res.data.data.formContents.map((question) => {
              if (
                question.type === "long" ||
                question.type === "short" ||
                question.type === "calendar" ||
                question.type === "time"
              ) {
                delete question.id;
                return {
                  ...question,
                  isNeccessary: question.isNeccessary === "n" ? false : true,
                  formOptions: [{ text: "?????? 1", uuid: uuid() }],
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

  // ?????? ??????
  const [title, setTitle] = useState<string>("");
  const onChangeTitle = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setTitle(e.target.value);
  };

  // ????????? ??????
  const [subTitle, setSubTitle] = useState<string>("");
  const onChangeSubTitle = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setSubTitle(e.target.value);
  };

  // ?????? ??????
  const [questions, setQuestions] = useState<IQuestions[]>([
    {
      question: "???????????? ??????",
      type: "radio",
      order: 1,
      section: 1,
      isNeccessary: false,
      formOptions: [{ text: "?????? 1", uuid: uuid() }],
      uuid: uuid(),
    },
  ]);

  // ????????? ?????? index
  const [cardIndex, setCardIndex] = useState<number>(1);

  // ????????? ?????? focus??? ?????? ??????
  const [focus, setFocus] = useState<boolean>(false);

  // ????????? id
  const [optionUuid, setOptionUuid] = useState<string>("");

  // ?????? ??????
  const [fillStar, setFillStar] = useState<boolean>(false);

  // ????????????????????? index
  const [warningIndex, setWarningIndex] = useState<string>("");

  // ?????? ???????????? ?????? ?????? ??????
  const itemClickHandler = (i: number): void => {
    const newTopHeight: HTMLElement | any =
      cardIndex === 0
        ? document.getElementById("cardContainer").children[0]
        : document.getElementById("cardContainer").children[1].children[
            cardIndex - 1
          ];
    if (newTopHeight !== null) {
      rightDiv.current.style.top = newTopHeight.offsetTop + "px";
    }
  };

  // ?????? ????????? ?????? ?????? ????????????
  useEffect((): void => {
    headerTitle.current.style.width =
      (headerTitle.current.value.replace(/\s/gi, "").length + 1) * 18 +
      (headerTitle.current.value.match(/ /g) || []).length * 5 +
      "px";
  }, [title]);

  // ?????? ????????? ????????? ?????? focus ??????
  const [questionsLength, setQuestionsLength] = useState<number>(1);

  // ?????? ????????? ????????? ??? ????????? ????????? ????????? focus??????, ?????? ????????? ?????? ??? ??? ???????????? focus ??????
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

  // // ????????? ?????? ??? ?????????
  // useEffect(() => {
  //     itemClickHandler(1);
  //     window.onbeforeunload = function (e) {
  //         var dialogText = "Dialog text here";
  //         e.returnValue = dialogText;
  //         return dialogText;
  //     };
  // }, []);

  // ?????? ?????? ????????????
  const [prevCardIndex, setprevCardIndex] = useState<number>(1);

  // ?????? ????????? ??????????????? ?????? ?????? ????????????
  useEffect((): void => {
    itemClickHandler(cardIndex);
    if (cardIndex != prevCardIndex && cardIndex != 0) {
      if (cardIndex === 0) {
        const textarea = document
          .getElementById("cardContainer")
          .children[0].getElementsByClassName(
            "customTextarea"
          )[0] as HTMLTextAreaElement;
        textarea.select();
      } else {
        const textarea = document
          .getElementById("cardContainer")
          .children[1].children[cardIndex - 1].getElementsByClassName(
            "customTextarea"
          )[0] as HTMLTextAreaElement;
        textarea.select();
      }
    }
    setprevCardIndex(cardIndex);
  }, [cardIndex]);

  // ?????? ?????? ??????
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
        cp[cardIndex - 1].formOptions = shuffleArray(
          cp[cardIndex - 1].formOptions
        );
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

  // ??? ?????? ??????
  const requestFormUpdate = (e: any): void => {
    const temp_questions = questions.map((obj, i) => {
      if (
        obj.type === "long" ||
        obj.type === "short" ||
        obj.type === "calendar" ||
        obj.type === "time"
      ) {
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
      .put(
        `https://elb-test-852958890.ap-northeast-2.elb.amazonaws.com/form/update/${router.query.form}`,
        body
      )
      .then((res) => {
        console.log(res);
        {
          e === 1
            ? router.push(`/forms/${router.query.form}/viewform`)
            : dispatch(setAlert(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ????????????
  const preview = (): void => {
    requestFormUpdate(1);
  };

  // ????????? ?????? ?????? ??????
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const toggleLogoutModal = (): void => {
    setIsVisibleModal((prev) => !prev);
  };

  // ???????????? ?????? ?????? ??????
  const [isCopyed, setIsCopyed] = useState<boolean>(false);

  // ??????????????? ??????
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

  // ??????, ??????????????? state
  const [pageState, setPageState] = useState<string>("question");

  // ???????????? ????????? state
  const [isAnswer, setIsAnswer] = useState<boolean>(false);

  return (
    <div
      className="min-h-forms"
      style={{ paddingBottom: 50, backgroundColor: "#ffffef" }}
    >
      <App />
      <div className="bg-white border-b-2 shadow-sm h-16 flex justify-center items-center">
        <div className="inline-flex w-222 justify-between relative">
          <div className="absolute -bottom-2 left-96 flex justify-center items-center text-xs h-6">
            <div className="flex h-6 relative">
              <div
                className=" h-full flex justify-center items-center px-2 cursor-pointer"
                onClick={() => {
                  setPageState("question");
                }}
              >
                ??????
              </div>
              <div
                className="h-full flex justify-center items-center px-2 cursor-pointer"
                onClick={() => {
                  setPageState("answer");
                }}
              >
                ??????
              </div>
              <div
                className={` h-0.75 w-10 bg-main absolute bottom-0 left-0 rounded-full transition-all ${
                  pageState === "question" ? "left-0" : "left-10"
                }`}
              />
            </div>
          </div>
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
                    setTitle("?????? ?????? ?????????");
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
            <Tooltip title="????????? ??????">
              <IconButton size={"small"}>
                <FolderOpenIcon style={{ color: "#5f6368" }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="??????"
              style={{ marginLeft: 8 }}
              onClick={() => {
                setFillStar((prev) => !prev);
              }}
            >
              <IconButton size={"small"}>
                {fillStar ? (
                  <StarIcon className="text-main" />
                ) : (
                  <StarBorderIcon style={{ color: "#5f6368" }} />
                )}
              </IconButton>
            </Tooltip>
          </div>
          <div className="flex items-center space-x-1">
            <div className="relative -left-2">
              <Tooltip title="????????????" onClick={preview}>
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
              ??????
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
              ?????????
            </Button>
          </div>
        </div>
      </div>
      {pageState === "question" ? (
        <>
          <div
            style={{ width: 768, margin: "0 auto", position: "relative" }}
            id={"cardContainer"}
          >
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
                  placeholder={"????????? ??????"}
                  value={title}
                  onChange={onChangeTitle}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.preventDefault();
                    }
                  }}
                  onBlur={() => {
                    if (!title) {
                      setTitle("?????? ?????? ?????????");
                    }
                  }}
                  fontSize={32}
                  height={50}
                />
                <Input
                  active={cardIndex === 0 ? true : false}
                  placeholder={"????????? ??????"}
                  value={subTitle}
                  onChange={onChangeSubTitle}
                  fontSize={14}
                  height={24}
                  constainerStyle={{ marginTop: 8 }}
                />
              </>
            </Card>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="questions">
                {(provided: any) => (
                  <ul
                    className="questions"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {questions.map((v, i) => {
                      return (
                        <Draggable key={v.uuid} draggableId={v.uuid} index={i}>
                          {(provided: any) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
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
                                        active={
                                          cardIndex === i + 1 ? true : false
                                        }
                                        height={28}
                                        fontSize={16}
                                        backgroundColor={"#f8f8f8"}
                                        bottomBorderColor={"black"}
                                        value={v.question}
                                        placeholder={"??????"}
                                        onChange={(e) => {
                                          const cp = [...questions];
                                          const index = cp.findIndex(
                                            (x) => x.uuid === v.uuid
                                          );
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
                                          <ImageOutlinedIcon
                                            style={{ color: "#5f6368" }}
                                          />
                                        </IconButton>
                                      </div>
                                      <div>
                                        <Select
                                          value={v.type}
                                          onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                          ) => {
                                            const cp = [...questions];
                                            cp[cardIndex - 1].type =
                                              e.target.value;
                                            setQuestions(cp);
                                          }}
                                          renderValue={(value) => {
                                            switch (value) {
                                              case "short":
                                                return (
                                                  <div
                                                    className={
                                                      classes.MenuItemList
                                                    }
                                                  >
                                                    <SubjectIcon />
                                                    <span
                                                      className={
                                                        classes.MenuItemListLabel
                                                      }
                                                    >
                                                      ?????????
                                                    </span>
                                                  </div>
                                                );
                                              case "long":
                                                return (
                                                  <div
                                                    className={
                                                      classes.MenuItemList
                                                    }
                                                  >
                                                    <SubjectIcon />
                                                    <span
                                                      className={
                                                        classes.MenuItemListLabel
                                                      }
                                                    >
                                                      ?????????
                                                    </span>
                                                  </div>
                                                );
                                              case "radio":
                                                return (
                                                  <div
                                                    className={
                                                      classes.MenuItemList
                                                    }
                                                  >
                                                    <RadioButtonCheckedIcon />
                                                    <span
                                                      className={
                                                        classes.MenuItemListLabel
                                                      }
                                                    >
                                                      ????????? ??????
                                                    </span>
                                                  </div>
                                                );
                                              case "check":
                                                return (
                                                  <div
                                                    className={
                                                      classes.MenuItemList
                                                    }
                                                  >
                                                    <CheckBoxIcon />{" "}
                                                    <span
                                                      className={
                                                        classes.MenuItemListLabel
                                                      }
                                                    >
                                                      ????????????
                                                    </span>
                                                  </div>
                                                );
                                              case "drop":
                                                return (
                                                  <div
                                                    className={
                                                      classes.MenuItemList
                                                    }
                                                  >
                                                    <ArrowDropDownCircleIcon />
                                                    <span
                                                      className={
                                                        classes.MenuItemListLabel
                                                      }
                                                    >
                                                      ????????????
                                                    </span>
                                                  </div>
                                                );
                                            }
                                          }}
                                          variant="outlined"
                                          className={classes.select}
                                        >
                                          <MenuItem
                                            value={"short"}
                                            className={classes.MenuItem}
                                          >
                                            <SubjectIcon
                                              className={classes.icon}
                                            />
                                            ?????????
                                          </MenuItem>
                                          <MenuItem
                                            value={"long"}
                                            className={classes.MenuItem}
                                          >
                                            <SubjectIcon
                                              className={classes.icon}
                                            />
                                            ?????????
                                          </MenuItem>
                                          <Divider
                                            style={{
                                              marginTop: 10,
                                              marginBottom: 10,
                                            }}
                                          />
                                          <MenuItem
                                            value={"radio"}
                                            className={classes.MenuItem}
                                          >
                                            <RadioButtonCheckedIcon
                                              className={classes.icon}
                                            />
                                            ????????? ??????
                                          </MenuItem>
                                          <MenuItem
                                            value={"check"}
                                            className={classes.MenuItem}
                                          >
                                            <CheckBoxIcon
                                              className={classes.icon}
                                            />
                                            ????????????
                                          </MenuItem>
                                          <MenuItem
                                            value={"drop"}
                                            className={classes.MenuItem}
                                          >
                                            <ArrowDropDownCircleIcon
                                              className={classes.icon}
                                            />
                                            ????????????
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
                                                const textarea = document
                                                  .getElementsByClassName(
                                                    "cardWrapper"
                                                  )
                                                  [
                                                    i + 1
                                                  ].getElementsByClassName(
                                                    "customTextarea"
                                                  )[
                                                  idx + 1
                                                ] as HTMLTextAreaElement;
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
                                                customTextareaBottomBorderColor={
                                                  warningIndex === `${i}-${idx}`
                                                    ? "#E46337"
                                                    : ""
                                                }
                                                onBlur={() => {
                                                  const cp = [...questions];
                                                  const formOptions =
                                                    cp[cardIndex - 1]
                                                      .formOptions;
                                                  if (
                                                    !formOptions[
                                                      idx
                                                    ].text.replace(/\s/gi, "")
                                                  ) {
                                                    formOptions[
                                                      idx
                                                    ].text = `?????? ${idx + 1}`;
                                                    setQuestions(cp);
                                                  } else if (
                                                    warningIndex ===
                                                    `${i}-${idx}`
                                                  ) {
                                                    const formOptionsIndex =
                                                      formOptions.findIndex(
                                                        (value) => {
                                                          return (
                                                            value.uuid ===
                                                            val.uuid
                                                          );
                                                        }
                                                      );
                                                    formOptions[
                                                      formOptionsIndex
                                                    ].text = `?????? ${formOptions.length}`;
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
                                                borderBottom={
                                                  optionUuid === val.uuid
                                                    ? "y"
                                                    : ""
                                                }
                                                onChange={(e) => {
                                                  const cp = [...questions];
                                                  const index = cp.findIndex(
                                                    (x) => x.uuid === v.uuid
                                                  );
                                                  const formOptions =
                                                    cp[index].formOptions;
                                                  const formOptionsIndex =
                                                    formOptions.findIndex(
                                                      (value) => {
                                                        return (
                                                          value.uuid ===
                                                          val.uuid
                                                        );
                                                      }
                                                    );

                                                  formOptions[
                                                    formOptionsIndex
                                                  ] = {
                                                    ...formOptions[
                                                      formOptionsIndex
                                                    ],
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
                                                      .indexOf(
                                                        e.target.value
                                                      ) === -1
                                                  ) {
                                                    setWarningIndex("");
                                                  } else {
                                                    setWarningIndex(
                                                      `${i}-${idx}`
                                                    );
                                                  }

                                                  setQuestions(cp);
                                                }}
                                                onKeyDown={(e) => {
                                                  if (
                                                    e.ctrlKey &&
                                                    e.key === "Enter"
                                                  ) {
                                                    e.preventDefault();
                                                  } else if (e.key == "Enter") {
                                                    const cp = [...questions];
                                                    const index = cp.findIndex(
                                                      (x) => x.uuid === v.uuid
                                                    );
                                                    const formOptions =
                                                      cp[index].formOptions;
                                                    const formOptionsIndex =
                                                      formOptions.findIndex(
                                                        (xx) =>
                                                          xx.uuid === val.uuid
                                                      );
                                                    formOptions.splice(
                                                      formOptionsIndex + 1,
                                                      0,
                                                      {
                                                        uuid: uuid(),
                                                        text: `?????? ${
                                                          v.formOptions.length +
                                                          1
                                                        }`,
                                                      }
                                                    );
                                                    setQuestions(cp);
                                                    if (
                                                      warningIndex ===
                                                      `${i}-${idx}`
                                                    ) {
                                                      const cp = [...questions];
                                                      const formOptions =
                                                        cp[cardIndex - 1]
                                                          .formOptions;
                                                      const formOptionsIndex =
                                                        formOptions.findIndex(
                                                          (value) => {
                                                            return (
                                                              value.uuid ===
                                                              val.uuid
                                                            );
                                                          }
                                                        );
                                                      formOptions[
                                                        formOptionsIndex
                                                      ].text = `?????? ${
                                                        formOptions.length - 1
                                                      }`;
                                                      setQuestions(cp);
                                                      setWarningIndex("");
                                                    }
                                                    e.preventDefault();
                                                    setTimeout(() => {
                                                      const textarea = document
                                                        .getElementsByClassName(
                                                          "cardWrapper"
                                                        )
                                                        [
                                                          i + 1
                                                        ].getElementsByClassName(
                                                          "customTextarea"
                                                        )[
                                                        idx + 2
                                                      ] as HTMLTextAreaElement;
                                                      textarea.select();
                                                    }, 1);
                                                  } else if (
                                                    e.key == "Backspace" &&
                                                    !val.text &&
                                                    v.formOptions.length != 1
                                                  ) {
                                                    const cp = [...questions];
                                                    const formOptions =
                                                      cp[cardIndex - 1]
                                                        .formOptions;
                                                    const formOptionsIndex =
                                                      formOptions.findIndex(
                                                        (value) => {
                                                          return (
                                                            value.uuid ===
                                                            val.uuid
                                                          );
                                                        }
                                                      );
                                                    formOptions.splice(
                                                      formOptionsIndex,
                                                      1
                                                    );
                                                    setQuestions(cp);
                                                    e.preventDefault();
                                                    if (idx === 0) {
                                                      setTimeout(() => {
                                                        const textarea =
                                                          document
                                                            .getElementsByClassName(
                                                              "cardWrapper"
                                                            )
                                                            [
                                                              i + 1
                                                            ].getElementsByClassName(
                                                              "customTextarea"
                                                            )[1] as HTMLTextAreaElement;
                                                        textarea.select();
                                                      }, 1);
                                                    } else {
                                                      setTimeout(() => {
                                                        const textarea =
                                                          document
                                                            .getElementsByClassName(
                                                              "cardWrapper"
                                                            )
                                                            [
                                                              i + 1
                                                            ].getElementsByClassName(
                                                              "customTextarea"
                                                            )[
                                                            idx
                                                          ] as HTMLTextAreaElement;
                                                        textarea.select();
                                                      }, 1);
                                                    }
                                                  }
                                                }}
                                              />
                                              {warningIndex ===
                                                `${i}-${idx}` && (
                                                <Tooltip
                                                  title="??????????????? ???????????? ????????????."
                                                  onClick={(event) => {
                                                    const cp = [...questions];
                                                    const formOptions =
                                                      cp[cardIndex - 1]
                                                        .formOptions;
                                                    const formOptionsIndex =
                                                      formOptions.findIndex(
                                                        (value) => {
                                                          return (
                                                            value.uuid ===
                                                            val.uuid
                                                          );
                                                        }
                                                      );
                                                    formOptions[
                                                      formOptionsIndex
                                                    ].text = `?????? ${formOptions.length}`;
                                                    setQuestions(cp);
                                                    setWarningIndex("");
                                                    const textarea = document
                                                      .getElementsByClassName(
                                                        "cardWrapper"
                                                      )
                                                      [
                                                        i + 1
                                                      ].getElementsByClassName(
                                                        "customTextarea"
                                                      )[
                                                      idx + 1
                                                    ] as HTMLTextAreaElement;
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
                                                  title="??????"
                                                  onClick={() => {
                                                    const cp = [...questions];
                                                    const formOptions =
                                                      cp[cardIndex - 1]
                                                        .formOptions;
                                                    const formOptionsIndex =
                                                      formOptions.findIndex(
                                                        (value) => {
                                                          return (
                                                            value.uuid ===
                                                            val.uuid
                                                          );
                                                        }
                                                      );
                                                    formOptions.splice(
                                                      formOptionsIndex,
                                                      1
                                                    );
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
                                                  const index = cp.findIndex(
                                                    (x) => x.uuid === v.uuid
                                                  );
                                                  const formOptions =
                                                    cp[index].formOptions;
                                                  formOptions.push({
                                                    uuid: uuid(),
                                                    text: `?????? ${
                                                      v.formOptions.length + 1
                                                    }`,
                                                  });
                                                  setQuestions(cp);
                                                }}
                                              >
                                                ?????? ??????
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
                                                  const index = cp.findIndex(
                                                    (x) => x.uuid === v.uuid
                                                  );
                                                  const formOptions =
                                                    cp[index].formOptions;
                                                  formOptions.push({
                                                    uuid: uuid(),
                                                    text: `?????? ${
                                                      v.formOptions.length + 1
                                                    }`,
                                                  });
                                                  setQuestions(cp);
                                                }}
                                              >
                                                ?????? ??????
                                              </span>{" "}
                                              ??????{" "}
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
                                                {`'??????' ??????`}
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
                                        {v.type === "long"
                                          ? "????????? ?????????"
                                          : "????????? ?????????"}
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
                                        title="??????"
                                        onClick={() => {
                                          const cp = [...questions];
                                          cp.splice(cardIndex, 0, {
                                            ...cp[cardIndex - 1],
                                            uuid: uuid(),
                                            formOptions: cp[
                                              cardIndex - 1
                                            ].formOptions.map((x) => {
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
                                          <FileCopyOutlinedIcon
                                            style={{ color: "#5f6368" }}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip
                                        title="??????"
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
                                          <DeleteOutlineIcon
                                            style={{ color: "#5f6368" }}
                                          />
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
                                            ??????
                                          </span>
                                          <Toggle
                                            active={questions[i].isNeccessary}
                                            setToggle={() => {
                                              const cp = [...questions];
                                              cp[cardIndex - 1].isNeccessary =
                                                !cp[cardIndex - 1].isNeccessary;
                                              setQuestions(cp);
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <IconButton style={{ marginLeft: 5 }}>
                                        <MoreVertIcon
                                          style={{ color: "#5f6368" }}
                                        />
                                      </IconButton>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <div>
                                      {v.question ? v.question : "??????"}{" "}
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
                                                const textarea = document
                                                  .getElementsByClassName(
                                                    "cardWrapper"
                                                  )
                                                  [
                                                    i + 1
                                                  ].getElementsByClassName(
                                                    "customTextarea"
                                                  )[
                                                  idx + 1
                                                ] as HTMLTextAreaElement;
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
                                        {v.type === "long"
                                          ? "????????? ?????????"
                                          : "????????? ?????????"}
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
                title="?????? ??????"
                onClick={() => {
                  const cp = [...questions];
                  cp.splice(cardIndex, 0, {
                    type: "radio",
                    question: "",
                    uuid: uuid(),
                    formOptions: [
                      {
                        text: "?????? 1",
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
            ??????????????? ???????????????.
            <br />
            ????????? ???????????? ????????? ????????? ??? Ctrl + Enter??? ??????????????? ?????????
            ???????????? ?????? ??? ????????????.
          </div>
        </>
      ) : (
        <div style={{ width: 768, margin: "0 auto", position: "relative" }}>
          <div className="bg-white border-1 rounded-lg py-4 px-6 mt-3">
            <div className="text-3xl">?????? 3???</div>
            <div className="flex justify-end items-center">
              <div
                className="text-xs text-slate-600 mr-5 relative"
                style={{ top: 1 }}
              >
                ????????????
              </div>
              <Toggle
                active={isAnswer}
                setToggle={() => {
                  setIsAnswer((prev) => !prev);
                }}
              />
            </div>
          </div>
          <div className="bg-white border-1 rounded-lg py-4 px-6 mt-3">
            <div>????????? ???????????????.</div>
            <div className="text-xs text-slate-600 mt-2">?????? 3???</div>
            <div className="mt-6">
              <div className="bg-slate-100 rounded-md px-1 py-2 text-sm mt-2">
                ?????????
              </div>
              <div className="bg-slate-100 rounded-md px-1 py-2 text-sm mt-2">
                ?????????
              </div>
              <div className="bg-slate-100 rounded-md px-1 py-2 text-sm mt-2">
                ?????????
              </div>
            </div>
          </div>
          <div className="bg-white border-1 rounded-lg py-4 px-6 mt-3">
            <div>??????????????? ????????????.</div>
            <div className="text-xs text-slate-600 mt-2">?????? 3???</div>
            <div className="mt-6">
              <div className="bg-slate-100 rounded-md px-1 py-2 text-sm mt-2">
                ???????????????. ?????? ????????? ?????????. ??? ??????????????????.
              </div>
              <div className="bg-slate-100 rounded-md px-1 py-2 text-sm mt-2">
                ???????????????~ ???????????? 1??????????????? ????????? ??????????????????. ?????????
              </div>
              <div className="bg-slate-100 rounded-md px-1 py-2 text-sm mt-2">
                ??????????????? ??????????????????~~ ????????? ??????????????? ??? ???????????????!
              </div>
            </div>
          </div>
          <div className="bg-white border-1 rounded-lg py-4 px-6 mt-3">
            <div>???????????? ????????? ?????? ???????????????.</div>
            <div className="text-xs text-slate-600 mt-2">?????? 3???</div>
            <div className="mt-6 flex pl-32 pb-5">
              <div className="w-40 h-40 rounded-full bg-main flex justify-center items-center text-xs text-white">
                100%
              </div>
              <div className="ml-32">
                <div className="flex items-center text-xs">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
                  <div>All is well</div>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-2 h-2 rounded-full bg-red-600 mr-2" />
                  <div>{`Subi's kitchen`}</div>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-2 h-2 rounded-full bg-main mr-2" />
                  <div>Form bakery</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border-1 rounded-lg py-4 px-6 mt-3">
            <div>???????????? ????????? ???????????????.(????????????)</div>
            <div className="text-xs text-slate-600 mt-2">?????? 3???</div>
            <div className="mt-6 pl-32 pb-10 space-y-6 relative">
              <div className="flex items-center">
                <div className="text-xs w-16 text-right">???????????????</div>
                <div className=" w-120 h-8 ml-2 bg-slate-600" />
              </div>
              <div className="flex items-center">
                <div className="text-xs w-16 text-right">?????????</div>
                <div className=" w-120 h-8 ml-2 bg-slate-600" />
              </div>
              <div className="flex items-center">
                <div className="text-xs w-16 text-right">?????????</div>
                <div className=" w-60 h-8 ml-2 bg-slate-600" />
              </div>
              <div
                className="bg-black absolute"
                style={{ top: -40, left: 199, height: 175, width: 1 }}
              />
              <div
                className="bg-gray-300 absolute"
                style={{ top: -40, left: 199, height: 1, width: 480 }}
              />
              <div
                className="bg-gray-300 absolute"
                style={{ top: -40, left: 439, height: 175, width: 1 }}
              />
              <div
                className="bg-gray-300 absolute"
                style={{ top: -40, left: 679, height: 175, width: 1 }}
              />
              <div
                className="bg-gray-300 absolute text-xs flex items-center justify-between"
                style={{ top: 135, left: 199, height: 1, width: 480 }}
              >
                <span className="relative" style={{ left: -2, top: 10 }}>
                  0
                </span>
                <span className="relative" style={{ left: 0, top: 10 }}>
                  1
                </span>
                <span className="relative" style={{ left: 2, top: 10 }}>
                  2
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <Alert title={"??? ??????"} subTitle={"??????????????? ?????????????????????."} />
      <div
        className={`w-full absolute top-0 left-0 bg-black bg-opacity-20 flex justify-center items-center ${
          isVisibleModal ? "z-10 opacity-100 h-full" : "-z-10 opacity-0 h-0"
        }`}
        onClick={toggleLogoutModal}
      >
        <div
          className={`w-120 h-64 rounded-md bg-white relative p-6 border-1 shadow-md transition-all ${
            isVisibleModal ? "opacity-100 top-0" : "opacity-0 top-10"
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="text-lg font-bold">????????? ?????????</div>
          <div className="text-md mt-6">??????</div>
          <div className="mt-2">
            <Input
              height={28}
              fontSize={16}
              backgroundColor={"#f8f8f8"}
              bottomBorderColor={"black"}
              value={`http://localhost:3000/forms/${router.query.form}/viewform`}
            />
          </div>
          <div className="mt-8 text-right space-x-2 absolute bottom-6 right-6">
            <button
              className={`w-20 h-8 rounded-md border-1 border-main text-main text-sm`}
              onClick={toggleLogoutModal}
            >
              ??????
            </button>
            <button
              className={`w-20 h-8 rounded-md bg-main text-white text-sm`}
              onClick={() => {
                handleCopyClipBoard(
                  `http://localhost:3000/forms/${router.query.form}/viewform`
                );
              }}
            >
              ??????
            </button>
          </div>
        </div>
        <div
          className={`rounded-sm bg-slate-800 text-white absolute left-20 p-2 text-sm transition-all ${
            isCopyed ? "bottom-10" : "-bottom-10"
          }`}
        >
          ??????????????? ?????????????????????.
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
