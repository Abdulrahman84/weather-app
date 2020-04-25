const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
const currentLocation = document.querySelector('#current-location')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('/weather?address=' + search.value).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
                search.value = ''
            }
        })
    })
})

currentLocation.addEventListener('click', () => {

    message1.textContent = 'Loading...'
    message2.textContent = ''

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {

        fetch('/weather?address=' + position.coords.latitude + ',' + position.coords.longitude).then((res) => {
            
            res.json().then((data) => {
                if (data.error) {
                    message1.textContent = data.error
                } else {
                    message1.textContent = data.location
                    message2.textContent = data.forecast
                    search.value = ''
                }
            })
        })
    })
})



