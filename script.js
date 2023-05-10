// TODO: Handle user input of initial bill value
// TODO: Handle user selection of the gratuity, both default and custom values
// TODO: Handle user input of number of people to split the bill between
// TODO: Handle calculation of tip per person and total bill per person
// TODO: Handle resetting the calculator
// TODO: Handle appropriate styling for gratuities
// -> If a pre-set gratuity is selected, it should appear active.
// -> If no a pre-set gratuity is selected, or the user is providing a custom tip,
//    the buttons should NOT have appear active
// TODO: Handle appropriate styling for reset btn
// -> If there has been no value calculated, the reset btn should not work
// -> If the tips have been calculated, the reset btn should work


// !! Figma File Link :: https://www.figma.com/file/QcBtJ2rFIPtAcCb0bxmHea/tip-calculator-app?type=design&node-id=0-1&t=vneSsg9Qw4qG6emq-0


// Note: The elements needed have been queried for you here
// ** Query elements
const bill = document.getElementById('bill');
const gratuityBtns = document.querySelectorAll('.gratuity');
const customGratuity = document.getElementById('custom-gratuity');
const people = document.getElementById('people');
const splitTip = document.getElementById('split-tip');
const splitTotal = document.getElementById('split-total');
const resetBtn = document.getElementById('reset');

// ** Your work goes below here

// ** Event Listeners
document.getElementById('reset').addEventListener('click', ()=> {
  document.querySelectorAll('input').forEach(i => i.value = '');
  resetGratuities();
})

// query button, add event listener, click => reset all gratuities, set active state, set gratuity value
gratuityBtns.forEach(btn => {
  btn.addEventListener('click', ()=>{
    // reset all gratuities
    resetGratuities();
    btn.classList.add('active');

    // if(validateBillTotal() && validateNumPeople()){
    //   handleUserInput();
    // }
  })
})

customGratuity.addEventListener('focus', ()=>{
  resetGratuities();
    if(validateBillTotal() && validateCustomTip() && validateNumPeople()){
    handleUserInput();
  }
})

// ** Functionality
// function resetCalculator(){
//   resetGratuities();
// }

// function validateInputs

function resetGratuities() {
  //  document.querySelectorAll('input').forEach(i => i.value = '');
  gratuityBtns.forEach(btn => btn.classList.remove('active'))
  customGratuity.value = '';
}

function getUserInputs(){
  const billTotal = parseFloat(bill.value);
  const tipPercentage = getTipValue();
  const numPeople = parseInt(people.value);

  return { 
          billTotal: billTotal, 
          tipPercentage: tipPercentage,
          numPeople: numPeople
        }
}

function getTipValue(){
  const defaultTip = document.getElementsByClassName('active');
  let tip
  if(defaultTip){
    // access value
    tip = defaultTip.value
    
  } else if(validateCustomTip()){
    tip = customGratuity.value
  }

  return tip*0.01
};

function validateCustomTip(){
  const checkTip = parseFloat(customGratuity.value)
  if(isNaN(checkTip)){
    throw new Error ('Input a valid number')
  }
  return true
}

function validateNumPeople(){
  const numPeople = parseInt(people.value)
  if(isNaN(numPeople)){
    throw new Error(`Your input of earthlings can only be a positive interger.`)
  }
  return true
}

function validateBillTotal(){
  const billTotal = parseInt(bill.value)
  if(isNaN(billTotal)){
    throw new Error(`Your input of moneys can only be a non-zero positive number.`)
  }
  
  return true
}

// ids for the tip element split-tip && split-total

function handleUserInput() {
  console.log('Handling inputs')
  if(validateBillTotal() && validateCustomTip() && validateNumPeople()){
    console.log('Calculating...')
    const { billTotal, numPeople, tipPercentage} = getUserInputs();
    const tipAmount = billTotal*tipPercentage;
    const billWithTip = tipAmount + billTotal;

    const tipPerPerson = tipAmount/numPeople;
    const billPerPerson = billWithTip/numPeople;
   
    document.getElementById('split-tip').innerHTML = `$ ${tipPerPerson}`;
    document.getElementById('split-total').innerHTML = `$ ${billPerPerson}`;
  } 
}