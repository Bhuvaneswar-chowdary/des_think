// Function to fetch and parse CSV data
async function fetchCarData() {
    const response = await fetch('car_rec.csv');
    const data = await response.text();
    const cars = parseCSV(data);
    return cars;
}

// Function to parse CSV text into an array of car objects
function parseCSV(data) {
    const lines = data.split('\n');
    const headers = lines[0].split(',');
    const cars = [];

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');

        // Loop through each column and assign the headers as keys
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentLine[j] ? currentLine[j].trim() : '';
        }
        cars.push(obj);
    }
    return cars;
}

// Function to display recommended cars based on selection
async function displayRecommendations() {
    const ageGroup = document.getElementById('age-group').value;
    const drivingArea = document.getElementById('driving-area').value;
    const carRec = await fetchCarData(); // Fetch car data

    const tableBody = document.getElementById('car-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear previous recommendations

    // Filter car data based on the selected age and area
    const filteredCars = carRec.filter(car => car.age === ageGroup && car.area.toLocaleLowerCase() === drivingArea.toLocaleLowerCase());

    filteredCars.forEach(car => {
        const row = tableBody.insertRow();
        const cellMake = row.insertCell(0);
        const cellModel = row.insertCell(1);
        const cellMileage = row.insertCell(2);
        const cellImage = row.insertCell(3);
    
        cellMake.textContent = car.Make;
        cellModel.textContent = car.Model;
        cellMileage.textContent = car.City_Mileage || 'N/A'; // Display 'N/A' if mileage is empty
    
        // Add a clickable link to Google Image search
        cellImage.innerHTML = `<a href="https://www.google.com/search?tbm=isch&q=${encodeURIComponent(car.Make)}+${encodeURIComponent(car.Model)}+car" target="_blank">${car.Make}${car.Model}</a>`;
    });
    

    if (filteredCars.length === 0) {
        const row = tableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 3;
        cell.textContent = 'No cars available for the selected criteria.';
        cell.style.textAlign = 'center';
    }
}

// Add event listener to the submit button
document.getElementById('submit-btn').addEventListener('click', displayRecommendations);
