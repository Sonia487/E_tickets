document.getElementById("batchGenerate").addEventListener("click", async () => {
    const fileInput = document.getElementById("excelUpload");
    if (!fileInput.files.length) {
        alert("請先選擇 Excel 檔案");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const ref = worksheet['!ref'];
        const range = ref.split(':');
        const lastRow = range[1] ? range[1].match(/\d+/) : [1];
        const lastRowNum = lastRow ? parseInt(lastRow[0]) : 1;

        const filteredRange = { s: { r: 0, c: 0 }, e: { r: lastRowNum - 1, c: 5 } };
        const filteredWorksheet = XLSX.utils.sheet_to_json(worksheet, { range: filteredRange });

        if (filteredWorksheet.length === 0) {
            alert("Excel 檔案內容為空");
            return;
        }

        console.log("解析 Excel：", filteredWorksheet);
        await generateTickets(filteredWorksheet);
    };

    reader.readAsArrayBuffer(file);

    async function generateTickets(data) {
        const zip = new JSZip();
        const ticketContainer = document.getElementById("myTable");

        const fileNames = new Map(); // 用來追蹤已使用的檔名

        for (let i = 0; i < data.length; i++) {
            const row = data[i];

            document.getElementById("client").innerHTML = formatText(row["旅客/電話"] || "");
            document.getElementById("tour-detail").innerHTML = formatText(row["日期/行程/人數"] || "");
            document.getElementById("time").innerHTML = formatText(row["報到/開始時間"] || "");
            document.getElementById("t-provider").innerHTML = formatText(row["行程業者"] || "");
            document.getElementById("checkin-add").innerHTML = formatText(row["報到地點"] || "");
            document.getElementById("ps").innerHTML = formatText(row["備註"] || "");

            await new Promise(resolve => setTimeout(resolve, 500));

            const clientName = getClientName(row["旅客/電話"]);
            const tourName = sanitizeFileName(row["日期/行程/人數"] || "旅遊行程");
            let ticketFileName = `${clientName}_${tourName}.png`;

            // 檢查檔名是否已存在，若重複則加數字
            let count = fileNames.get(ticketFileName) || 0;
            if (count > 0) {
                count++;
                ticketFileName = `${clientName}_${tourName}_第${count}張.png`;
            }
            fileNames.set(ticketFileName, count + 1);

            const nodeWidth = ticketContainer.offsetWidth * 4;
            const nodeHeight = ticketContainer.offsetHeight * 4;

            const dataUrl = await new Promise((resolve, reject) => {
                domtoimage.toPng(ticketContainer, {
                    width: nodeWidth,
                    height: nodeHeight,
                    style: {
                        'transform': 'scale(4)',
                        'transform-origin': 'top left'
                    }
                }).then(resolve).catch(reject);
            });

            zip.file(ticketFileName, dataUrl.split(",")[1], { base64: true });
        }

        zip.generateAsync({ type: "blob" }).then((content) => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(content);
            a.download = "tickets.zip";
            a.click();
        });
    }

    function formatText(text) {
        return text ? String(text).replace(/\r?\n/g, "<br>") : "";
    }
    

    function getClientName(clientInfo) {
        if (!clientInfo) return `ticket_${Math.random().toString(36).substring(2, 9)}`;
        const parts = clientInfo.split(/[\s\/]+/);
        return parts[0].trim() || `ticket_${Math.random().toString(36).substring(2, 9)}`;
    }

    function sanitizeFileName(name) {
        return name.replace(/[\/:*?"<>|]/g, "_").trim();
    }
});
