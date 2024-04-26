import React, { FunctionComponent,useState, useRef, useEffect } from "react";

interface SubheaderProps {
  setText:(title:string) => void;
  text:string
}

const Subheader: FunctionComponent<SubheaderProps> = ({setText, text}) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inputRef.current && spanRef.current) {
      // スパン要素の幅を取得し、それをインプット要素の幅として設定
      const width = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${width}px`; // +10はパディングまたはボーダーのための余白
    }
  }, [text]);
  
  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value
    setText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      inputRef.current?.blur();  
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleDoubleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };
  
  return (
    <div className="self-stretch box-border bg-snow h-[5vh] flex flex-col ">
      <div className="flex flex-row justify-between items-center self-stretch py-[10.9px] px-8">
        <div className="flex flex-row items-center justify-start gap-[7px]">
        <input
            type="text"
            value={text}
            ref={inputRef}
            onChange={handleChangeText}
            onDoubleClick={handleDoubleClick}
            onKeyDown={handleKeyDown}
            className="relative leading-[18px] border-none bg-transparent"
          />    
                    <span ref={spanRef} className="absolute invisible">    {text}      </span>


            <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-5 relative h-5 bg-[url('/public/image-6@3x.png')] bg-cover bg-no-repeat bg-[top]"
          onClick={handleClick} />
        </div>
        <div className="flex flex-row items-end justify-center gap-[10px]">
          <div className="relative leading-[18px]">gpt-4[品質重視]</div>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[18px] relative h-[18px] bg-[url('/public/image-7@3x.png')] bg-cover bg-no-repeat bg-[top]" />
        </div>
      </div>
      <div className="self-stretch relative box-border h-px border-t-[1px] w-full border-solid border-silver-100" />
    </div>
  );
};

export default Subheader;
