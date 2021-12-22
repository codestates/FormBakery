import React from "react";
import classNames from "classnames";

interface IProps {
    active: boolean;
    setToggle: () => void;
}

const Toggle = ({ active, setToggle }: IProps) => {
    return (
        <div
            className={classNames("toggleContainer", { active: active })}
            onClick={() => {
                setToggle();
            }}
        >
            <div className="toggleBar"></div>
            <div
                className={classNames("toggleCircleWrapper", {
                    active: active,
                })}
            >
                <div className={classNames("toggleCircle", { active: active })}></div>
                <div
                    className={classNames("toggleCircleOutside", {
                        active: active,
                    })}
                ></div>
            </div>
        </div>
    );
};

export default Toggle;
