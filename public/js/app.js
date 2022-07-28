
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value
    
    messageOne.textContent = 'Loading weather...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response => {
        response.json().then((data) => {
            if(data.error){
                console.error(data.error)
                messageOne.textContent = data.error
            } else {
                const { location, forcast } = data
                messageOne.textContent = location
                messageTwo.textContent = forcast
            }
        })
    }))
})

