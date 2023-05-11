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
const buttonContainer = document.querySelector(".btn-container")
const customGratuity = document.getElementById('custom-gratuity');
const people = document.getElementById('people');
const splitTip = document.getElementById('split-tip');
const splitTotal = document.getElementById('split-total');
const resetBtn = document.getElementById('reset');

// ** Event Listeners
document.getElementById('reset').addEventListener('click', ()=> {
  document.querySelectorAll('input').forEach(i => i.value = '');
  resetGratuities();
})

// check if the user entered a bill total
bill.addEventListener("input", () => {
  const billInputValue = bill.value;

  if (billInputValue) {
    validateBillTotal();
  };
});

// query button, add event listener, click => reset all gratuities, set active state, set gratuity value
gratuityBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    resetGratuities();
    btn.classList.add('active');
    if (validateGatuityButtons()) {
      validateTips();
    }; 
  });
});

// listen for entries if clicked and valid then run validateTips
customGratuity.addEventListener("click", () => {
  gratuityBtns.forEach(btn => btn.classList.remove('active'));

  if (!validateGatuityButtons()) {
    customGratuity.addEventListener("input", () => {
      if (validateCustomGratuity()) {
        validateTips();
      };
    });
  };
});

// listen for entries if clicked and valid then run validateAllFields
people.addEventListener("click", () => {
  if (validateBillTotal() && validateTips()) {
    people.addEventListener("input", () => {
      if (validateNumPeople()) {
        validateAllFields()
      }
    })
  }
});
  
// ** Functionality

function validateBillTotal() {
  const billTotal = parseInt(bill.value);
  
  if(typeof billTotal !== 'number'){
    throw new Error(`Your input of moneys can only be a non-zero positive number.`);
  }  
  return true;
}

// check for an active class 
function validateGatuityButtons() {
  let buttonArr = [];
  let validEntry = null;
  
  gratuityBtns.forEach(button => {
    //convert to array to use includes method
    buttonArr.push(button.className.toString());
  });

  validEntry = buttonArr.includes("gratuity active");
  return validEntry;
};

function validateCustomGratuity() {
  const checkTip = parseFloat(customGratuity.value);  
  
  if (!checkTip) {
    throw new Error("Not a valid tip entry!");
  };

  return true;
};

// if any tip validation is true then set validateTips to "true".
function validateTips() {
  if (!validateGatuityButtons() && !validateCustomGratuity()) {
    throw new Error("please enter a tip, thanks!");
  };
  return true;
};

function validateNumPeople(){
  const numPeople = parseInt(people.value);
  if (!numPeople) {
    throw new Error(`Your input of earthlings can only be a positive interger.`);
  }
  
  return true;
};

function validateAllFields() {
  if (validateBillTotal(), validateTips(), validateNumPeople()) {
    handleUserInput();
  };
};


function getUserInputs() {
  const billTotal = parseFloat(bill.value);
  const tipPercentage = getTipValue();
  const numPeople = parseInt(people.value);
  
  return { 
    "billTotal": billTotal, 
    "tipPercentage": tipPercentage,
    "numPeople": numPeople
  };
};

function getTipValue() {
  const defaultTip = document.querySelector('.active');
  let tip = null;
  
  if (validateGatuityButtons()) {
    tip = parseInt(defaultTip.value);
  } else {
    tip = customGratuity.value;
  };
  return tip*0.01;
};

function handleUserInput() {
  console.log('Handling inputs')
  if(validateBillTotal() && validateTips() && validateNumPeople()){
    enableResetButton()
    console.log('Calculating...')
    const { billTotal, numPeople, tipPercentage} = getUserInputs();
    const tipAmount = billTotal*tipPercentage;
    const billWithTip = tipAmount + billTotal;
    
    const tipPerPerson = tipAmount/numPeople;
    const billPerPerson = billWithTip/numPeople;
    
    document.getElementById('split-tip').innerHTML = `$ ${tipPerPerson}`;
    document.getElementById('split-total').innerHTML = `$ ${billPerPerson}`;
  } 
};

function enableResetButton() {
  resetBtn.disabled = false;
}

function resetGratuities() {
  gratuityBtns.forEach(btn => btn.classList.remove('active'));
  customGratuity.value = '';
  resetBtn.disabled = true;

}
