var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productDescription = document.getElementById('productDescription');
var productImage = document.getElementById('productImage');
var productcat = document.getElementById('selectcat');
var btn = document.getElementById('btnproduct');
var btnUpdate = document.getElementById('btnupdate');
var serchProduct=document.getElementById('searchProduct');;

var product = document.getElementById('product');

var prodlist;

/**************load Item from local storage****************** */
if (localStorage.getItem('list') != null) {
  /**convert object of string to object */
  prodlist = JSON.parse(localStorage.getItem('list'))

  Display(prodlist);

}
else {
  prodlist = [];
}
btn.onclick = function () {

  addProduct();

}


/**************************method  add product************************************* */
function addProduct() {


  if(Validation(productName) && Validation(productPrice) && Validation(productcat) && Validation(productDescription))
    {
      var probject = {
        pName: productName.value,
        pPrice: productPrice.value,
        pDesc: productDescription.value,
        pImage:`./images/${productImage.files[0]?.name}`,
       
        pCat: productcat.value
    
      };
    
    
      prodlist.push(probject);
    
      localStorage.setItem('list', JSON.stringify(prodlist));
    
      clearform();
      Display(prodlist);
    
    }
 

}

/************ clear form********************** */
function clearform() {

  productName.value = null;
  productPrice.value = null;
  productDescription.value = null;
  productcat.value = null;
}


/********Display item ********************** */

function Display(list) {
  var box = '';
  for (var i = 0; i < list.length; i++) {

    box += `<div class="col-md-3  ">
      <div class="product position-relative border border-1 border-black rounded-2 p-2">
        <span class="position-absolute badge bg-black end-10 top-10">${i + 1}</span>
        <img src="${prodlist[i].pImage}" alt="" class="img-fluid">
        <h2>${list[i].pName}</h2>
        <p class="my-2 lead">${list[i].pDesc}</p>
        <div class="d-flex justify-content-between">
          <h3 class="h4">${list[i].pCat}</h3>
          <h4 class="h5">${list[i].pPrice}</h4>
        
        </div>

        <button class="btn btn-outline-warning form-control" onclick=" editForUpadte(${i})">update

        <i class="fas fa-pen"></i>
      </button>
      <button class=" btn btn-outline-danger form-control my-3 " onclick="deleteitem(${i})">delete
    
        <i class="fas fa-trash"></i>
      </button>
        <div>
        </div>

      </div>
    </div>`;
  }



  product.innerHTML = box;
}


/******************method delete item**************** */
function deleteitem(index)
{

  prodlist.splice(index,1);
  localStorage.setItem( 'list',JSON.stringify(prodlist))

  Display(prodlist);
}


var globalIndex;

/****************method upadte item******************** */
function editForUpadte(index)
{

  btnUpdate.classList.remove('d-none')
  btn.classList.add('d-none');

  productName.value=prodlist[index].pName;
  productPrice.value=prodlist[index].pPrice;
  productDescription.value=prodlist[index].pDesc ;
  productcat.value=prodlist[index].pCat;

  globalIndex=index;
  console.log(index);

}


btnUpdate.onclick=function()
{
  updateItem();
}


/*************method update item******************* */
function updateItem()
{

  btn.classList.remove('d-none')
  btnUpdate.classList.add('d-none');
  prodlist[globalIndex].pName= productName.value
  prodlist[globalIndex].pPrice=  productPrice.value
  prodlist[globalIndex].pDesc =productDescription.value
  prodlist[globalIndex].pCat=productcat.value;
  localStorage.setItem('list', JSON.stringify(prodlist));


  Display(prodlist);
}

/**Search */
serchProduct.onkeyup=function()
{
  searchProduct();
}


function searchProduct()
{


  var searchValue=serchProduct.value.trim().toLowerCase();

  var searcArray=[];
  for(var i=0;i<prodlist.length;i++)
    {
      if(prodlist[i].pName.trim().toLowerCase().includes(searchValue)==true)
        {
          searcArray.push(prodlist[i])
        }
    }
    console.log(searcArray)

    Display(searcArray)
}






/*************validtion method************ */
function Validation(element)
{

 var objectregex={
  productName: /^[A-Z][a-z]{3,5}$/,
  productPrice: /^[1-9]{3}$/,
  productDescription: /^[\w]{3,}$/,
  selectcat: /^(labtop|tv|Pc)$/
 };

  if(objectregex[element.id].test(element.value))
    {
      element.nextElementSibling.classList.replace('d-block','d-none');
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
      return true;
    }

    else
    {
      element.nextElementSibling.classList.replace('d-none','d-block');
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      return false;
    }
}




