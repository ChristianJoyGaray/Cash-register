const userInput = document.getElementById("cash");
const change = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

let price = 1.87;
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

    if(userInputs < price){
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if(userInputs === price){
        change.textContent = "No change due - customer paid with exact cash";
    }

    



}
purchaseBtn.addEventListener("click",calculateChange);
