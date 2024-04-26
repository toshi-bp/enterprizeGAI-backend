import { FunctionComponent } from "react";

interface AICommentProps{
  text:string;
}

const AIComment: FunctionComponent<AICommentProps> = ({text}) => {
  return (
    <div className="whitespace-pre-wrap self-stretch flex flex-row items-start justify-start pt-2.5 pb-0 pr-8 pl-4 ms:pr-16 ms:pl-12  ld:pr-[25%] ld:pl-[20%] gap-[10px] text-left text-xs text-black font-inter">
      <img
        className="w-[31px] relative rounded-2xs h-[31px] object-cover"
        alt=""
        src="/202011070001493w500-0-1@2x.png"
      />
      <div className="flex-1 flex flex-col items-start justify-start">
        <i className="self-stretch relative leading-[18px] font-light">
          {text}
        </i>
      </div>
    </div>
  );
};

export default AIComment;
