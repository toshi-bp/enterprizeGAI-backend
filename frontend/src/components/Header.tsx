import { FunctionComponent, useState } from "react";
import { Drawer } from "@mui/material";
import DrawerMenu from "./DrawerMenu";

const Header: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className=" self-stretch flex flex-row items-center justify-between py-4 h-[10vh] px-[23px] text-left text-xl text-darkslategray font-inter border-b-[1px] box-border border-solid border-lightgray-100">
      <img
        className="w-auto relative h-10 object-cover"
        alt=""
        src="/image-8@2x.png"
      />
      <div className="flex flex-row box-border items-center justify-center gap-[34px]">
        <div className="rounded-mini bg-whitesmoke overflow-hidden flex flex-row items-start justify-start py-[5px] px-5 gap-[10px] md:hidden">
          <input
            className="[border:none] [outline:none] font-inter text-sm bg-[transparent] w-[150px] relative text-dimgray text-left inline-block shrink-0"
            placeholder="Search"
            type="text"
          />
          <img className="w-5 relative h-[17px]" alt="" src="/union.svg" />
        </div>
        <div className=" relative inline-block shrink-0 md:hidden">
          伊藤　大地
        </div>
        <img
          className="w-[31px] relative rounded-2xs h-[31px] object-cover md:hidden"
          alt=""
          src="/202011070001493w500-0-2@2x.png"
        />
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] h-[42px] w-[42px] relative bg-[url('/public/image-10@3x.png')] bg-cover bg-no-repeat bg-[top] hidden md:flex"
          onClick={() => setIsOpen(true)}
        />
        <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
          <DrawerMenu closeDrawer={() => setIsOpen(false)} />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
