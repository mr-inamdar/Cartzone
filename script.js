//const hambeger = document.getElementById("#bar");
let popup_window = document.getElementById("popup_page");
let pro = document.querySelectorAll(".pro");

function popup() {
    if (popup_window.style.display === "none") {
        popup_window.style.display = "flex";
    } else {
        popup_window.style.display = "none";
    }
};

let left_btn = document.getElementsByClassName("left")[0];
let right_btn = document.getElementsByClassName("right")[0];
let container = document.getElementsByClassName("pro_container")[0];

let arr = [
    {id:"NA", pic:"pics/products/np1.jpg", brand:"adidas", name:"soft and silky Teddy-Bear"},
    {id:"NA", pic:"pics/products/np2.jpg", brand:"ARA", name:"Phlazooo"},
    {id:"103", pic:"pics/products/np3.jpg", brand:"adidas", name:"Men Suit in black colour"},
    {id:"NA", pic:"pics/products/np4.jpg", brand:"Xeeee", name:"Mobile"},
    {id:"102", pic:"pics/products/np5.jpg", brand:"adidas", name:"Women kurti"},
    {id:"NA", pic:"pics/products/np6.jpg", brand:"indianmixer", name:"Handimix Mixer"},
    {id:"NA", pic:"pics/products/np7.jpg", brand:"samsung", name:"Sliver colour Refregretor"},
    {id:"103", pic:"pics/products/np8.jpg", brand:"ZARA", name:"Pure kotten shart"}
];

let curr_idx_s = 0, curr_idx_e = 3, mo_idx = 0;
// mobile media
const media_query = window.matchMedia("(max-width: 768px)");

function next_slide(){
    let first_ele = container.children[1];

    first_ele.classList.add('fade_out_left');

    setTimeout(() => {
        if (media_query.matches) { //|| window.innerWidth <= 768 
            if (mo_idx >= arr.length-1) {
                mo_idx = 0;
            } else {
                mo_idx++;
            }
            console.log(mo_idx);
            
            first_ele.classList.remove('fade_out_left');
            first_ele.style.opacity = "1";
            first_ele.setAttribute("data-id",arr[mo_idx].id);
            first_ele.getElementsByTagName('img')[0].src = arr[mo_idx].pic;
            first_ele.getElementsByClassName('des')[0].getElementsByTagName("span")[0].innerText = arr[mo_idx].brand;
            first_ele.getElementsByClassName("des")[0].getElementsByTagName("h5")[0].innerText = arr[mo_idx].name;
        } else {
            if (curr_idx_e >= arr.length - 1) {
                curr_idx_e = 0;
            } else {
                curr_idx_e++;
                curr_idx_s++;
                if(curr_idx_s >= arr.length){
                    curr_idx_s = 0;
                }
                console.log(curr_idx_e, curr_idx_s);
                
            }
            first_ele.classList.remove('fade_out_left');
            first_ele.setAttribute("data-id",arr[curr_idx_e].id);
            first_ele.getElementsByTagName('img')[0].src = arr[curr_idx_e].pic;
            first_ele.getElementsByClassName('des')[0].getElementsByTagName("span")[0].innerText = arr[curr_idx_e].brand;
            first_ele.getElementsByClassName("des")[0].getElementsByTagName("h5")[0].innerText = arr[curr_idx_e].name;
            container.insertBefore(first_ele, right_btn); 
        }
    }, 500);
}

