// your code


const section = document.querySelector('.section-center');
let currentActiveClass = document.querySelector('.btn-container').children[0];
currentActiveClass.classList.add('active');
let userData;
async function getData() {
	const response = await fetch(
		'https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json'
	);
	userData = await response.json();
    renderMenu(userData);
    
}
getData();

// render data
function renderMenu(arr) {
	section.innerHTML = '';
			for (let i = 0; i < arr.length; i++) {
				section.innerHTML += `<article id="${arr[i].id}"class="menu-item" category="${arr[i].category}" >
                        <img src='${arr[i].img}' class="photo" alt="${arr[i].title}"/>
                        <div class="item-info">
                            <header>
                            <h4>${arr[i].title}</h4>
                            <h4 class="price">$${arr[i].price}</h4>
                            </header>
							<p class="item-text">${arr[i].desc}</p>
						</div>
						<div class="a-cart"></div>
                        </article>`;
                        
            }
          
}
const all = document.querySelectorAll('.filter-btn');
for (let i = 0; i < all.length; i++) {
	all[i].addEventListener('click', renderCurrentCategory);
}
function renderCurrentCategory(e) {
    let currentEvent = e.target;
    currentActiveClass.classList.remove('active');
    currentActiveClass = e.target;
    currentActiveClass.className = 'filter-btn active';

    let breakfast = userData.filter((item, category) => {
		return item.category == 'breakfast';
	});

	let lunch = userData.filter((item, category) => {
		return item.category == 'lunch';
	});

	let shakes = userData.filter((item, category) => {
		return item.category == 'shakes';
	});

	let dinner = userData.filter((item, category) => {
		return item.category == 'dinner';
	});

	// console.log(currentEvent.innerHTML);
	// console.log(currentEvent.innerHTML.trim());
	switch (currentEvent.innerHTML.trim()) {
		case 'all':
			renderMenu(userData);
			break;
		case 'breakfast':
			data = breakfast;
			// console.log(breakfast)
			renderMenu(breakfast);
			break;
		case 'lunch':
			data = lunch;
            // console.log("lunch", data)
            renderMenu(lunch);
			break;
		case 'shakes':
			data = shakes;
			renderMenu(shakes);
			break;
		case 'dinner':
			data = dinner;
			renderMenu(dinner);
			console.log(dinner)
			break;
	}
}
//Search Functionality issue #4:
const search = document.querySelector('.search');
search.addEventListener('keyup', function(){
    let searchValue = search.value;
    let newItem = userData.filter(
    (item) => item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchValue.toLowerCase())
);
    //console.log(newItem)
    renderMenu(newItem)
})
//Search Functionality issue #4:
let minprice = document.querySelector('.min');
let maxprice = document.querySelector('.max');
const submitPrice = document.querySelector('.minmaxxbtn')


submitPrice.addEventListener('click', function(){
    let maxpr = Number(maxprice.value)
    let minpr = Number(minprice.value)
    // if(!Number(maxpr) || !Number(minpr)){
    //     return alert('Plese enter number ')
    // }
    const newArr = userData.filter((item) => {
        if(item.price < maxpr && item.price > minpr){
            return item 
        }else if (item.price>minpr && maxpr == ''){
return item 
        }
    })
    maxprice.value = ''
    minprice.value = ''
    renderMenu(newArr)
})