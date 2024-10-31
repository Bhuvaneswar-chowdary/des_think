const carsData = [
    {
        name: "Datsun Redi-GO",
        ageGroup: "18-25",
        suitability: "Urban",
        mileage: "22 km/l"
    },
    {
        name: "Renault Kwid",
        ageGroup: "18-25",
        suitability: "Urban",
        mileage: "22 km/l"
    },
    {
        name: "Hyundai Santro",
        ageGroup: "18-25",
        suitability: "Urban",
        mileage: "20 km/l"
    },
    {
        name: "Tata Tiago",
        ageGroup: "26-35",
        suitability: "Urban-Rural",
        mileage: "23 km/l"
    },
    {
        name: "Renault Triber",
        ageGroup: "36-50",
        suitability: "Urban-Rural",
        mileage: "19 km/l"
    },
    {
        name: "Hyundai Elite i20",
        ageGroup: "18-25",
        suitability: "Urban",
        mileage: "18 km/l"
    },
    {
        name: "Ford Freestyle",
        ageGroup: "36-50",
        suitability: "Rural",
        mileage: "18 km/l"
    },
    {
        name: "Toyota Platinum Etios",
        ageGroup: "36-50",
        suitability: "Urban-Rural",
        mileage: "16 km/l"
    },
    {
        name: "Premier Rio",
        ageGroup: "26-35",
        suitability: "Rural",
        mileage: "18 km/l"
    },
    {
        name: "Toyota Etios Liva",
        ageGroup: "26-35",
        suitability: "Urban",
        mileage: "18 km/l"
    },
    {
        name: "Tata Nexa",
        ageGroup: "36-50",
        suitability: "Urban-Rural",
        mileage: "20 km/l"
    },
    {
        name: "Hyundai Aura",
        ageGroup: "26-35",
        suitability: "Urban",
        mileage: "19 km/l"
    },
    {
        name: "Volkswagen Polo",
        ageGroup: "18-25",
        suitability: "Urban",
        mileage: "18 km/l"
    },
    {
        name: "Maruti Suzuki Wagon R",
        ageGroup: "36-50",
        suitability: "Rural",
        mileage: "21 km/l"
    },
    {
        name: "Mahindra TUV300",
        ageGroup: "18-25",
        suitability: "Rural",
        mileage: "18 km/l"
    },
    {
        name: "Maruti Suzuki Brezza",
        ageGroup: "26-35",
        suitability: "Rural",
        mileage: "17 km/l"
    },
    {
        name: "Maruti S-Presso",
        ageGroup: "36-50",
        suitability: "Rural",
        mileage: "21 km/l"
    },
    {
        name: "Subaru Outback",
        ageGroup: "36-50",
        suitability: "Rural",
        mileage: "12 km/l"
    },
    {
        name: "Hyundai Creta",
        ageGroup: "18-25",
        suitability: "Urban",
        mileage: "17 km/l"
    },
    {
        name: "Honda Amaze",
        ageGroup: "18-25",
        suitability: "Urban",
        mileage: "19 km/l"
    },
    {
        name: "Maruti Suzuki Swift",
        ageGroup: "18-25",
        suitability: "Urban",
        mileage: "21 km/l"
    },
    {
        name: "Hyundai Venue",
        ageGroup: "18-25",
        suitability: "Urban",
        mileage: "18 km/l"
    },
    {
        name: "Tata Altroz",
        ageGroup: "18-25",
        suitability: "Urban",
        mileage: "20 km/l"
    },
    {
        name: "Renault Triber",
        ageGroup: "18-25",
        suitability: "Urban",
        mileage: "19 km/l"
    }
];



// Function to filter cars based on age group and area
function filterCars(ageGroup, area) {
    console.log(area);

    console.log(carsData.filter(car => car.ageGroup === ageGroup && car.suitability.toLocaleLowerCase() === area.toLocaleLowerCase()));
    return carsData.filter(car => car.ageGroup === ageGroup && car.suitability.toLocaleLowerCase() === area.toLocaleLowerCase() );
}

// Function to display filtered cars in the table
function displayCars(cars) {
    const carTableBody = document.querySelector('#car-table tbody');
    carTableBody.innerHTML = ''; // Clear existing rows

    cars.forEach(car => {
        const row = document.createElement('tr');

        // Create cell for car name
        const carNameCell = document.createElement('td');
        carNameCell.textContent = car.name;
        row.appendChild(carNameCell);

        // Create cell for car image search link
        const carImageCell = document.createElement('td');
        const imgLink = document.createElement('a');
        const searchQuery = `${car.name} car`.replace(/\s+/g, '+'); // Replace spaces with '+' for URL
        imgLink.href = `https://www.google.com/search?tbm=isch&q=${searchQuery}`; // Google Image search URL
        imgLink.textContent = ` ${car.name} `;
        imgLink.target = "_blank"; // Open in a new tab
        carImageCell.appendChild(imgLink);
        row.appendChild(carImageCell);


        const carmil = document.createElement('td');
        carmil.textContent = car.mileage;
        row.appendChild(carmil);

        // Append row to the table body
        carTableBody.appendChild(row);
    });
}

// Event listener for form submission
document.getElementById('submit-btn').addEventListener('click', function() {
    const ageGroup = document.getElementById('age-group').value;
    let area = document.getElementById('driving-area').value;
    console.log('age group = ', ageGroup);
    console.log('area = ', area);

    if (ageGroup && area) {
        const filteredCars = filterCars(ageGroup, area);
        displayCars(filteredCars);
    } else {
        alert('Please select both age group and driving area.');
    }
});
