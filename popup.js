document.addEventListener('DOMContentLoaded', function() {
    var triggerActionButton = document.getElementById('triggerAction');
    var openOptionsButton = document.getElementById('openOptions');

    // Event listener for the trigger action button
    // トリガーアクションボタンのイベントリスナー
    triggerActionButton.addEventListener('click', function() {
        // Example of sending a message to the background script
        // バックグラウンドスクリプトにメッセージを送信する例
        chrome.runtime.sendMessage({action: "triggerAction"}, function(response) {
            console.log("Action triggered", response);
        });
    });

    // Event listener for the open options button
    // オプションボタンを開くためのイベントリスナー
    openOptionsButton.addEventListener('click', function() {
        if (chrome.runtime.openOptionsPage) {
            // New way to open options pages, if supported (Chrome 42+).
            // オプションページを開く新しい方法、サポートされている場合 (Chrome 42+)
            chrome.runtime.openOptionsPage();
        } else {
            // Reasonable fallback.
            // 妥当なフォールバック
            window.open(chrome.runtime.getURL('options.html'));
        }
    });

    // Example of adding a right-click context menu action
    // Note: This is just a placeholder. Actual context menu creation should be done in background.js or contextMenu.js
    // 右クリックのコンテキストメニューアクションを追加する例
    // 注意: これは単なるプレースホルダーです。実際のコンテキストメニューの作成はbackground.jsまたはcontextMenu.jsで行うべきです
    // chrome.contextMenus.create({
    //     title: "コンテキストメニュー例", // "Example Context Menu",
    //     contexts:["selection"],  // ContextType
    //     onclick: function() { console.log("コンテキストメニュー項目がクリックされました"); // "Context menu item clicked" }
    // });

    // Example of calling a function that runs in a background worker
    // Note: This is just a placeholder. Actual implementation depends on your background worker setup
    // バックグラウンドワーカーで実行される関数を呼び出す例
    // 注意: これは単なるプレースホルダーです。実際の実装はバックグラウンドワーカーの設定に依存します
    // chrome.runtime.sendMessage({action: "callBackgroundWorker"}, function(response) {
    //     console.log("バックグラウンドワーカーからの応答", response); // "Background worker response", response
    // });
});
