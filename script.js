const monthSelect = document.getElementById("monthSelect");
const daySelect = document.getElementById("daySelect");
const selectedDateBox = document.getElementById("selected-date"); // 額外顯示日期的區塊

// 生成月份選項 (1~12)
for (let m = 1; m <= 12; m++) {
  const option = document.createElement("option");
  option.value = String(m).padStart(2, "0");
  option.textContent = m + " 月";
  monthSelect.appendChild(option);
}

// 根據月份生成日期
function updateDays() {
  daySelect.innerHTML = "";
  const month = parseInt(monthSelect.value);
  const daysInMonth = new Date(2024, month, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const option = document.createElement("option");
    option.value = String(d).padStart(2, "0");
    option.textContent = d + " 日";
    daySelect.appendChild(option);
  }
}

// 初始化選單為今天
const today = new Date();
monthSelect.value = String(today.getMonth() + 1).padStart(2, "0");
updateDays();
daySelect.value = String(today.getDate()).padStart(2, "0");

// 抓取歷史事件
async function getHistoryDate() {
  const month = monthSelect.value; // 從選單取得月份
  const date = daySelect.value; // 從選單取得日期

  const apiUrl = `https://api.wikimedia.org/feed/v1/wikipedia/zh/onthisday/all/${month}/${date}`;
  const formattedText = `${month}月${date}日`;

  // 顯示選擇的日期（覆蓋而不是累加）
  selectedDateBox.innerHTML = `<i class="fa-solid fa-calendar"></i> ${formattedText}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // 只取前五個事件，不顯示年份
    const events = data.events.slice(0, 5).sort((a, b) => a.year - b.year);
    const eventBox = document.getElementById("history-events");

    if (events.length > 0) {
      eventBox.innerHTML = events
        .map(
          (event) => `
        <div class="event-card">
          <strong>${event.year}年：</strong> ${event.text}
          <a href="${event.pages[0].content_urls.desktop.page}" target="_blank">更多</a>
        </div>
      `,
        )
        .join("");
    } else {
      eventBox.innerHTML = "<li>這一天沒有事件紀錄</li>";
    }
  } catch (error) {
    console.error("抓取資料失敗:", error);
  }
}

// 當選單改變時重新抓取事件
monthSelect.addEventListener("change", () => {
  updateDays();
  getHistoryDate();
});
daySelect.addEventListener("change", getHistoryDate);

// 預設載入今天的事件
getHistoryDate();
