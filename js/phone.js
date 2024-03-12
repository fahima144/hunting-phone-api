const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {
    console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } 
    else {
        showAllContainer.classList.add('hidden');
    }
    console.log('is show all', isShowAll);
    // display only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0,12);
    } else {
        
    }

    phones.forEach(phone =>{
        console.log(phone);
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-gray-100 p-4 shadow-xl`;
        // 3. set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
        /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <p>$999</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}'); show_details_modal.showModal()" class="btn bg-[#0D6EFD] text-[#FFFFFF]">Show Details</button>
            </div>
        </div>
        `;
        // 4. append child
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}

// 
const handleShowDetail =async (id) =>{
   console.log('clicked show detail', id);
   // load single data
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await res.json();
   console.log(data);
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
       loadingSpinner.classList.remove('hidden'); 
    } 
    else {
        loadingSpinner.classList.add('hidden');
    }

}

// handle show all
const handleShowAll = () => {
    handleSearch(true);
}


loadPhone();