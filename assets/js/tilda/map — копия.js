"Id"
    "Area" REAL NULL,
    "Room" INTEGER NULL,
    "Price" INTEGER NULL,
    "Underground" TEXT NULL,
    "Lat" REAL NULL,
    "Lng" REAL NULL,
    "Url" TEXT NULL

	{"id":"123123123", "area":"578", "room": 5, "price": 700000, "underground":["1", "2"], "lat": 57.23, "lng": 78.87}


    async function update(id) {
        await fetch("/api/flats")
            .then(
                function (response) {
                    if (response.status !== 200) {
						console.log("Can't get flats list");
                    } else {
						
                    }
                }
            )
            .catch(function (err) {
            
			});
    }

