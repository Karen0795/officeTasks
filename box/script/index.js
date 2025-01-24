const form = document.forms[0]
const selectEl = document.querySelector("select");
const buttonEl = document.querySelector("button");

const createdElementContainer = document.querySelector(".constructor");
const finalResultContainer = document.querySelector(".result");

const createdItemsArray = []

const selectedArr = []

const handlerChangeActiveStatus = (e)=>{
  selectedArr.push(e)    
}
const handlerSubmit = (e) => {
  e.preventDefault();
  const [,input] = e.target;  
  
  let newElementObj;

  const createElement = (tag, className, text, inputValue) => {
    const elementObj = {
      key: document.createElement(tag),
      activeStatus: false
    };
    if (tag=='input') {
      elementObj.key.classList.add(className);
      elementObj.key.placeholder = `${text}`
    }else {
      elementObj.key.classList.add(className);
      elementObj.key.textContent = text;
  
      if (inputValue) {
        const textNode = document.createElement(tag);
        textNode.textContent = inputValue;
        elementObj.key.appendChild(textNode);
      }
    }
    elementObj.key.addEventListener('click', (e) => {
      handlerChangeActiveStatus(elementObj)
    }, {once: true});
    return elementObj;
  };
  switch (selectEl.value) {
    case "DIV":
      newElementObj = createElement("div", "createdDivStyle", "<DIV>");
      break;
    case "H1":
      newElementObj = createElement("h1", "createdBoxH1Style", "<h1>", input.value);
      break;
    case "INPUT":
      newElementObj = createElement("input", "createdBOxINPUTStyle", "Input");
      break;
    case "SPAN":
      newElementObj = createElement("span", "createdBoxSPANStyle", "<Span>", input.value);
      break;
    case "Paragraph":
      newElementObj = createElement("p", "createtedBoxParagraphStyle", "<p>", input.value);
      break;
    default:
      break;
  }
  if (newElementObj) {
    createdItemsArray.push(newElementObj);
    createdElementContainer.appendChild(newElementObj.key);
  }

  const inputAvailable = document.querySelector('.isInputAvailable')
  inputAvailable?.remove()
    e.target.reset()
};

const handleSelect = (e) => {
 const input = document.querySelector('.isInputAvailable')
 input?.remove()
  if (selectEl.value !== "DIV" && selectEl.value !== "INPUT") {
    const createdInputValue = document.createElement("input");
    createdInputValue.classList.add("isInputAvailable","Input")
    form.insertBefore(createdInputValue, buttonEl);
  }
};
const addFinalResult = (e) =>{
  e.stopPropagation()
  if (e.target.nodeName == 'DIV' && selectedArr.length==0) {    
    alert ('Please select element from Container')
  }else if (e.target.nodeName!== "DIV" ){
    alert ("You can not move here any element")
  }else {
    e.target.appendChild(selectedArr[0].key)
  }
  selectedArr.length = 0
}

selectEl.addEventListener("change", handleSelect);
form.addEventListener("submit", handlerSubmit);
finalResultContainer.addEventListener('click',  addFinalResult )


