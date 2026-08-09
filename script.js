async function getHistoryDate() {
  const today = new Date(); // 取得今天的日期
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 取得月份，並補零
  const date = String(today.getDate()).padStart(2, "0"); // 取得日期，並補零

  const apiUrl = `https://api.wikimedia.org/feed/v1/wikipedia/zh/onthisday/all/${month}/${date}`;
  // API URL，使用月份和日期作為參數

  const formattedText = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  // 格式化日期文字
  document.getElementById("today-date").innerHTML =
    `<i class="fa-solid fa-calendar"></i> ${formattedText}`;
  // 將格式化的日期文字插入到指定的元素中

  try {
    const response = await fetch(apiUrl); // 發送 GET 請求到 API
    const data = await response.json(); // 解析回傳的 JSON 資料

    const events = data.events.slice(0, 5).sort((a, b) => a.year - b.year); // 取得前五個事件，並依年份排序
    const eventBox = document.getElementById("history-events"); // 取得事件列表的容器元素

    if (events.length > 0) {
      // 如果有事件紀錄，則將其插入到容器中
      eventBox.innerHTML = events
        .map(
          (event) => `
      <div class="event-card">
        <strong>${event.year}年 ： </strong>${event.text}
        <a href="${event.pages[0].content_urls.desktop.page}" target="_blank">更多</a>
      </div>
    `,
        )
        .join("");
    } else {
      eventBox.innerHTML = "<li>今天沒有事件紀錄</li>";
    }
  } catch (error) {
    // 如果抓取資料失敗，則在控制台輸出錯誤訊息
    console.error("抓取資料失敗:", error);
  }
}

getHistoryDate(); // 呼叫函式以取得今天的歷史事件
