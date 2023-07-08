const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const formButton=itemForm.getElementsByClassName('btn');
const itemFilter=document.getElementById('filter');
itemForm.addEventListener('submit',addItem);
let isEditMode=false;
function setItemtoEdit(item) {
    isEditMode=true;
    itemList.querySelectorAll('li').forEach((i)=>i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formButton.innerHTML='<i class="fa-solidd fa-pen"></i> Update Item';
    itemInput.value=item.textContent;
    formButton.style.backgroundColor='#228B22';
    console.log(1);
}
function addItem(e){
    const newItem=itemInput.value;
    e.preventDefault();
    if(itemInput.value===''){
        const p=document.createElement('p');
        p.innerText="please add an item";
        p.style.color='red';
        itemList.parentElement.insertBefore(p,itemList);
        return;
    }
    if(isEditMode) {
        const ItemtoEdit=itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemtoEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode=false;
    }
     addItemtoDOM(newItem);
     addItemToStorage(newItem);
     checkUI();

}
function addItemtoDOM(newItem){
const listItem=document.createElement('li');
     listItem.appendChild(document.createTextNode(newItem));
    
    const button =createButton('remove-item btn-link text-red');  
    console.log(button);
    const icon=createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    listItem.appendChild(button);
    itemList.appendChild(listItem);
}
function addItemToStorage(newItem){
    let itemsfromStorage;
    if(localStorage.getItem('items')===null){
        itemsfromStorage=[];
    }else{       itemsfromStorage=JSON.parse(localStorage.getItem('items'));
}
itemsfromStorage.push(newItem);
localStorage.setItem('items',JSON.stringify(itemsfromStorage) )
console.log(itemsfromStorage);
}
function createButton(classes){
    const button=document.createElement('button');
    button.className=classes;
    return button;
}
function createIcon(classes){
    const icon=document.createElement('i');
    icon.className=classes;
    return icon;
}
function removeItemFromStorage(item) {
    let itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  
    // Find the index of the specific item in the items array
    const index = itemsFromStorage.indexOf(item);
    
    // Remove the item from the items array
    if (index !== -1) {
      itemsFromStorage.splice(index, 1);
    }
  
    // Store the updated items array back into localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
    checkUI()
  }

function removeItem(e){
    const itemText = e.target.parentElement.parentElement.firstChild.textContent;

    if (e.target.parentElement.classList.contains('remove-item')){
        e.target.parentElement.parentElement.remove();
        removeItemFromStorage(itemText);   
    }
    else {
        setItemtoEdit(e.target);
    }
    checkUI();
}
//const items=itemList.querySelectorAll('li');
const itemClear=document.getElementById('clear');
itemClear.addEventListener('click',()=>{
    itemList.remove(itemList.firstChild);
    checkUI();
    localStorage.removeItem('items');
})
function checkUI(){
    const items=itemList.querySelectorAll('li');
    if(items.length===0){
        itemClear.style.display='none';
        itemFilter.style.display='none';
        console.log('oops');   
    }
    else{
        itemClear.style.display='block';
        itemFilter.style.display='block';
    }
 formButton.innerHTML='<i class="fa-solid fa-plus"></i>Add Item';
   formButton.style.backgroundColor='#333';   
}
itemList.addEventListener('click',removeItem);
checkUI();
itemFilter.addEventListener('input',(e)=>{
   const text=e.target.value;
   const items=itemList.querySelectorAll('li');
   items.forEach(item=>{
    const itemName=item.firstChild.textContent.toLowerCase();
    if(itemName.indexOf(text)!=-1){
        item.style.display='flex';
    }
    else{
        item.style.display='none';
    }    
   })
   
});
function getItemsfromStorage(){
    let itemsfromStorage;
    if(localStorage.getItem('items')===null){
        itemsfromStorage=[];
    }  
    else{       itemsfromStorage=JSON.parse(localStorage.getItem('items'));
}
return itemsfromStorage;
}
document.addEventListener('DOMContentLoaded',displayItems);
function displayItems() {
    const itemsfromStorage=getItemsfromStorage();
    itemsfromStorage.forEach((item)=>addItemtoDOM(item));
}