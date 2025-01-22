// 假設有一個JSON文件ProviderDetail，這是業者地點資料
const providerDetails = {
    "provider1": "地點1",
    "provider2": "地點2"
};

// 提交表單的處理函數
function submitForm() {
    // 取得表單資料
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const provider = document.getElementById('provider').value;
    const tour = document.getElementById('tour').value;
    const startHour = document.getElementById('start-hour').value;
    const startMinute = document.getElementById('start-minute').value;
    const checkinTime = document.getElementById('checkin-time').value;
    const groupNumber = document.getElementById('group-number').value;
    const namePhone = document.getElementById('name-phone').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    const infants = document.getElementById('infants').value;
    const snorkel = document.getElementById('snorkel').value;
    const canoe = document.getElementById('canoe').value;
    const freestyle = document.getElementById('freestyle').value;
    const motorbike = document.getElementById('motorbike').value;
    const bus = document.getElementById('bus').value;
    const notes = document.getElementById('notes').value;

    // 計算報到時間 (開始時間 - 報到時間)
    const checkinTimeFormatted = `${startHour}:${startMinute} - ${checkinTime}分鐘`;

    // 填入表格
    const newRow = document.createElement('tr');

    // 旅客/電話
    const clientCell = document.createElement('td');
    clientCell.textContent = namePhone;
    newRow.appendChild(clientCell);

    // 日期/行程/人數
    const tourDetailCell = document.createElement('td');
    tourDetailCell.textContent = `${date} / ${tour} / 大人: ${adults} 小孩: ${children} 抱: ${infants}`;
    newRow.appendChild(tourDetailCell);

    // 報到/開始時間
    const timeCell = document.createElement('td');
    timeCell.textContent = `${checkinTimeFormatted} / ${startHour}:${startMinute}`;
    newRow.appendChild(timeCell);

    // 行程業者
    const providerCell = document.createElement('td');
    providerCell.textContent = provider;
    newRow.appendChild(providerCell);

    // 報到地點
    const checkinAddCell = document.createElement('td');
    checkinAddCell.textContent = providerDetails[provider] || "未知地點";
    newRow.appendChild(checkinAddCell);

    // 備註
    const psCell = document.createElement('td');
    psCell.textContent = notes;
    newRow.appendChild(psCell);

    // 將新行加入表格
    document.getElementById('data-table').appendChild(newRow);
}