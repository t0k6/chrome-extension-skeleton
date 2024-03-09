document.addEventListener('DOMContentLoaded', function() {

    // Event listener for the trigger action button
    // トリガーアクションボタンのイベントリスナー
    document.getElementById('triggerAction1').addEventListener('click', () => {
        // Example of sending a message to the background script
        // バックグラウンドスクリプトにメッセージを送信する例
        // chrome.runtime.sendMessage({action: "triggerAction"}, (response) => {
        //     console.log("Action triggered", response);
        // });

        // Example of calling a function that runs in a background worker
        // バックグラウンドワーカーで実行される関数を呼び出す例
        chrome.runtime.sendMessage({action: "callBackgroundFunction"}, (response) => {
            if (chrome.runtime.lastError) {
                console.log("Error: ", chrome.runtime.lastError);
            } else {
                console.log("Background function response", response);
            }
        });
    });

    document.getElementById('triggerAction2').addEventListener('click', () => {
        // 現在のアクティブなタブに対してメッセージを送る例
        sendMessageToCurrentActiveTab({ action: "callCurrentActiveTabFunction" }, (response) => {
            if (chrome.tabs.lastError) {
                console.log("Error: ", chrome.tabs.lastError);
            } else {
                console.log("Tab function response", response);
            }
        });
    });

    var sendMessageToCurrentActiveTab = (message, func) => {
        // 現在のアクティブなタブに対してメッセージを送る
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
                func(response);
            });
        });
    }

    // Event listener for the open options button
    // オプションボタンを開くためのイベントリスナー
    document.getElementById('openOptions').addEventListener('click', () => {
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
