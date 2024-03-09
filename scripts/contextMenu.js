// contextMenu.js

// This script is responsible for defining additional context menu items and their behaviors.
// このスクリプトは、追加のコンテキストメニューアイテムとその動作を定義します。

// Since the actual creation and listening of the context menu items are handled in background.js,
// this script will focus on defining utility functions that can be called from background.js.
// 実際のコンテキストメニューアイテムの作成と監視はbackground.jsで行われるため、
// このスクリプトではbackground.jsから呼び出せるユーティリティ関数を定義することに集中します。

// Function to add a new context menu item.
// 新しいコンテキストメニューアイテムを追加する関数です。
function addContextMenu() {
  chrome.contextMenus.create({
    id: "additionalContextMenu",
    title: "Additional Context Menu",
    contexts: ["all"],
  }, () => {
    if (chrome.runtime.lastError) {
      console.error(`コンテキストメニューの作成エラー: ${chrome.runtime.lastError}`);
    } else {
      console.log("追加のコンテキストメニューが正常に作成されました");
    }
  });
}

// Function to remove an existing context menu item.
// 既存のコンテキストメニューアイテムを削除する関数です。
function removeContextMenu(menuItemId) {
  chrome.contextMenus.remove(menuItemId, () => {
    if (chrome.runtime.lastError) {
      console.error(`コンテキストメニューの削除エラー: ${chrome.runtime.lastError}`);
    } else {
      console.log(`ID ${menuItemId} のコンテキストメニューが正常に削除されました。`);
    }
  });
}

// Function to update an existing context menu item.
// 既存のコンテキストメニューアイテムを更新する関数です。
function updateContextMenu(menuItemId, updateProperties) {
  chrome.contextMenus.update(menuItemId, updateProperties, () => {
    if (chrome.runtime.lastError) {
      console.error(`コンテキストメニューの更新エラー: ${chrome.runtime.lastError}`);
    } else {
      console.log(`ID ${menuItemId} のコンテキストメニューが正常に更新されました。`);
    }
  });
}

// Export the functions to be used in background.js or other parts of the extension.
// Note: Since manifest V3 does not support directly including scripts in the background service worker,
// these functions need to be invoked indirectly, e.g., through messaging.
// これらの関数をbackground.jsや拡張機能の他の部分で使用するためにエクスポートします。
// 注意: manifest V3では、バックグラウンドサービスワーカーに直接スクリプトを含めることはサポートされていません。
// これらの関数は間接的に、例えばメッセージングを通じて呼び出す必要があります。

export { addContextMenu, removeContextMenu, updateContextMenu };
