import { FC } from "react";

type InputFieldProps = {
    hint?: string;
};

const InputField: FC<InputFieldProps> = ({hint}) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        fetchWallet(event.currentTarget.value).then((json) => {
            console.log(json);
        });
      }
    };

    const fetchWallet = async (address: String) => {
        const response = await fetch(`http://127.0.0.1:8000/analyze?address=${address}`, {
          method: "GET",
        });

        return response.json();
    };

  return (
    <div className="h-9 rounded-sm border-2 border-solid border-tornado-green">
      <input
        className="h-full w-full bg-tornado-dark px-1 text-tornado-green outline-none"
        type="text"
        placeholder=" 0xDbD038..."
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
};

export default InputField;