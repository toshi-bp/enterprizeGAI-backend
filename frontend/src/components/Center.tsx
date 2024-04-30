import {
  FunctionComponent,
  useState,
  useEffect,
  KeyboardEvent,
  useRef,
  useCallback,
} from "react";
import UserComment from "./UserComment";
import AIComment from "./AIComment";
import TextareaAutosize from "react-textarea-autosize";
import Leftbar from "./Leftbar";
import { Drawer, useMediaQuery } from "@mui/material";
import { buttonTexts } from "../constants/buttonText";

import { DefaultApi, Configuration } from "../api-client";
const config = new Configuration({
  // TODO: 開発用
  basePath: "http://localhost:8000",
  // basePath: "http://localhost:5173",
});
export const apiClient = new DefaultApi(config);

interface CenterProps {
  selectedText: string;
  setSelectedText: (text: string) => void;
  setIsLeftbarOpen: (isOpen: boolean) => void;
  isLeftbarOpen: boolean;
  setIsRightbarOpen: (open: boolean) => void;
  isRightbarOpen: boolean;
}

const Center: React.FunctionComponent<CenterProps> = ({
  selectedText,
  setSelectedText,
  setIsLeftbarOpen,
  isLeftbarOpen,
  setIsRightbarOpen,
  isRightbarOpen,
}) => {
  const [comments, setComments] = useState<
    Array<{ type: string; text: string }>
  >([]);
  const [textareaHeight, setTextareaHeight] = useState(0);
  const textareaRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const addMessage = useCallback(
    (text: string, type: string) => {
      setComments((comments) => comments.slice(0, -1).concat({ type, text }));
    },
    [setComments]
  );

  const socketRef = useRef<WebSocket>();
  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8000/chat");
    socketRef.current = websocket;
    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    const onMessage = (event: MessageEvent<string>) => {
      const type = JSON.parse(event.data).type ?? "ai";
      const text = JSON.parse(event.data).text ?? "";
      addMessage(text, type);
      setLoading(false);
    };
    websocket.addEventListener("message", onMessage);

    return () => {
      websocket.close();
      websocket.removeEventListener("message", onMessage);
    };
  }, [addMessage]);

  useEffect(() => {
    const updateHeight = () => {
      setTextareaHeight(
        textareaRef.current ? textareaRef.current.scrollHeight : 0
      );
    };

    updateHeight(); // 初回の高さの更新
    window.addEventListener("resize", updateHeight); // ウィンドウのリサイズに対応
    return () => window.removeEventListener("resize", updateHeight); // クリーンアップ
  }, [selectedText]); // selectedTextが更新されたら高さを再計算

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedText(event.target.value);
  };

  const handleSubmit = useCallback(() => {
    if (!selectedText.trim()) return;
    const newComment = {
      type: "user",
      text: selectedText,
    };
    const aiResponse = {
      type: "ai",
      text: "これはAIの自動生成された応答です。",
    };
    // setComments((comments) => [...comments, newComment, aiResponse]);
    setSelectedText("");
    socketRef.current?.send(JSON.stringify(newComment));

    const date = new Date();
    let formattedDate = date.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    formattedDate = formattedDate.replace(/\//g, "'");
    setDate(formattedDate);
    setComments((comments) => [...comments, newComment]);
    setComments((comments) => [...comments, { type: "ai", text: "考え中..." }]);
    // apiClient.runLlmLlmPost({ text: selectedText }).then((response) => {
    //   const aiResponse = {
    //     type: "ai",
    //     text: response.data.text,
    //   };
    //   console.log(response.data.text);
    //   setComments((comments) => [...comments, aiResponse]);
    // });
  }, [selectedText]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const toggleLeftbar = () => {
    setIsLeftbarOpen(!isLeftbarOpen);
  };
  const toggleRightbar = () => {
    setIsRightbarOpen(!isRightbarOpen);
  };

  return (
    <div className="relative self-stretch flex-1 flex flex-col items-start justify-between h-[88vh] overflow-auto text-left text-base text-black font-inter">
      <div className="self-stretch flex-1 flex flex-col items-center justify-end gap-[10px] text-xs">
        <div className="self-stretch overflow-hidden flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-16 gap-[10px]">
          {/* <UserComment
            text={buttonTexts.firstUserComment}
            // date={"2024’03’05 12:00"}
          />
          <AIComment text={buttonTexts.firstAIComment} /> */}
          {comments.map((comment, index) =>
            comment.type === "user" ? (
              <UserComment key={index} text={comment.text} date={date} />
            ) : (
              <AIComment key={index} text={comment.text} />
            )
          )}
        </div>
        <div
          className="relative self-stretch flex flex-col items-center justify-start z-1  bottom-0 pb-4 px-6 mb-5 bg-white"
          style={{ height: `${textareaHeight}px` }}
        >
          <div
            ref={textareaRef}
            className="absolute bottom-3 w-[80%] left-[50%] translate-x-[-50%]  self-stretch shadow-[4px_4px_4px_rgba(0,_0,_0,_0.5),_-4px_-4px_4px_rgba(0,_0,_0,_0.25)] flex flex-row items-center justify-between bg-white py-4 px-8 border-[1px] border-solid border-silver-200"
          >
            <TextareaAutosize
              value={selectedText}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="[border:none] [outline:none] font-light font-inter text-xs w-full relative leading-[18px] italic placeholder-darkgray-300 text-left resize-none"
              placeholder="質問をどうぞ"
              maxRows={10}
            />
            <button
              className="cursor-pointer [border:none] p-0 w-[30px] relative h-[30px] bg-[url('/public/image-5@3x.png')] bg-white bg-cover bg-no-repeat bg-[top]"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>{" "}
      <button
        className={`fixed cursor-pointer border-none p-0 bg-transparent top-1/2 -translate-y-1/2  ${
          isLeftbarOpen
            ? "bg-[url('/public/Sidebutton@3x.png')] left-64"
            : "bg-[url('/public/CurvedSidebutton@3x.png')] left-3"
        } bg-contain bg-no-repeat h-[26px] w-[10px] hover:brightness-50 hover:contrast-200`}
        onClick={toggleLeftbar}
      ></button>
      <button
        className={`fixed cursor-pointer border-none p-0 bg-transparent top-1/2 -translate-y-1/2 ${
          isRightbarOpen
            ? "bg-[url('/public/Sidebutton@3x.png')] right-[246px]"
            : "bg-[url('/public/RightCurvedSidebutton@3x.png')] right-3"
        } bg-contain bg-no-repeat h-[26px] w-[10px] hover:brightness-50 hover:contrast-200`}
        onClick={toggleRightbar}
      ></button>
    </div>
  );
};

export default Center;
