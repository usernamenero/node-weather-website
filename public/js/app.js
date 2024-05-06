// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             return console.log(data.error)
//         }
//         console.log(data.location)
//         console.log(data.forecastData)
//     })
// })

const weatherForm = document.querySelector('form')
const userAddress = document.querySelector('#userAddress')
const msgOneEl = document.querySelector('.msg1')
const msgTwoEl = document.querySelector('.msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    msgOneEl.textContent = 'Loading...'
    msgTwoEl.textContent = ''

    const location = userAddress.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return msgOneEl.textContent = data.error
            }
            msgOneEl.textContent = data.location
            msgTwoEl.textContent = data.forecastData
        })
    })

    userAddress.value = ''
})