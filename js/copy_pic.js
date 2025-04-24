// 要截圖的目標元素
const targetElement = document.getElementById('myTable');

// 設定生成圖片時的倍率（放大兩倍）
const scale = 4;

// 截圖並放入剪貼簿
async function captureAndCopyToClipboard() {
  try {
    // 取得目標元素的實際寬高
    const nodeWidth = targetElement.offsetWidth;
    const nodeHeight = targetElement.offsetHeight;

    // 設定 dom-to-image 的選項
    const options = {
      width: nodeWidth * scale, // 放大寬度
      height: nodeHeight * scale, // 放大高度
      style: {
        transform: `scale(${scale})`, // 縮放比例
        transformOrigin: 'top left', // 縮放基準
        width: `${nodeWidth}px`, // 原始寬度
        height: `${nodeHeight}px`, // 原始高度
        margin: 0, // 去除外邊距
        padding: 0, // 去除內邊距
        boxSizing: 'border-box' // 確保寬度計算包含邊框與內邊距
      },
      quality: 1, // 確保最高品質
    };

    // 使用 dom-to-image 生成高解析度圖片 Blob
    const blob = await domtoimage.toBlob(targetElement, options);

    // 確保瀏覽器支援 Clipboard API
    if (!navigator.clipboard || !window.ClipboardItem) {
      throw new Error('Clipboard API 或 ClipboardItem 不受支援');
    }

    // 將 Blob 包裝為 ClipboardItem
    const clipboardItem = new ClipboardItem({ 'image/png': blob });

    // 將圖片寫入剪貼簿
    await navigator.clipboard.write([clipboardItem]);

    //alert('圖片已成功複製到剪貼簿！');
  } catch (error) {
    console.error('無法複製圖片到剪貼簿：', error);
  }
}

// 綁定按鈕點擊事件
document.getElementById('copy_pic').addEventListener('click', captureAndCopyToClipboard);



        // 監聽按鈕點擊事件
        //下載圖片
        document.getElementById('download_pic').addEventListener('click', function() {
          // 目標區域
          var node = document.getElementById('myTable');     

        // 設定生成圖片時的寬高
        var nodeWidth = node.offsetWidth * 4; // 放大兩倍
        var nodeHeight = node.offsetHeight * 4; // 放大兩倍
      
        // 等待縮放效果完成後再進行截圖
        //id要放在div裡，不然會有放大錯誤
      setTimeout(function() {
        // 使用 dom-to-image 生成圖片，並設置更高的解析度（scale）
        domtoimage.toPng(node, {
          //設定canvas的長寬
          width: nodeWidth,
          height: nodeHeight,
          //設定票券的比例
          style: {
              'transform': 'scale(4)',
              'transform-origin': 'top left'
          }
      })
          .then(function(dataUrl) {
            // 創建一個圖片元素
            var img = new Image();
            img.src = dataUrl;

            // 將圖片顯示在頁面上
            //document.body.appendChild(img);

            // 或者可以下載圖片，創建下載鏈接
            var link = document.createElement('a');
            link.download = 'myTable.png';
            link.href = dataUrl;
            link.click();
          })
          .catch(function(error) {
            console.error('截圖失敗', error);
          });

        // 截圖後將 CSS scale 還原
        node.style.transform = ''; // 還原縮放
      }, 500); // 等待縮放過程（過渡效果）完成，這裡設置為 500 毫秒
    });