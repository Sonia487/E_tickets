//AI寫的功能
// script.js

document.getElementById('run').addEventListener('click', function() {
    // 顯示表單和背景
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    
    // ✅ 顯示右下角按鈕
    document.getElementById('floating-buttons').style.display = 'flex';
    document.getElementById('side-buttons').style.display = 'none';
});

document.getElementById('close-form').addEventListener('click', function() {
    // 關閉表單和背景
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    // ✅ 隱藏右下角按鈕
    document.getElementById('floating-buttons').style.display = 'none';
    document.getElementById('side-buttons').style.display = 'flex';

});

// 點擊背景關閉表單
document.getElementById('overlay').addEventListener('click', function(event) {
    // 檢查是否點擊背景區域，而非表單
    if (event.target === this) {
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }
    
    // ✅ 隱藏右下角按鈕
    document.getElementById('floating-buttons').style.display = 'none';
    document.getElementById('side-buttons').style.display = 'flex';
});

const templates = {
  new: `
    <div id="ticket-container" >
    <div id="myTable" class="container px-4 " style="width: 250px; font-family: 'Noto Sans TC'; border-radius: 15px; overflow: hidden; border: none; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
      <table class="table table-sm table-borderless table-responsive-sm" style="width: 100%;">
        <tr>
          <td id="title" style="font-size: large;" class="text-center">行程報到電子票券</td>
        </tr>
  
        <tr><td class="text-muted" style="font-size: 0.75rem;">旅客/電話</td></tr>
        <tr><td><div class="tablecontent" id="client"></div></td></tr>
  
        <tr><td class="text-muted" style="font-size: 0.75rem;">日期/行程/人數</td></tr>
        <tr><td><div class="tablecontent" id="tour-detail"></div></td></tr>
  
        <tr><td class="text-muted" style="font-size: 0.75rem;">報到/開始時間</td></tr>
        <tr><td><div class="tablecontent" id="time"></div></td></tr>
  
        <tr><td class="text-muted" style="font-size: 0.75rem;">行程業者</td></tr>
        <tr><td><div class="tablecontent" id="t-provider"></div></td></tr>
  
        <tr><td class="text-muted" style="font-size: 0.75rem;">報到地點</td></tr>
        <tr><td><div class="tablecontent" id="checkin-add"></div></td></tr>
          
        <tr><td class="text-muted" style="font-size: 0.75rem;">備註</td></tr>
        <tr><td><div class="tablecontent" id="ps"></div></td></tr>
        <tr><td class="text-center"><img class="watermark-img" src="src/澎湖之美去背logo.png" alt="澎湖之美浮水印"></td></tr>
      </table>
    </div>
  </div>
  `,
  old: `
<div id="myTable">
    <img id="logo" src="https://sonia487.github.io/src/Logo.png" alt="Logo">
	<div class="container px-4 " style="width: 400px; font-family:DFKai-sb;">
		<table class=" border-dark table-bordered table table-sm table-responsive-sm" style="padding-top: 50%; scale: 1; width: 100%;">
			<colgroup>
            <col span="1" class="title" style="width: 27%;"/>
            <col span="1" class="content" />
            </colgroup>
            <tr class="col">
				<td class="border-2 text-center" colspan="2" style="font-size: large; font-weight: bold">澎湖之美旅行社-電子票券</td>
			</tr>
			<tr class="border-2 border-top-0 border-bottom-0">
                <!--這個 style="width: 35%;" 可以調整直線位置-->
				<td class="border-1" style="white-space: nowrap;">旅客/電話</td>
				<td class="border-1" id="client"></td>
			</tr>
			<tr class="border-2 border-top-0 border-bottom-0">
				<td class="border-1" style="white-space: nowrap;">日期/行程/人數</td>
				<td class="border-1" id="tour-detail"></td>
			</tr>
			<tr class="border-2 border-top-0 border-bottom-0">
				<td class="border-1" style="white-space: nowrap;">報到/開始時間</td>
				<td class="border-1" id="time"></td>
			</tr>
			<tr class="border-2 border-top-0 border-bottom-0">
				<td class="border-1" style="white-space: nowrap;">行程業者</td>
				<td class="border-1" id="t-provider"></td>
			</tr>
			<tr class="border-2 border-top-0 border-bottom-0">
				<td class="border-1" style="white-space: nowrap;">報到地點</td>
				<td class="border-1" id="checkin-add"></td>
			</tr>
			<tr class="border-2 border-top-0">
				<td class="border-1"style="white-space: nowrap;">備註</td>
				<td class="border-1" style="flex: 1;" id="ps"></td>
			</tr>
		</table>
	</div>
</div>
  `
};

