import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent
} from "react";
import s from "./SuperInputText.module.css";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
};

const SuperInputText: React.FC<SuperInputTextPropsType> = ({
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  title,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);

    onChangeText && onChangeText(e.currentTarget.value);
  };
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress && onKeyPress(e);

    e.key === "Enter" &&
    onEnter &&
      onEnter();
  };

  const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ""}`;
  const finalInputClassName = `${
    error ? s.errorInput : s.superInput
  } ${className}`;

  return (
    <div className={s.inputItem}>
      {title && <div className={s.title}>{title}</div>}
      <input
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        className={finalInputClassName}
        {...restProps}
      />
      <div className={s.inputErrorMessageArea}>
      {error && <span className={finalSpanClassName}>{error}</span>}
        </div>
    </div>
  );
};

export default SuperInputText;
