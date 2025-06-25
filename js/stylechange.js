const templates = {
  new: `
    <div id="ticket-container">
      <div id="myTable" class="container px-4" style="width: 250px; font-family: 'Noto Sans TC'; border-radius: 15px; overflow: hidden; border: none; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
        <table class="table table-sm table-borderless table-responsive-sm" style="width: 100%;">
          <tr><td id="title" style="font-size: large;" class="text-center">行程報到電子票券</td></tr>
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
      <div class="container px-4" style="width: 400px; font-family: DFKai-sb;">
        <table class="border-dark table-bordered table table-sm table-responsive-sm" style="padding-top: 50%; scale: 1; width: 100%;">
          <colgroup>
            <col span="1" class="title" style="width: 27%;" />
            <col span="1" class="content" />
          </colgroup>
          <tr class="col">
            <td class="border-2 text-center" colspan="2" style="font-size: large; font-weight: bold">澎湖之美旅行社-電子票券</td>
          </tr>
          <tr class="border-2 border-top-0 border-bottom-0">
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
            <td class="border-1" style="white-space: nowrap;">備註</td>
            <td class="border-1" id="ps"></td>
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

function switchTo(style) {
  container.innerHTML = templates[style];
  link.href = style === 'new' ? 'css/style-new.css' : 'css/style-old.css';
  label.textContent = style === 'new' ? '新版樣式' : '舊版樣式';
}

// 初始載入
switchTo('new');

// 切換事件
toggle.addEventListener('change', function () {
  switchTo(this.checked ? 'old' : 'new');
});
