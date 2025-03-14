document.getElementById("share_pic").addEventListener("click", function () {
    let target = document.getElementById("myTable"); // 你的 table 容器

    // 設定生成圖片時的倍率（放大兩倍）
const scale = 4;


    // 取得目標元素的實際寬高
    const nodeWidth = target.offsetWidth;
    const nodeHeight = target.offsetHeight;

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

    domtoimage.toBlob(target, options).then(function (blob) {
        let file = new File([blob], "ticket.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            // 使用 Web Share API 分享
            navigator.share({
                files: [file],
                title: "電子票券",
                text: "這是你的電子票券，請查收。",
            }).catch(console.error);
        } else {
            // Web Share API 不支持時，使用 LINE intent 分享
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                let base64data = reader.result.split(",")[1]; // 取出 base64 部分
                let lineUrl = `https://social-plugins.line.me/lineit/share?url=data:image/png;base64,${base64data}`;
                window.open(lineUrl, "_blank");
            };
        }
    });
});
