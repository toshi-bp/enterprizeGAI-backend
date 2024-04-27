import { FunctionComponent } from "react";

interface UserCommentProps {
  text: string;
  date: string;
}

const UserComment: FunctionComponent<UserCommentProps> = ({ text, date }) => {
  return (
    <div className="whitespace-pre-wrap self-stretch bg-snow flex flex-row items-start justify-start pt-8 pb-12 pr-8 pl-4 ms:pr-16 ms:pl-12  ld:pr-[25%] ld:pl-[20%] gap-[10px] text-left text-xs text-black font-inter">
      <img
        className="w-[31px] relative rounded-2xs h-[31px] object-cover"
        alt=""
        src="/202011070001493w500-0-2@2x.png"
      />
      <div className="flex-1 flex flex-col items-start justify-start gap-[10px]">
        <i className="self-stretch relative leading-[18px] font-light">
          {text}
        </i>
        <i className="relative font-light text-gray-200">{date}</i>
      </div>
    </div>
  );
};

export default UserComment;
