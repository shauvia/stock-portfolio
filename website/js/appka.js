const baseURL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE';
const company = '&symbol=';
const apiKey = '&apikey=5CBHAMQHRDERVZ3A';

async function getDataExternalAPI(baseURL, company, uInput, apiKey){
  let response = await fetch(baseURL + company + uInput + apiKey);
  let data = await response.json();
  console.log('data', data);
  return data; 
};

async function postData(url = '', input){
  let response = await fetch(url, {method: "POST", headers: {'Content-type': 'application/json'},
  body: JSON.stringify(input),
});
  let newRes = await response.text();
  console.log('NewRes: ', NewRes);
}

async function getInfoFromServer(url){
  let response = await fetch(url);
  let content = await response.json();
  console.log('content', content);
  return content;
}


function displayData(price, companyName, shareNum){
  let tbBody = document.getElementById('tableBody');
  let tbRow = document.createElement('tr');
  tbBody.appendChild(tbRow);
  let tbCompany = document.createElement('td');
  tbCompany.textContent = companyName;
  tbRow.appendChild(tbCompany);
  let tbShareNum = document.createElement('td');
  tbShareNum.textContent = shareNum;
  tbRow.appendChild(tbShareNum);
  let tbPrice = document.createElement('td');
  tbPrice.textContent = price;
  tbRow.appendChild(tbPrice);
} 



async function performAction(event){
  let uInput = document.getElementById('stockSym').value;
  let sharesNum = document.getElementById('shareNumb').value;
  console.log('sharesNum', sharesNum);
  let data = await getDataExternalAPI(baseURL, company, uInput, apiKey);
  let sharePrice = data['Global Quote']['05. price'];
  postData('http://localhost:3333/addInfo', {symbol: uInput, price: sharePrice, shareNum: sharesNum});
  let serverData = await getInfoFromServer('http://localhost:3333/getInfo');
  console.log('serverData', serverData)
  for(let i = 0; i < serverData.length; i++){
    let price = serverData[i].price;
    let company = serverData[i].CompanySymbol;
    let shares = serverData[i].shareNum;
    displayData(price, company, shares);
  }
  console.log('dataBlabla', data);
  console.log('obiekt', data['Global Quote']['05. price']);
}

// {temp: weatherInfo.main.temp, date: dayDate, userResponse: userInput}

document.getElementById('submituj').addEventListener('click', performAction);

(async() => {
  let serverData = await getInfoFromServer('http://localhost:3333/getInfo');
  for(let i = 0; i < serverData.length; i++){
    let price = serverData[i].price;
    let company = serverData[i].CompanySymbol;
    let shares = serverData[i].shareNum;
    displayData(price, company, shares);
  }
})();