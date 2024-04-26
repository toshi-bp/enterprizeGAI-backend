import { useState, useEffect, useCallback, useRef } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import Desktop from "./pages/Desktop";

import Header from "./components/Header";
import Leftbar from "./components/Leftbar";
import Center from "./components/Center";
import Rightbar from "./components/Rightbar";
import Subheader from "./components/Subheader";
import { useTheme } from "@mui/material/styles";
import { Drawer, useMediaQuery } from "@mui/material";

import { DefaultApi, Configuration } from "./api-client";

const config = new Configuration({
  // TODO: 開発用
  basePath: "http://localhost:8000",
});
export const apiClient = new DefaultApi(config);

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  const [selectedText, setSelectedText] = useState("");
  const [isLeftbarOpen, setIsLeftbarOpen] = useState<boolean>(false);
  const [isRightbarOpen, setIsRightbarOpen] = useState<boolean>(false);
  const [text, setText] = useState("商談反省");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector('head > meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  useEffect(() => {
    setIsLeftbarOpen(false);
    // if (matches) {
    //   setIsLeftbarOpen(false);
    // } else {
    //   setIsLeftbarOpen(true);
    // }
  }, [matches]);

  useEffect(() => {
    setIsRightbarOpen(false);
    // if (matches) {
    //   setIsRightbarOpen(false);
    // } else {
    //   setIsRightbarOpen(true);
    // }
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
    // <Routes>
    //   <Route path="/" element={<Desktop />} />
    // </Routes>
  );
}
export default App;
