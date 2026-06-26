//AI寫的功能
// script.js

document.getElementById('run').addEventListener('click', function() {
    // 顯示表單和背景
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
});

document.getElementById('close-form').addEventListener('click', function() {
    // 關閉表單和背景
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});

// 點擊背景關閉表單
document.getElementById('overlay').addEventListener('click', function(event) {
    // 檢查是否點擊背景區域，而非表單
    if (event.target === this) {
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }
});
