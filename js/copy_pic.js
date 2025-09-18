const targetElement = document.getElementById('myTable');
const scale = 2;

// 判斷 iOS / Android
function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}


//等待圖片載入的工具函式
async function waitForImagesLoaded(element) {
  const imgElements = element.querySelectorAll('img');
  const promises = [];
  imgElements.forEach(img => {
    if (!img.complete || img.naturalWidth === 0) {
      promises.push(new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      }));
    }
  });
  return Promise.all(promises);
}

// iOS 專用：生成圖片 → 長按複製
async function captureAndShowImage() {
  try {
    document.getElementById('floating-buttons').style.display = 'none';
    document.getElementById('side-buttons').style.display = 'none';
    showLoading();

    const targetElement = document.getElementById("myTable");
    await waitForImagesLoaded(targetElement);
    await new Promise(resolve => requestAnimationFrame(resolve));
    hideLoading();

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

// Android / 桌機：直接複製圖片
async function captureAndCopyToClipboard() {
  try {
    const targetElement = document.getElementById("myTable");
    await waitForImagesLoaded(targetElement);
    await new Promise(resolve => requestAnimationFrame(resolve));
    
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
    
    const blob = await domtoimage.toBlob(targetElement, options);

    if (!navigator.clipboard || !window.ClipboardItem) {
      throw new Error('Clipboard API 不支援');
    }

    const clipboardItem = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([clipboardItem]);
    showToast('圖片已成功複製到剪貼簿！');
  } catch (error) {
    console.error('無法複製圖片到剪貼簿：', error);
    showToast('此瀏覽器不支援複製圖片功能');
    throw error;
  }
}

// 綁定複製按鈕
document.getElementById('copy_pic').addEventListener('click', async () => {
  if (isIOS()) {
    captureAndShowImage();
  } else if (isAndroid()) {
    try {
      if (!navigator.clipboard || !window.ClipboardItem) {
        throw new Error("Clipboard API 不支援");
      }
      await captureAndCopyToClipboard();
    } catch (err) {
      console.warn("Android 複製失敗，改用圖片長按方式", err);
      captureAndShowImage();
    }
  } else {
    captureAndCopyToClipboard();
  }
});

// 綁定下載按鈕
document.getElementById('download_pic').addEventListener('click', async function () {
  if (isIOS()) {
    captureAndShowImage();
    return;
  }

  const node = document.getElementById('myTable');
  const nodeWidth = node.offsetWidth * scale;
  const nodeHeight = node.offsetHeight * scale;

  try {
    const dataUrl = await domtoimage.toPng(node, {
      width: nodeWidth,
      height: nodeHeight,
      style: {
        transform: 'scale(4)',
        transformOrigin: 'top left'
      }
    });

    const link = document.createElement('a');
    if ('download' in link) {
      // ✅ 支援 a.download → 直接下載
      link.download = 'myTable.png';
      link.href = dataUrl;
      link.click();
    } else {
      throw new Error("不支援 a.download");
    }
  } catch (err) {
    console.warn("下載失敗，改用圖片長按方式", err);
    captureAndShowImage(); // fallback
  }
});

// 關閉預覽
document.getElementById('close-preview').addEventListener('click', () => {
  document.getElementById('preview-overlay').style.display = 'none';
  document.getElementById('floating-buttons').style.display = 'none';
  document.getElementById('side-buttons').style.display = 'flex';
});


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

function showLoading(message = '生成圖片中...') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.display = 'block';
  toast.style.opacity = 1;
}

function hideLoading() {
  const toast = document.getElementById('toast');
  toast.style.opacity = 0;
  setTimeout(() => { toast.style.display = 'none'; }, 300);
}