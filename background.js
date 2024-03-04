// background.js

// This script runs in the background and listens for messages from other parts of the extension.
// このスクリプトはバックグラウンドで実行され、拡張機能の他の部分からのメッセージを待ち受けます。

chrome.runtime.onInstalled.addListener(() => {
  // Create a right-click context menu for all content.
  // 全てのコンテンツに対して右クリックのコンテキストメニューを作成します。
  chrome.contextMenus.create({
    id: "sampleContextMenu",
    title: "Sample Context Menu",
    contexts: ["all"],
  });
});

// Listen for clicks on the context menu.
// コンテキストメニューのクリックを待ち受けます。
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sampleContextMenu") {
    // Send a message to the content script.
    // コンテンツスクリプトにメッセージを送信します。
    chrome.tabs.sendMessage(tab.id, { action: "performContextMenuAction" });
  }
});

// Listen for messages from the popup or options page.
// ポップアップまたはオプションページからのメッセージを待ち受けます。
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "callBackgroundFunction") {
    // Perform some background task here.
    // ここで何かバックグラウンドタスクを実行します。
    performBackgroundTask();
    sendResponse({ result: "Background task completed" });
  }
});

// Example background task function.
// バックグラウンドタスク関数の例。
function performBackgroundTask() {
  console.log("Performing background task...");
  // Add your background task code here.
  // ここにバックグラウンドタスクのコードを追加します。
}

// This function demonstrates how to use a background worker.
// この関数はバックグラウンドワーカーの使用方法を示しています。
function useBackgroundWorker() {
  const worker = new Worker('worker.js');
  worker.postMessage('Start working');

  worker.onmessage = function(event) {
    console.log('Received message from worker:', event.data);
    // Handle messages received from the worker here
    // ここでワーカーから受け取ったメッセージを処理します。
  };

  // Remember to terminate the worker when it's no longer needed
  // ワーカーが不要になったら終了させることを忘れないでください
  // worker.terminate();
}

// Uncomment the following line to use the background worker function.
// バックグラウンドワーカー関数を使用するには、以下の行のコメントを解除してください。
// useBackgroundWorker();