const toggle = document.getElementById('styleToggle');
const label = document.getElementById('styleLabel');
const container = document.getElementById('ticket-area');
const link = document.getElementById('theme-style');



// 切換樣式
function switchTo(style) {
  container.innerHTML = templates[style];
  link.href = style === 'new' ? 'css/newstyle.css' : 'css/oldstyle.css';
  label.textContent = style === 'new' ? '新版樣式' : '舊版樣式';

  // 舊版才啟用 logo 拖曳
  if (style === 'old') {
    // 等待 logo 出現後再加上拖曳功能
    waitForElement('#logo', enableLogoDrag);
  }
}

// 舊版才啟用 logo 拖曳 & 更換底色
function enableLogoDrag() {
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
  const categoryarea = document.getElementById("category");
  const myTable = document.getElementById("myTable");
  
  // 綁定事件監聽器，當 select 的值改變時觸發
  categoryarea.addEventListener("change", function () {
    // 根據 select 的值獲取對應的顏色
    const selectedValue = categoryarea.value;
    const selectedColor = colorMapping[selectedValue] || "#fffaaf"; // 預設為白色
  myTable.style.backgroundColor = selectedColor; 
       
  });

// 【拖曳LOGO功能】
// 取得圖片元素
const logo = document.getElementById("logo");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// 通用的拖曳開始事件處理
function startDrag(event) {
  isDragging = true;
  const clientX = event.type === "mousedown" ? event.clientX : event.touches[0].clientX;
  const clientY = event.type === "mousedown" ? event.clientY : event.touches[0].clientY;

  offsetX = clientX - logo.offsetLeft;
  offsetY = clientY - logo.offsetTop;

  logo.style.cursor = "grabbing";
}

// 通用的拖曳移動事件處理
function dragMove(event) {
  if (isDragging) {
    const clientX = event.type === "mousemove" ? event.clientX : event.touches[0].clientX;
    const clientY = event.type === "mousemove" ? event.clientY : event.touches[0].clientY;

    const newX = clientX - offsetX;
    const newY = clientY - offsetY;

    logo.style.left = `${newX}px`;
    logo.style.top = `${newY}px`;
  }
}

// 通用的拖曳結束事件處理
function stopDrag() {
  if (isDragging) {
    isDragging = false;
    logo.style.cursor = "grab";
  }
}


  // 手機事件
  logo.addEventListener("touchstart", startDrag);
  document.addEventListener("touchmove", dragMove);
  document.addEventListener("touchend", stopDrag);

  // 電腦事件
  logo.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", dragMove);
  document.addEventListener("mouseup", stopDrag);
}

// 等待元素出現後再執行 callback
function waitForElement(selector, callback, timeout = 3000, interval = 50) {
  const start = Date.now();
  const timer = setInterval(() => {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(timer);
      callback(el);
    } else if (Date.now() - start > timeout) {
      clearInterval(timer);
      console.warn(`waitForElement: 元素 ${selector} 超時未出現`);
    }
  }, interval);
}

// 初始載入
switchTo('new');

// 切換事件
toggle.addEventListener('change', function () {
  switchTo(this.checked ? 'old' : 'new');
});


