import React from "react";
import Header from "./Header";

interface DrawerMenuProps {
  closeDrawer: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ closeDrawer }) => {
  return (
    <React.Fragment>
      <div className="w-60 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              className="w-[31px] relative rounded-2xs h-[31px] object-cover "
              alt=""
              src="/202011070001493w500-0-2@2x.png"
            />
            <div>伊藤　大地</div>
          </div>
          <button
            className="cursor-pointer h-4 w-4 bg-[url('/public/cross.png')] bg-cover bg-no-repeat bg-white"
            onClick={closeDrawer}
          />
        </div>
        <div className="my-10 pr-4 rounded-mini bg-whitesmoke overflow-hidden flex flex-row items-center justify-start py-[5px] px-5 gap-[10px] ">
          <input
            className="[border:none] [outline:none] font-inter text-sm bg-[transparent] w-[150px] relative text-dimgray text-left inline-block shrink-0"
            placeholder="Search"
            type="text"
          />
          <img className="w-5 relative h-8" alt="" src="/union.svg" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DrawerMenu;
