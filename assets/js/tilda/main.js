const markers = []


const filterBtn = document.querySelector('#filter__btn'),
    countMarkers = document.querySelector('#count_markers span')
    
    countMarkers.innerHTML = Object.keys(DATA).length

function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
}

filterBtn.addEventListener('click', () => {
    // Удаляем все маркера и рисуем заново
    setMapOnAll(null) 
    initMap()
})

function initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: { lat: DATA[0].lat, lng: DATA[0].lon }})
    const filterArr = filterData(DATA)
    createMarkers(filterArr, map)
}

// Создание маркеров
function createMarkers(data, map) {

    countMarkers.innerHTML = Object.keys(data).length

    Object.keys(data).forEach( key => {

        const info = data[key]

        const marker = new google.maps.Marker({ 
            position: { lat: data[key].lat, lng: data[key].lon },
            icon: null,
            map: map,
            address: data[key].address 
        })

        markers.push(marker)

        marker.addListener('click', () => {

            const temp = markers.filter(item => item.address !== marker.address)

            temp.forEach( item => {
                item.setIcon(null)
            })

            const block = document.querySelector('#item__info')
            const address = block.querySelector('.address span')
            const coordinates = block.querySelector('.address .coordinates')
            const price = block.querySelector('.price span')
            const rooms = block.querySelector('.rooms span')
            const name = block.querySelector('.name span')
            const link = block.querySelector('.link')

            marker.setIcon(icons.select.icon)

            
            address.innerHTML = info.address
            coordinates.innerHTML = info.lat + ', ' + info.lon
            price.innerHTML = info.price
            rooms.innerHTML = info.rooms
            name.innerHTML = info.name
            link.href = info.url
        })
    })
}

// Функция фильтра
function filterData(arr) {
    const priceIn = document.querySelector('#price__in').value,
        priceOut = document.querySelector('#price__out').value,
        rooms = document.querySelector('#input__rooms').value;

    let filterArr = [];
        
    if( priceIn === '' && priceOut === '' && rooms === '' ) return arr

    if( priceIn !== '' ) {
        Object.keys(arr).filter( key => {
            const str = arr[key].price
            const price = str.replace(/\s/g, '');
            if(Number(price) >= Number(priceIn)) {
                filterArr.push(arr[key]) 
            }
        })
    }

    if( priceOut !== '' ) {
        if( filterArr.length !== 0 ) {
            const temp = filterArr;
            filterArr = []
            Object.keys(temp).filter( key => {
                const str = temp[key].price
                const price = str.replace(/\s/g, '');
                if(Number(price) <= Number(priceOut)) {
                    filterArr.push(temp[key]) 
                }
            })
        } else {
            Object.keys(arr).filter( key => {
                const str = arr[key].price
                const price = str.replace(/\s/g, '');
                if(Number(price) <= Number(priceOut)) {
                    filterArr.push(arr[key]) 
                }
            })
        }
            
    }

    if( rooms !== '' ) {
        if( filterArr.length !== 0 ) {
            const temp = filterArr;
            filterArr = []
            Object.keys(temp).filter( key => {
                if(temp[key].rooms == rooms) {
                    filterArr.push(temp[key]) 
                }
            })
        } else {
            Object.keys(arr).filter( key => {
                if(arr[key].rooms == rooms) {
                    filterArr.push(arr[key]) 
                }
            })
        }
            
    }


    return filterArr
}


if( response !== "" ) {
    const alert = document.querySelector('#alert');
    let status = '';
    if( response.status === 'success' ) {
        status = 'alert-success'
        alert.innerHTML = 'База данных успешно обновлена!'
    } 
    else if ( response.status === 'error' ) {
        status = 'alert-danger'
        alert.innerHTML = '<strong>Ошибка!</strong> ' + response.exception
    }
    
    alert.classList.add('show');
    alert.classList.add(status);

    setTimeout(() => {
        alert.classList.remove('show')
    }, 3000)
}
