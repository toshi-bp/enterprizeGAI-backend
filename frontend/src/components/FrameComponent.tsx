import { FunctionComponent, useEffect } from "react";

export type FrameComponentType = {
  onClose?: () => void;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({ onClose }) => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  return (
    <div
      className="w-[390px] h-full flex flex-row items-start justify-center [&.animate]:animate-[0.25s_ease_0s_1_normal_forwards_slide-in-right] opacity-[0] max-w-[90%] overflow-auto"
      data-animate-on-scroll
    >
      <div
        className="h-[844px] flex-1 bg-white overflow-hidden flex flex-row items-start justify-center [&.animate]:animate-[0.25s_ease_0s_1_normal_forwards_slide-in-top] opacity-[0] w-full max-h-[90%]"
        data-animate-on-scroll
      >
        <div className="self-stretch flex-1 flex flex-col items-center justify-between py-[60px] px-0">
          <div className="flex flex-col items-center justify-start gap-[40px]">
            <div className="self-stretch h-[31px] flex flex-row items-start justify-center gap-[40px]">
              <img
                className="w-[31px] relative rounded-2xs h-[31px] object-cover md:hidden"
                alt=""
                src="/202011070001493w500-0-2@2x.png"
              />
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-lg leading-[24px] font-bold font-noto-sans-jp text-black text-left inline-block">
                伊藤大地
              </button>
            </div>
            <div className="rounded-mini bg-whitesmoke h-[47px] overflow-hidden shrink-0 flex flex-row items-start justify-center py-[15px] px-5 box-border gap-[10px] md:hidden">
              <input
                className="[border:none] [outline:none] font-inter text-sm bg-[transparent] w-[150px] relative text-dimgray text-left inline-block shrink-0"
                placeholder="Search"
                type="text"
              />
              <img className="w-5 relative h-[17px]" alt="" src="/union.svg" />
            </div>
          </div>
          <button
            className="cursor-pointer [border:none] p-0 bg-[transparent] w-[30px] relative h-[30px] bg-[url('/public/-1@3x.png')] bg-cover bg-no-repeat bg-[top]"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
