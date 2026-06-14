async function getHistoryDate() {
  //宣告非同步函式,來抓取維基百科資料

  const today = new Date(); //叫電腦抓取現在的日期時間,並存進today變數
  const month = today.getMonth() + 1; //從today裡取得月份(JS月份是從0開始的,所以要加1)
  const date = today.getDate(); //從today裡取得日期

  const monthString = String(month); //把month轉成字串,這樣才會做補零的動作
  const dateString = String(date); //把date轉成字串,這樣才會做補零的動作

  const formattedMonth = monthString.padStart(2, "0");
  //若month長度不足2,就在前面補0
  const formattedDate = dateString.padStart(2, "0");
  //若date長度不足2,就在前面補0

  const apiUrl = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${formattedMonth}/${formattedDate}`;
  //組合出維基百科要的網址(用反單引號包裹)

  console.log(apiUrl); //在控制台印出apiUrl
}

getHistoryDate(); //呼叫函式,讓它執行
