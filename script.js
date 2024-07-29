const userInput = document.getElementById("cash");
const change = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const currencyUnit = {
  'PENNY': 0.01,
  'NICKEL': 0.05,
  'DIME': 0.1,
  'QUARTER': 0.25,
  'ONE': 1,
  'FIVE': 5,
  'TEN': 10,
  'TWENTY': 20,
  'ONE HUNDRED': 100
};

const calculateChange = () => {
  const userInputs = parseFloat(userInput.value);

  if (userInputs < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (userInputs === price) {
    change.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let userChange = userInputs - price;
  let changeArr = [];
  let updatedCid = JSON.parse(JSON.stringify(cid)); // create copy of cid

  let totalCid = cid.reduce((total, currency) => total + currency[1], 0);

  if (totalCid < userChange) {
    change.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  for (let i = cid.length - 1; i >= 0; i--) {
    const cidName = cid[i][0];
    let cidAvailable = updatedCid[i][1];
    const cidValue = currencyUnit[cidName];
    let amountToReturn = 0;

    while (userChange >= cidValue && cidAvailable >= amountToReturn + cidValue) {
      amountToReturn += cidValue;
      userChange -= cidValue;
      userChange = Math.round(userChange * 100) / 100; // Avoid floating point precision issues
    }

    if (amountToReturn > 0) {
      changeArr.push([cidName, amountToReturn]);
      cidAvailable -= amountToReturn;
      updatedCid[i][1] = cidAvailable;
    }
  }

  if (userChange > 0) {
    change.textContent = "Status: INSUFFICIENT_FUNDS";
  } else {
    let remainingCid = updatedCid.reduce((total, currency) => total + currency[1], 0);

    if (remainingCid === 0) {
      change.textContent = "Status: CLOSED";
    } else {
      let changeText = "Status: OPEN";
      changeArr.forEach(([name, amount]) => {
        changeText += ` ${name}: $${amount.toFixed(2)}`;
      });
      change.textContent = changeText;
    }
  }
};

purchaseBtn.addEventListener("click", calculateChange);
