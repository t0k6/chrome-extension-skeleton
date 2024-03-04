// This script handles the saving and loading of options for the Chrome extension.
// このスクリプトは、Chrome拡張機能のオプションの保存と読み込みを扱います。

// chrome.storage を使用するには、manifest.json に "storage" パーミッションを追加する必要があります。

// Saves options to chrome.storage
// オプションをchrome.storageに保存します
function saveOptions() {
  var backgroundColor = document.getElementById('background-color').value;
  chrome.storage.sync.set({
    backgroundColor: backgroundColor
  }, function() {
    // Update status to let user know options were saved.
    // ステータスを更新して、ユーザーにオプションが保存されたことを知らせます。
    var status = document.createElement('div');
    status.textContent = 'Options saved.';
    document.body.appendChild(status);
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences stored in chrome.storage.
// chrome.storageに保存された設定を使用して、セレクトボックスとチェックボックスの状態を復元します。
function restoreOptions() {
  // Use default value color = '#FFFFFF' as white
  // デフォルト値の色を白として '#FFFFFF' を使用します
  chrome.storage.sync.get({
    backgroundColor: '#FFFFFF'
  }, function(items) {
    document.getElementById('background-color').value = items.backgroundColor;
  });
}

// Event listeners
// イベントリスナー
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('options-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting normally // 通常の送信を防ぎます
  saveOptions();
});
