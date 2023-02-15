#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use windows::{
    Win32::Foundation::{BOOL, HWND, LPARAM},
    Win32::UI::WindowsAndMessaging::{
        EnumWindows, GetWindowInfo, GetWindowTextW, WINDOWINFO, WS_VISIBLE,
    },
};
use tokio::process::Command;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    unsafe {
        let res = EnumWindows(Some(enum_window), LPARAM(0)).ok();
    }
    return format!("Hello, {}! You've been greeted from Rust!", name);
}

#[tauri::command]
async fn run(path: &str) -> Result<(), ()> {
    println!("start run");
    let mut child = Command::new(path).spawn().unwrap();
    let res = child.wait().await;
    println!("after await");
    Ok(())
}

extern "system" fn enum_window(window: HWND, _: LPARAM) -> BOOL {
    unsafe {
        let mut text: [u16; 512] = [0; 512];
        let len = GetWindowTextW(window, &mut text);
        let text = String::from_utf16_lossy(&text[..len as usize]);

        let mut info = WINDOWINFO {
            cbSize: core::mem::size_of::<WINDOWINFO>() as u32,
            ..Default::default()
        };
        GetWindowInfo(window, &mut info).unwrap();

        if !text.is_empty() && info.dwStyle & WS_VISIBLE.0 != 0 {
            println!("{} ({}, {})", text, info.rcWindow.left, info.rcWindow.top);
        }

        true.into()
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, run])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
