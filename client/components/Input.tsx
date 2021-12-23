import React, { CSSProperties, useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from "react";
import classNames from "classnames";

interface IProps {
    active?: boolean;
    fontSize?: number;
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    height?: number;
    customTextareaBottomBorderColor?: string;
    onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    onBlur?: () => void;
    constainerStyle?: CSSProperties;
    backgroundColor?: string;
    bottomBorderColor?: string;
    borderBottom?: string;
}

const Input = ({ active, fontSize, placeholder, value, onChange, height, customTextareaBottomBorderColor, onKeyDown, onBlur, constainerStyle, backgroundColor, bottomBorderColor, borderBottom }: IProps) => {
    const [focus, setFocus] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const resizeHeight = () => {
        if (textAreaRef === null || textAreaRef.current === null) {
            return;
        }
        textAreaRef.current.style.height = height + "px";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    };

    useEffect(() => {
        resizeHeight();
    }, [value]);

    const [hover, setHover] = useState(false);

    return (
        <div
            className="customTextareaWrapper"
            style={{
                ...constainerStyle,
                backgroundColor: active && hover && backgroundColor ? "#f1f3f4" : active && backgroundColor ? backgroundColor : undefined,
            }}
            onMouseOver={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        >
            <textarea
                ref={textAreaRef}
                className={classNames("customTextarea pt-1", { active: active })}
                onFocus={(e) => {
                    setFocus(true);
                }}
                onBlur={
                    onBlur
                        ? () => {
                              onBlur();
                              setFocus(false);
                          }
                        : () => {
                              setFocus(false);
                          }
                }
                style={{
                    fontSize: fontSize,
                    height: height,
                    backgroundColor: active && hover && backgroundColor ? "#f1f3f4" : active && backgroundColor ? backgroundColor : undefined,
                }}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    onChange(e);
                }}
                onKeyDown={onKeyDown}
                onClick={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.select();
                }}
            />

            <div
                className="customTextareaDefaultBottomBorder"
                style={{
                    display: active ? undefined : borderBottom ? undefined : "none",
                    backgroundColor: bottomBorderColor ? bottomBorderColor : undefined,
                }}
            ></div>
            <div
                className={classNames("customTextareaBottomBorder", {
                    active: focus,
                })}
                style={{
                    backgroundColor: focus && customTextareaBottomBorderColor ? customTextareaBottomBorderColor : undefined,
                }}
            ></div>
        </div>
    );
};

export default Input;
