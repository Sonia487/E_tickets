// 初始化資料容器
let providerCategoryData = [];
let tourData = {};
let categories = [];

// 1. 載入所有類別資料
fetch('./js/category.json')
  .then(response => response.json())
  .then(data => {
    categories = data.categories;
    populateCategorySelect(categories);
  })
  .catch(error => console.error('Error loading categories:', error));

// 2. 根據所選類別載入對應的業者資料
document.getElementById('category').addEventListener('change', function() {
  const category = this.value;
  const providerSelect = document.getElementById('provider');
  
  // 清空並禁用業者選單
  providerSelect.innerHTML = '<option value="">請選擇業者</option>';
  providerSelect.disabled = true;

  if (category) {
    // 根據所選類別載入業者資料
    loadProviderData(category);
  }

  // 重設旅遊行程選單
  resetTourSelect();
});

// 3. 根據選擇的業者載入對應的旅遊行程
document.getElementById('provider').addEventListener('change', function() {
  const providerId = this.value;
  const tourSelect = document.getElementById('tour');
  
  // 清空並禁用行程選單
  tourSelect.innerHTML = '<option value="">請選擇行程</option>';
  tourSelect.disabled = true;

  if (providerId) {
    // 根據選擇的業者載入對應行程
    loadTourData(providerId);
  }
});

// 載入業者資料
function loadProviderData(category) {
  fetch(`./js/ProviderCategory.json`)
    .then(response => response.json())
    .then(data => {
      providerCategoryData = data[category];    
      updateProviderSelect(data[category]);
    })
    .catch(error => console.error(`Error loading providers for ${category}:`, error));
}

// 更新業者選單
function updateProviderSelect(providers) {
  const providerSelect = document.getElementById('provider');
  providers.forEach(provider => {
    const option = document.createElement('option');
    option.value = provider.id;
    option.textContent = provider.name;
    providerSelect.appendChild(option);
  });
  providerSelect.disabled = false;
}

// 載入旅遊行程資料
function loadTourData(providerId) {
  fetch(`./js/Tour.json`)
    .then(response => response.json())
    .then(data => {
      tourData = data[providerId];
      updateTourSelect(data[providerId]);
    })
    .catch(error => console.error(`Error loading tours for provider ${providerId}:`, error));
}

// 更新行程選單
function updateTourSelect(tours) {
  const tourSelect = document.getElementById('tour');
  tours.forEach(tour => {
    const option = document.createElement('option');
    option.value = tour.id;
    option.textContent = tour.name;
    tourSelect.appendChild(option);
  });
  tourSelect.disabled = false;
}

// 重設行程選單
function resetTourSelect() {
  const tourSelect = document.getElementById('tour');
  tourSelect.innerHTML = '<option value="">請先選擇業者</option>';
  tourSelect.disabled = true;
}


// 填充類別選單
function populateCategorySelect(categories) {
  const categorySelect = document.getElementById('category');
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}
