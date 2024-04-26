import { useCallback, useEffect, useRef, useState } from "react";

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
