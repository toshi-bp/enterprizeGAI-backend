import { FunctionComponent, useState, useEffect } from "react";
import { buttonTexts } from "../constants/buttonText";
import { useMediaQuery } from "@mui/material";

interface LeftbarProps {
  setSelectedText: (text: string) => void;
  setIsLeftbarOpen: (open: boolean) => void;
  isLeftbarOpen: boolean;
}

const Leftbar: FunctionComponent<LeftbarProps> = ({
  setSelectedText,
  setIsLeftbarOpen,
  isLeftbarOpen,
}) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>("template");

  const toggleDisplay = () => {
    setIsDisplayed(!isDisplayed);
    setIsRotated(!isRotated);
  };

  const handleClick = (text: string) => () => {
    setSelectedText(text);
  };

  const handleButtonActive = (buttonName: string) => () => {
    setActiveButton(buttonName);
  };

  const toggleSidebar = () => {
    setIsLeftbarOpen(!isLeftbarOpen);
  };

  return (
    <div
      className={`relative self-start bg-lavender box-border flex flex-col items-start justify-start h-[95vh] w-60  py-0 text-left text-lg text-gray-100 font-inter border-l-[1px] border-solid border-lightgray-200  ${
        isLeftbarOpen ? "block" : "hidden"
      }`}
    >
      {" "}
      <div className="flex flex-row items-start justify-between py-3 px-[20px] mx-auto w-[80%] flex-nowrap">
        <button
          className={`cursor-pointer [border:none] p-0 bg-[transparent] relative text-xs font-inter ${
            activeButton === "template"
              ? "text-mediumblue font-extrabold underline decoration-2 underline-offset-8"
              : "text-black font-light"
          }  text-left inline-block`}
          onClick={handleButtonActive("template")}
        >
          テンプレート
        </button>
        <button
          className={`cursor-pointer [border:none] p-0 bg-[transparent] relative text-xs inline-block italic  font-inter ${
            activeButton === "data"
              ? "text-mediumblue font-extrabold underline decoration-2 underline-offset-8"
              : "text-black font-light"
          }`}
          onClick={handleButtonActive("data")}
        >
          {" "}
          参照データ
        </button>
      </div>
      <div className="self-stretch relative box-border h-px border-t-[1px] border-solid border-silver-100" />
      {activeButton === "template" && (
        <div className="self-stretch flex flex-col items-start justify-start pt-8 pb-0 pr-3 pl-6 gap-[16px]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-center gap-[16px]">
                <button
                  id="button-toggle-text"
                  onClick={toggleDisplay}
                  className={`cursor-pointer [border:none] p-0 bg-[transparent] w-[10px] relative h-[21px] bg-[url('/public/image-31@3x.png')] bg-cover bg-no-repeat bg-[top] ${
                    isRotated ? "rotate-90" : ""
                  }`}
                />

                <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-lg font-inter text-black text-left inline-block">
                  営業部
                </button>
              </div>
              <div className="relative">5件</div>
            </div>
            <div
              id="toggle-display"
              className={`toggle-display ${
                isDisplayed ? "block" : "hidden"
              } self-stretch flex flex-col items-start justify-start py-0 pr-0 pl-4 gap-[16px] text-base text-gray-100 `}
            >
              <button
                onClick={handleClick(buttonTexts.responseToCustomer)}
                className="cursor-pointer [border:none] p-0 bg-[transparent] text-left self-stretch relative text-gray-600 hover:text-black"
              >
                ・顧客の質問への返答生成
              </button>
              <button
                onClick={handleClick(buttonTexts.compareProducts)}
                className="cursor-pointer [border:none] p-0 bg-[transparent] text-left self-stretch relative text-gray-600 hover:text-black"
              >
                ・競合製品との比較
              </button>
              <button
                onClick={handleClick(buttonTexts.presentationSummary)}
                className="cursor-pointer [border:none] p-0 bg-[transparent] text-left self-stretch relative text-gray-600 hover:text-black"
              >
                ・プレゼンテーション概要の作成
              </button>
              <button
                onClick={handleClick(buttonTexts.updateFAQ)}
                className="cursor-pointer [border:none] p-0 bg-[transparent] text-left self-stretch relative text-gray-600 hover:text-black"
              >
                ・FAQセクションの更新
              </button>
              <button
                onClick={handleClick(buttonTexts.salesStrategy)}
                className="cursor-pointer [border:none] p-0 bg-[transparent] text-left self-stretch relative text-gray-600 hover:text-black"
              >
                ・販売戦略の提案
              </button>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-[16px]">
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[10px] relative h-[21px] bg-[url('/public/image-31@3x.png')] bg-cover bg-no-repeat bg-[top]" />
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-lg font-inter text-black text-left inline-block">
                マーケティング部
              </button>
            </div>
            <div className="relative">3件</div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-[16px]">
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[10px] relative h-[21px] bg-[url('/public/image-31@3x.png')] bg-cover bg-no-repeat bg-[top]" />
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-lg font-inter text-black text-left inline-block">
                情報システム部
              </button>
            </div>
            <div className="relative">1件</div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-[16px]">
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[10px] relative h-[21px] bg-[url('/public/image-31@3x.png')] bg-cover bg-no-repeat bg-[top]" />
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-lg font-inter text-black text-left inline-block">
                経理部
              </button>
            </div>
            <div className="relative">1件</div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-[16px]">
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[10px] relative h-[21px] bg-[url('/public/image-31@3x.png')] bg-cover bg-no-repeat bg-[top]" />
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-lg font-inter text-black text-left inline-block">
                法務部
              </button>
            </div>
            <div className="relative">4件</div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-[16px]">
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[10px] relative h-[21px] bg-[url('/public/image-31@3x.png')] bg-cover bg-no-repeat bg-[top]" />
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-lg font-inter text-black text-left inline-block">
                人事部
              </button>
            </div>
            <div className="relative">6件</div>
          </div>
        </div>
      )}
      {activeButton === "data" && (
        <div className="self-stretch flex flex-col items-start justify-start gap-[16px] p-4">
          参照データ：
          <br />
          <br />
          XXXX
        </div>
      )}
    </div>
  );
};

export default Leftbar;
