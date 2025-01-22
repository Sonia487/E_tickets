// 【做票券功能】
// 提交表單的處理函數
function submit2ticket() {
    // 取得表單資料
    const dateInput = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const providerid = document.getElementById('provider').value;
    const tourid = document.getElementById('tour').value;
    const startHourInput = parseInt(document.getElementById('start-hour').value);
    const startMinuteInput = parseInt(document.getElementById('start-minute').value);
    const checkinTimeInput = parseInt(document.getElementById('checkin-time').value);
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

    //取得票券表格資料
    const client = document.getElementById('client');
    const tourdetail = document.getElementById('tour-detail');
    const ttime = document.getElementById('time');
    const tprovider = document.getElementById('t-provider');
    const checkinadd = document.getElementById('checkin-add');
    const ps = document.getElementById('ps');

    // 格式化時間為 24 小時制，保證是兩位數
    function formatTime(hour, minute) {
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    }

    // 顯示報到和開始時間的函數
    function showTime() {
        const startHour = parseInt(startHourInput, 10);
        const startMinute = parseInt(startMinuteInput, 10);
        const checkinTime = parseInt(checkinTimeInput, 10);

        if (isNaN(startHour) || isNaN(startMinute) || isNaN(checkinTime)) {
            // 如果任何輸入欄位的值無效或為空，則不顯示任何內容
            ttime.innerText = '';
            return;
        }

        // 計算報到時間
        let checkinHour = startHour;
        let checkinMinute = startMinute - checkinTime;

        // 處理分鐘數小於0的情況
        if (checkinMinute < 0) {
            checkinHour -= 1;
            checkinMinute += 60;
        }

        // 格式化時間顯示
        formattedCheckinTime = formatTime(checkinHour, checkinMinute);
        formattedStartTime = formatTime(startHour, startMinute);

        // 報到/開始時間
    ttime.textContent = `  ${formattedCheckinTime}報到 / ${formattedStartTime}開始`;
    }
    showTime();


    // 顯示人數的函數
        let message = "";
        let peopleCount = [];
        // 判斷是否有輸入大人數量，若有則加入
        if (adults !== "") {
            peopleCount.push(`${adults}大`);
        }
        // 判斷是否有輸入小孩數量，若有則加入
        if (children !== "") {
            peopleCount.push(`${children}小`);
        }
        // 判斷是否有輸入嬰兒數量，若有則加入
        if (infants !== "") {
            peopleCount.push(`${infants}嬰`);
        }
        // 如果有有效的數量，組合顯示；否則不顯示
        if (peopleCount.length > 0) {
            message = `${peopleCount.join("")}`;
        }

// 顯示活動人數的函數
let message_activities = "";
let peopleCount_activities = [];

// 判斷是否有輸入浮潛數量，若有則加入
if (snorkel !== "") {
    peopleCount_activities.push(`浮潛${snorkel}位`);
}

// 判斷是否有輸入獨木舟數量，若有則加入
if (canoe !== "") {
    peopleCount_activities.push(`獨木舟${canoe}位`);
}

// 判斷是否有輸入自由行數量，若有則加入
if (freestyle !== "") {
    peopleCount_activities.push(`自由行${freestyle}位`);
}

// 判斷是否有輸入機車數量，若有則加入
if (motorbike !== "") {
    peopleCount_activities.push(`機車${motorbike}台`);
}

// 判斷是否有輸入巴士數量，若有則加入
if (bus !== "") {
    peopleCount_activities.push(`巴士${bus}位`);
}

// 判斷是否有輸入備註，若有則加入
if (notes !== "") {
    // 將文字中的換行符號 (\n) 替換成 <br>
    const formattedNotes = notes.replace(/\n/g, "<br>");
    peopleCount_activities.push(`${formattedNotes}`);
}

// 條件 1：當 tourid 的 value 是 S0103，且 motorbike 或 bus 有輸入數量時 【金八達-七望】
if (tourid === "S0103" && (motorbike !== "" || bus !== "")) {
    peopleCount_activities.push(
        "望安-恆安車行 0933-305-664<br>七美-順天車行 0910-005-798"
    );
}

// 條件 2：當 providerid 的 value 是 N01 或 N02，且 motorbike 有輸入數量時 【吉貝】
if ((providerid === "N01" || provider === "N02") && motorbike !== "") {
    peopleCount_activities.push("勇安租車 0977375500<br>吉貝碼頭取車");
}

// 條件 3：當 providerid 的 value 是 O04 時 【生活博物館】
if (providerid === "O04") {
    peopleCount_activities.push(
        "領票證號：019-14-15<br>請至櫃枱報到取票，代表人請簽名"
    );
}

// 條件 4：當 providerid 的 value 是 O01 時 【水族館】
if (providerid === "O01") {
    peopleCount_activities.push("請至售票窗口換取實體票後再行入館");
}

// 如果有有效的數量，組合顯示；否則不顯示
if (peopleCount_activities.length > 0) {
    message_activities = `${peopleCount_activities.join("<br>")}`;
}


        
        

        // 根據選擇的 tourid 顯示行程名稱
        function updateTourName() {
            // 查找 tourData 中對應的行程
            tour = tourData.find(t => t.id === tourid);
        }

        // 根據選擇的 providerid 顯示行程名稱
        function updateProviderName() {
            // 查找 providerCategoryData 中對應的行程
            provider = providerCategoryData.find(p => p.id === providerid);
        }        
        updateTourName()
        updateProviderName()
        

        // 格式化日期
        function changeDate() {
            if (dateInput === "") {
                formatted = "";
            }else {
            // 獲取選擇的日期，這是以 yyyy-mm-dd 格式的字符串
            const selectedDate = dateInput;
            
            // 使用 Date 物件將選擇的日期字符串轉換成日期物件
            const dateObj = new Date(selectedDate);
            
            // 格式化日期為 mm/dd 格式
            const month = dateObj.getMonth() + 1;  // getMonth() 返回 0-11，需要加 1
            const day = dateObj.getDate();  // getDate() 返回 1-31
            
            // 生成所需的格式
            formatted = `${month}/${day}`;
        };
        };

        changeDate()
        

        // 載入業者詳細資料
        let providerDetailsData = {};
        fetch('./js/ProviderDetail.json')
            .then(response => response.json())
            .then(data => {
            providerDetailsData = data[providerid];
            // 顯示行程業者在票券上
            tprovider.textContent = `${providerDetailsData[0]["業者"]} ${providerDetailsData[1]["電話"]}`;
            // 顯示報到地點在票券上
            checkinadd.innerHTML = `${providerDetailsData[2]["櫃台"]}<br>${providerDetailsData[3]["地址"]}`;
        })
        .catch(error => console.error('Error loading categories:', error));
        
        
        
          
    //填入票券表格
    // 旅客/電話
    client.textContent = namePhone;
    // 日期/行程/人數 tour會顯示行程id，要再修改
    tourdetail.textContent = `${formatted} ${tour.name} ${message}`;
    
    // 行程業者
    //tprovider.textContent = `${providerDetailsData[0]["業者"]} ${providerDetailsData[1]["電話"]}`;
    // 報到地點
    //const checkinadd.textContent = document.getElementById('checkin-add');
    // 備註
    ps.innerHTML = `${message_activities}`;

    document.getElementById('form-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
     
}

// 【自動改變票券顏色功能】
// 顏色映射表
const colorMapping = {
    SouthSea: "#fcf98e",
    EastSea: "#d5e8ff",
    NorthSea: "#ffd9af",
    SeaFarm: "#daffcb",
    BBQ: "#fcc0e7",
    SouthPH: "#b4fec4",
    WaterActivity: "#abfff7",
    CityMotor: "#d5feb0",
    AirportMotor: "#aaeff8",
    Other: "#deddff"
    };
  
  // 取得 select 元素和表格元素
  const category = document.getElementById("category");
  const myTable = document.getElementById("myTable");
  
  // 綁定事件監聽器，當 select 的值改變時觸發
  category.addEventListener("change", function () {
    // 根據 select 的值獲取對應的顏色
    const selectedValue = category.value;
    const selectedColor = colorMapping[selectedValue] || "#ffffff"; // 預設為白色
    myTable.style.backgroundColor = selectedColor;
  });

// 【拖曳LOGO功能】
// 取得圖片元素
const logo = document.getElementById("logo");

let isDragging = false; // 是否正在拖曳
let offsetX = 0; // 滑鼠相對圖片的水平偏移量
let offsetY = 0; // 滑鼠相對圖片的垂直偏移量

// 按下滑鼠時開始拖曳
logo.addEventListener("mousedown", (event) => {
  isDragging = true;
  offsetX = event.clientX - logo.offsetLeft;
  offsetY = event.clientY - logo.offsetTop;
  logo.style.cursor = "grabbing"; // 拖曳時改變游標樣式
});

// 移動滑鼠時更新圖片位置
document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const newX = event.clientX - offsetX;
    const newY = event.clientY - offsetY;

    // 更新圖片位置
    logo.style.left = `${newX}px`;
    logo.style.top = `${newY}px`;
  }
});

// 放開滑鼠時停止拖曳
document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    logo.style.cursor = "grab"; // 停止拖曳時還原游標樣式
  }
});
