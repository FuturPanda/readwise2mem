// const inputApiReadwise = document.querySelector(".input-api-readwise")
// const inputApiMem = document.querySelector(".input-api-mem")
// const importFromDate = document.querySelector(".import-from-date")
// const importAll = document.querySelector(".import-all-checkbox")
// const importBtn = document.querySelector(".import-button")
// const statusDisplay = document.querySelector(".status-display")
// const importDateDisplay = document.querySelector(".import-date-display")

// importBtn.addEventListener( 'click', (e) =>  {
//   e.preventDefault()
//   const apiMem = inputApiMem.value
//   const apiRead = inputApiReadwise.value
//   // const dateImp = importFromDate.value
//   const dateImp = 1676210778201
//   const impAll = importAll.checked

//   if(apiMem && apiRead && (dateImp||impAll) ){

//     const postData =  async (url = '', data) => {
//       try{
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });
//       return response.json();
//     }
//     catch(error){
//       console.log(error)
//     }
//   }

//     const response = postData('http://localhost:8080/api', {apiMem, apiRead, dateImp, impAll})
//     importDateDisplay.textContent = Date.now()
//   }

// })