function prev_slide(){
    let last_ele;
    if (media_query.matches) {
        last_ele = container.children[1];
    } else {
       last_ele = container.children[4];
    }
    last_ele.classList.add('fade_out_right'); 
    setTimeout(() => {
        if (media_query.matches) { //|| window.innerWidth <= 768 
            if (mo_idx <= 0) {
                mo_idx = arr.length-1;
            } else {
                mo_idx--;
            }
            console.log(mo_idx);
            
            last_ele.classList.remove('fade_out_right');
            last_ele.style.opacity = "1";
            last_ele.setAttribute("data-id",arr[mo_idx].id);
            last_ele.getElementsByTagName('img')[0].src = arr[mo_idx].pic;
            last_ele.getElementsByClassName('des')[0].getElementsByTagName("span")[0].innerText = arr[mo_idx].brand;
            last_ele.getElementsByClassName("des")[0].getElementsByTagName("h5")[0].innerText = arr[mo_idx].name;
        } else {
            if (curr_idx_s <= 0) {
                curr_idx_s = arr.length - 1;
                curr_idx_e--;
            } else {
                curr_idx_s--;
                curr_idx_e--;
                if (curr_idx_e < 0) {
                    curr_idx_e = arr.length -1;
                }
                console.log(curr_idx_e, curr_idx_s);
                
            }
            last_ele.classList.remove('fade_out_right');
            last_ele.setAttribute("data-id",arr[curr_idx_s].id);
            last_ele.getElementsByTagName('img')[0].src = arr[curr_idx_s].pic;
            last_ele.getElementsByClassName('des')[0].getElementsByTagName("span")[0].innerText = arr[curr_idx_s].brand;
            last_ele.getElementsByClassName("des")[0].getElementsByTagName("h5")[0].innerText = arr[curr_idx_s].name;
            container.insertBefore(last_ele, container.children[1]);
        }
    }, 500);
}
// Mobile menu bar
function make_flex(){
    document.getElementsByClassName("links")[0].style.right = "0";
};
document.querySelectorAll(".page").forEach((pg)=>{
    pg.addEventListener("click", ()=>{
        // if (document.getElementsByClassName("links")[0].style.right == "0") {
            document.getElementsByClassName("links")[0].style.right = "-150px";
        // }
    });
}); 
function display_of_manu(){
  document.getElementsByClassName("links")[0].style.right = "-150px";
}

// Search result page
let clicked = false;
let search_input = document.getElementsByClassName("search_input");
const suggestions = ["Kurti", 'Kurta', "Mens formal cloths", "Saree", 'Indian dress', 'Western dress','Wonmens western dress'];

function activateSuggestions() {
  clicked = true;
  showSuggestions();
}

function showSuggestions() {
  const list = document.getElementsByClassName("suggestionsList");
  const index = media_query.matches ? 1 : 0;
  const currentList = list[index];
  const inputValue = search_input[index].value.trim().toLowerCase();

  currentList.innerHTML = "";

  document.addEventListener("click", function (e) {
    const container = media_query.matches ? ".mobile_header" : "#popup_page";
    if (!e.target.closest(container)) {
      currentList.style.display = "none";
    }
  });

  let filtered = [];

  if (clicked) {
    // Show all suggestions when input is clicked
    filtered = suggestions;
    clicked = false;
  } else {
    // Filter suggestions based on input value
    filtered = suggestions.filter(item =>
      item.toLowerCase().includes(inputValue)
    );
  }

  // If nothing matches, hide suggestions
  if (!filtered.length) {
    currentList.style.display = "none";
    return;
  }

  // Populate list
  filtered.forEach(item => {
    const li = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = item;
    li.appendChild(text);

    li.addEventListener("click", () => {
      search_input[index].value = item;
      currentList.style.display = "none";
    });

    currentList.appendChild(li);
  });

  currentList.style.display = "block";
}

// seach output

let heading;
let pagination; // adjust selector
let re_container;
let search_name;
let filtered_products = [];
let currentPage = 1;
const itemsPerPage = 5;
const mobile_itemsPerPage = 1;
let totalPages;
const visibleButtons = 3;
let pro1;


