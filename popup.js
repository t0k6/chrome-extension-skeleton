document.addEventListener('DOMContentLoaded', function() {
    var triggerActionButton = document.getElementById('triggerAction');
    var openOptionsButton = document.getElementById('openOptions');

    // Event listener for the trigger action button
    // トリガーアクションボタンのイベントリスナー
    triggerActionButton.addEventListener('click', function() {
        // Example of sending a message to the background script
        // バックグラウンドスクリプトにメッセージを送信する例
        // chrome.runtime.sendMessage({action: "triggerAction"}, (response) => {
        //     console.log("Action triggered", response);
        // });

        // Example of calling a function that runs in a background worker
        // バックグラウンドワーカーで実行される関数を呼び出す例
        chrome.runtime.sendMessage({action: "callBackgroundFunction"}, (response) => {
            console.log("Background function response", response);
            alert("Background function response: " + response.result);
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

});
