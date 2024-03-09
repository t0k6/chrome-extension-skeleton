// content.js

// This script runs in the context of web pages.
// このスクリプトはウェブページのコンテキストで実行されます。

// Listen for messages from the background script
// バックグラウンドスクリプトからのメッセージを待ち受けます
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "performContextMenuAction") {
        // Perform the action triggered by the context menu
        // コンテキストメニューによってトリガーされたアクションを実行します
        performAction();
        sendResponse({result: "action performed"});
    }
    if (message.action === "callCurrentActiveTabFunction") {
        // Perform the action triggered by the context menu
        // コンテキストメニューによってトリガーされたアクションを実行します
        performAction();
        sendResponse({result: "action performed"});
    }
});

// Example function to demonstrate an action performed by the content script
// コンテンツスクリプトによって実行されたアクションを示す例示関数
function performAction() {
    console.log("Context menu action performed by content script.");
    alert("Context menu action performed by content script.");
    // You can manipulate the DOM of the current page here. For example:
    // ここで現在のページのDOMを操作できます。例えば：
    // document.body.style.backgroundColor = "yellow";
}

// This function could be used to send messages to the background script if needed
// 必要に応じて、この関数を使用してバックグラウンドスクリプトにメッセージを送信できます
function sendMessageToBackground() {
    chrome.runtime.sendMessage({action: "callBackgroundFunction"}, (response) => {
        console.log("Received response from background:", response);
    });
}

// Example of using sendMessageToBackground function
// sendMessageToBackground関数の使用例
// Uncomment the line below to use it
// それを使用するには、以下の行のコメントを解除してください
// sendMessageToBackground();