let allProducts = [
    //Sadi
    { "id": 101, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/saree1.jpg", "brand": "ZARA"},
    { "id": 101, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/saree2.jpg", "brand": "ZARA"},
    { "id": 101, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/saree3.jpg", "brand": "ZARA"},
    { "id": 101, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/saree4.jpg", "brand": "ZARA"},
    { "id": 101, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/saree6.jpg", "brand": "ZARA"},
    { "id": 101, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/saree7.jpg", "brand": "ZARA"},
    { "id": 101, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/saree8.jpg", "brand": "ZARA"},
    { "id": 101, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/saree9.jpg", "brand": "ZARA"},
    { "id": 101, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/saree.jpg", "brand": "ZARA"},
    { "id": 101, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/saree.jpeg", "brand": "ZARA"},
    //Kurti
    { "id": 102, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurti1.jpg", "brand": "ZARA"},
    { "id": 102, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurti3.jpg", "brand": "ZARA"},
    { "id": 102, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurti4.jpg", "brand": "ZARA"},
    { "id": 102, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurti5.jpg", "brand": "ZARA"},
    { "id": 102, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurti8.jpg", "brand": "ZARA"},
    { "id": 102, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurti10.jpg", "brand": "ZARA"},
    { "id": 102, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurti11.jpg", "brand": "ZARA"},
    { "id": 102, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurti12.jpg", "brand": "ZARA"},
    { "id": 102, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurti.jpg", "brand": "ZARA"},
    //Mens Formal
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/men_beggy.webp", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/mtshart.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products/np3.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/mshart3.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/mthree_peace1.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/mthree_peace2.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/mshart4.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/mthree_peace3.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/mshart6.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/mshart7.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/mtshart1.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/mtshart2.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/mtshart4.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/mtshart5.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/mtshart6.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/white_shart_2.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/white_shart.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/chex_shart.jpg", "brand": "ZARA"},
    { "id": 103, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/black_shirt.jpg", "brand": "ZARA"},
    //western
    { "id": 104, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/wshart.jpg", "brand": "ZARA"},
    { "id": 104, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/wsuit1.jpg", "brand": "ZARA"},
    { "id": 104, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/wsuit2.jpg", "brand": "ZARA"},
    { "id": 104, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/wthree_peace2.jpg", "brand": "ZARA"},
    { "id": 104, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/wthree_peace.jpg", "brand": "ZARA"},
    { "id": 104, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/wtshart2.jpg", "brand": "ZARA"},
    { "id": 104, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/wtshart3.jpg", "brand": "ZARA"},
    { "id": 104, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/wtshart.jpg", "brand": "ZARA"},
    { "id": 104, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/wtshart1.jpg", "brand": "ZARA"},
    //Kurta
    { "id": 105, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurta.jpg", "brand": "ZARA"},
    { "id": 105, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurta1.jpg", "brand": "ZARA"},
    { "id": 105, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurta2.jpg", "brand": "ZARA"},
    { "id": 105, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurta3.jpg", "brand": "ZARA"},
    { "id": 105, "name": "Silk Saree", "price": "40", "image": "pics/products_pic/kurta4.jpg", "brand": "ZARA"}
];

const searchMap = {
  "saree": [101],
  "indian dress": [101, 102,105],
  "kurti": [102],
  "mens formal cloths": [103],
  "kurta": [105],
  'western dress': [103, 104],
  'wonmens western dress': [104],
  'shop now': [101, 102, 103, 104, 105]
};
function createPagination() {
  pagination.innerHTML = '';

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '<';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      if (media_query.matches) {
        displayItems(currentPage,mobile_itemsPerPage);  
      } else {
        displayItems(currentPage, itemsPerPage);
      }
      createPagination();
    }
  };
  pagination.appendChild(prevBtn);
  if(totalPages - visibleButtons < currentPage && totalPages -3 > 0){
    const dots = document.createElement("span");
    dots.textContent = " ... ";
    pagination.appendChild(dots);
  }
  let e;
  if (totalPages > visibleButtons) {
    e = currentPage > totalPages - visibleButtons? totalPages - visibleButtons +1 : currentPage
  } else {
    e = 1;
  }
  // Page number buttons
  for (let i = e;i < currentPage + visibleButtons && i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.onclick = () => {
      currentPage = i;
      if (media_query.matches) {
        displayItems(currentPage,mobile_itemsPerPage);  
      } else {
        displayItems(currentPage, itemsPerPage);
      }
      createPagination();
    };
    pagination.appendChild(btn);
  }
  // Show ... if more pages exist
  if (currentPage + visibleButtons <= totalPages) {
    const dots = document.createElement("span");
    dots.textContent = " ... ";
    pagination.appendChild(dots);
  }
  

  // > button
  const next = document.createElement("button");
  next.textContent = ">";
  next.disabled = currentPage === totalPages;
  next.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      if (media_query.matches) {
        displayItems(currentPage,mobile_itemsPerPage);  
      } else {
        displayItems(currentPage, itemsPerPage);
      }
      createPagination();
    }
  };
  pagination.appendChild(next);
}

function displayItems(pageNumber, page_per_items) {
  re_container.innerHTML = '';
  const startIndex = (pageNumber - 1) * page_per_items;
  const endIndex = startIndex + page_per_items;
  const itemsToShow = filtered_products.slice(startIndex, endIndex);

  itemsToShow.forEach(p => {
    let card = document.createElement("div");
    card.className = "pro";
    card.setAttribute("data-id",p.id);
    card.innerHTML = `
                    <img src=${p.image} alt="${p.name}">
                    <div class="des">
                        <span>${p.brand}</span>
                        <h5>${p.name}</h5>
                        <div class="star">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h4>&#8377;${p.price}</h4>
                    </div>
                    <a href="#"><i class="fa-solid fa-cart-arrow-down cart"></i></i></a>
    `;
    re_container.appendChild(card);
  });
  pro = document.querySelectorAll(".pro");
  pro.forEach(p =>{ 
    p.addEventListener('click', ()=>{
      let id = p.getAttribute("data-id");
      let image = p.querySelector('img');
      if (id == "NA") {
        console.log(id);
        window.alert("This product is NA currently!");
        return;
      }else{
        localStorage.setItem("product_id", id);
        localStorage.setItem("pic", image.src);
        window.location.href = "sproduct.html";
      }
    });
  });
}
let inputValue;
function run_function(){
    inputValue = localStorage.getItem("input");
    
    heading = document.querySelector('.header2 h2');
    pagination = document.querySelector('#pagination-controls'); // adjust selector
    re_container = document.getElementById("result_page");
    search_name = document.getElementById("search_name");

    search_name.innerText = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

    if (Object.keys(searchMap).includes(inputValue) || searchMap.hasOwnProperty(inputValue) || inputValue in searchMap)  {
        let idList = searchMap[inputValue];
        
        filtered_products = allProducts.filter(p => idList.includes(p.id));
        
    } else {
        filtered_products = [];
    }

    if (inputValue.length === 0 || filtered_products.length === 0) {
        re_container.innerHTML = "<h1>No matching product available now...</h1>";
        pagination.innerHTML = ''; // Clear pagination if no result
        return;
    }

    if (media_query.matches) {
      totalPages = Math.ceil(filtered_products.length / mobile_itemsPerPage);
      displayItems(currentPage, mobile_itemsPerPage);
    } else {
      totalPages = Math.ceil(filtered_products.length / itemsPerPage);
      displayItems(currentPage, itemsPerPage);
    }
    createPagination();
}
function make_new_page(str = null) {
    if (str == null) {
      inputValue = media_query.matches? search_input[1].value.trim().toLowerCase() : search_input[0].value.trim().toLowerCase();
    } else {
      inputValue = str.toLowerCase();
    }
    localStorage.setItem("input", inputValue);
    localStorage.setItem("runAfterLoad", "true");
    window.location.href = "search_result.html";  
}
document.addEventListener('DOMContentLoaded', () => {
    const run = localStorage.getItem("runAfterLoad");
    if(run === "true"){
        localStorage.removeItem("runAfterLoad")
        run_function();
    }
});
window.addEventListener('load', ()=>{
    if (window.location.pathname.split('/').pop()==="search_result.html") {
        run_function();
    } 
});

// product details

function make_product_detail_page() {
  let product_id = localStorage.getItem("product_id");
  let pic = localStorage.getItem("pic");
  let main_pic = document.getElementById("main_pic");
  let small_pic = document.getElementsByClassName("small_pic");
  let filtered_products = allProducts.filter(p => product_id.includes(p.id));

  main_pic.src = pic;
  small_pic[0].src = pic;
  let pic_path = pic.split("/").pop();
  let i = 1;
  for (let index = 0; index < filtered_products.length; index++) {
    let fPath =filtered_products[index].image.split('/').pop();
    if (pic_path != fPath) {
      small_pic[i].src = filtered_products[index].image;
      i += 1;
    } 
  }
}
pro.forEach(p =>{ 
  p.addEventListener('click', ()=>{
    let id = p.getAttribute("data-id");
    let image = p.querySelector('img');
    if (id == "NA") {
      console.log(id);
      window.alert("This product is NA currently!");
      return;
    }else{
      localStorage.setItem("product_id", id);
      localStorage.setItem("pic", image.src);
      window.location.href = "sproduct.html";
    }
  });
});
window.addEventListener('load', ()=>{
  console.log(localStorage.getItem("product_id"),"icyoiugui");
  let page = window.location.pathname.split('/').pop();
  if (page.includes("sproduct.html")) {
    make_product_detail_page();
  }
});
// enter key
document.getElementById("input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.querySelector("#input img").click();
  }
});