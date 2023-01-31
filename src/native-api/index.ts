import { dialog } from "@tauri-apps/api";
import { invoke } from "@tauri-apps/api/tauri";

export const invokeBackend = <T>(api: string, args?: any): Promise<T> => {
  return invoke(api, args);
}

export const showOpenFileDialog = () => {
  return dialog.open({
    filters: [{ name: 'exe', extensions: ['exe'] }],
    multiple: false,
  }).then(path => {
    if (Array.isArray(path)) {
      return path[0];
    }
    return path;
  });
}


