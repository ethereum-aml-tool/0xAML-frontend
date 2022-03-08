import { FC } from "react";

type InputFieldProps = {
    hint?: string;
    onEnterPressed?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputField: FC<InputFieldProps> = ({hint, onEnterPressed}) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onEnterPressed?.(event);
      }
    };

  return (
    <div className="h-9 rounded-sm border-2 border-solid border-tornado-green">
      <input
        className="h-full w-full bg-tornado-dark px-1 text-tornado-green outline-none"
        type="text"
        placeholder={typeof hint !== "undefined" ? hint : " 0xDbD038..."}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
};

export default InputField;