import { FunctionComponent, useState, useEffect } from "react";
import Header from "../components/Header";
import Leftbar from "../components/Leftbar";
import Center from "../components/Center";
import Rightbar from "../components/Rightbar";
import Subheader from "../components/Subheader";
import { useTheme } from "@mui/material/styles";
import { Drawer, useMediaQuery } from "@mui/material";

import { DefaultApi } from "../api-client";

const Desktop = () => {
  const [selectedText, setSelectedText] = useState("");
  const [isLeftbarOpen, setIsLeftbarOpen] = useState<boolean>(false);
  const [isRightbarOpen, setIsRightbarOpen] = useState<boolean>(false);
  const [text, setText] = useState("商談反省");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (matches) {
      setIsLeftbarOpen(false);
    } else {
      setIsLeftbarOpen(true);
    }
  }, [matches]);

  useEffect(() => {
    if (matches) {
      setIsRightbarOpen(false);
    } else {
      setIsRightbarOpen(true);
    }
  }, [matches]);

  return (
    <div className="overflow-hidden h-[100vh] w-full relative bg-white flex flex-col items-start justify-start">
      <Header />
      <div className="self-stretch flex flex-row items-start justify-between">
        <Leftbar setSelectedText={setSelectedText} setIsLeftbarOpen={setIsLeftbarOpen} isLeftbarOpen={isLeftbarOpen} />
        <div className="self-stretch grow flex-col">
          <Subheader setText={setText} text={text} />
          <Center
            selectedText={selectedText}
            setSelectedText={setSelectedText}
            setIsLeftbarOpen={setIsLeftbarOpen}
            isLeftbarOpen={isLeftbarOpen}
            setIsRightbarOpen={setIsRightbarOpen}
            isRightbarOpen={isRightbarOpen}
          />
        </div>
        <Rightbar text={text} setIsRightbarOpen={setIsRightbarOpen} isRightbarOpen={isRightbarOpen} />
      </div>
    </div>
  );
};

export default Desktop;
