import { invoke } from "@tauri-apps/api/tauri";

export const invokeBackend = <T>(api: string, args: any): Promise<T> => {
  return invoke(api, args);
}


