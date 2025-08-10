const targetElement = document.getElementById('myTable');
const scale = 4;

// 判斷是否為手機裝置（iOS 或 Android）
function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// 行動裝置：顯示圖片供長按操作
async function captureAndShowImage() {
  try {
    // ✅ 預覽前隱藏浮動按鈕 & 功能按鈕
    document.getElementById('floating-buttons').style.display = 'none';
    document.getElementById('side-buttons').style.display = 'none';

    const targetElement = document.getElementById("myTable"); // ← 每次重新抓
    await new Promise(resolve => setTimeout(resolve, 100)); 
    const nodeWidth = targetElement.offsetWidth;
    const nodeHeight = targetElement.offsetHeight;

    const options = {
      width: nodeWidth * scale,
      height: nodeHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${nodeWidth}px`,
        height: `${nodeHeight}px`,
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      },
      quality: 1,
    };

    const dataUrl = await domtoimage.toPng(targetElement, options);

    const img = new Image();
    img.src = dataUrl;
    img.alt = "預覽圖片";

    const overlay = document.getElementById('preview-overlay');
    const content = document.getElementById('preview-content');

    content.innerHTML = '<p>請長按圖片以複製或儲存：</p>';
    content.appendChild(img);

    overlay.style.display = 'flex';
  } catch (error) {
    console.error('無法生成圖片：', error);
  }
}

//提示訊息
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.opacity = 1;
  }, 10);

  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => {
      toast.style.display = 'none';
    }, 500);
  }, duration);
}

// 桌機：使用 Clipboard API 複製圖片
async function captureAndCopyToClipboard() {
  try {
    const targetElement = document.getElementById("myTable"); // ← 每次重新抓
    const nodeWidth = targetElement.offsetWidth;
    const nodeHeight = targetElement.offsetHeight;

    const options = {
      width: nodeWidth * scale,
      height: nodeHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${nodeWidth}px`,
        height: `${nodeHeight}px`,
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      },
      quality: 1,
    };
    
    await new Promise(resolve => requestAnimationFrame(resolve));
    const blob = await domtoimage.toBlob(targetElement, options);

    if (!navigator.clipboard || !window.ClipboardItem) {
      throw new Error('Clipboard API 不支援');
    }

    const clipboardItem = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([clipboardItem]);
    //alert('圖片已成功複製到剪貼簿！');
    showToast('圖片已成功複製到剪貼簿！');
  } catch (error) {
    console.error('無法複製圖片到剪貼簿：', error);
    //alert('此瀏覽器不支援複製圖片功能');
    showToast('此瀏覽器不支援複製圖片功能');
  }
}

// 綁定複製按鈕
document.getElementById('copy_pic').addEventListener('click', () => {
  if (isMobile()) {
    captureAndShowImage();
  } else {
    captureAndCopyToClipboard();
  }
});

// 綁定下載按鈕（所有裝置通用）
document.getElementById('download_pic').addEventListener('click', function () {
  if (isMobile()) {
    captureAndShowImage(); // ✅ 行動裝置顯示預覽取代直接下載
    return;
  }

  // 電腦版正常下載流程
  const node = document.getElementById('myTable');
  const nodeWidth = node.offsetWidth * scale;
  const nodeHeight = node.offsetHeight * scale;

  setTimeout(function () {
    domtoimage.toPng(node, {
      width: nodeWidth,
      height: nodeHeight,
      style: {
        transform: 'scale(4)',
        transformOrigin: 'top left'
      }
    }).then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = 'myTable.png';
      link.href = dataUrl;
      link.click();
    }).catch(function (error) {
      console.error('截圖失敗', error);
    });

    node.style.transform = '';
  }, 500);
});

document.getElementById('close-preview').addEventListener('click', () => {
  document.getElementById('preview-overlay').style.display = 'none';

    // ✅ 關閉預覽後恢復浮動按鈕 & 功能按鈕
  document.getElementById('floating-buttons').style.display = 'none';
  document.getElementById('side-buttons').style.display = 'flex';
});