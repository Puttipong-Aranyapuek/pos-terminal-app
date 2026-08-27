import { contextBridge } from "electron";

import type { PosDesktopInterface } from "../shared/pos-desktop-interface";

const posDesktopInterface: PosDesktopInterface = Object.freeze({
  platform: process.platform,
});

contextBridge.exposeInMainWorld("posDesktop", posDesktopInterface);
