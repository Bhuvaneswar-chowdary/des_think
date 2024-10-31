
  
async function fetchCSV() {
  const response = await fetch('./car_ds3.csv'); 
  const data = await response.text();
  
  return new Promise((resolve, reject) => {
    Papa.parse(data, {
      header: true,
      complete: function(results) {
        resolve(results.data);
      },
      error: function(err) {
        reject(err);
      }
    });
  });
}

async function filterCars() {
  const maxPrice = parseFloat(document.getElementById('price').value);
  const fuelType = document.getElementById('fuel-type').value;

  if (isNaN(maxPrice)) {
    alert("Please enter a valid price");
    return;
  }

  let cars = await fetchCSV();
  cars.pop();  // Remove any empty row at the end

  // Filter data based on Ex-Showroom Price and Fuel Type
  const filteredCars = cars.filter(car => {
    let price = car.Ex_Showroom_Price.replace(/,/g, "").split("Rs. ")[1];
    price = parseInt(price);
  
    // Normalize the fuel type from the CSV and the selected fuel type
    const carFuelType = car.Fuel_Type.trim().toLowerCase();
    const selectedFuelType = fuelType.trim().toLowerCase();
  
    // Match both the price and the fuel type (if specified)
    return (price <= maxPrice && price >= maxPrice - 100000) &&
           (selectedFuelType === "" || carFuelType === selectedFuelType);
  });
  

  // Display filtered cars
  const carListDiv = document.getElementById('car-list');
  carListDiv.innerHTML = '';  // Clear previous results

  // Create a table and header row
  const table = document.createElement('table');
  table.innerHTML = `
  <thead>
    <tr style="border: 1px solid #ddd;">
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Make</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Model</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Price (₹)</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Mileage (km/l)</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Fuel Capacity (liters)</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Fuel Type</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Type</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Seating Capacity</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Image</th>
    </tr>
  </thead>
  <tbody></tbody>
`;

const tbody = table.querySelector('tbody');

// Populate the table with filtered cars
filteredCars.forEach(car => {
  const googleSearchUrl = `https://www.google.com/search?tbm=isch&q=${car.Make}+${car.Model}+car`;

  const row = document.createElement('tr');
  row.style.border = '1px solid #ddd'; // Add border for each row
  row.innerHTML = `
    <td style="border: 1px solid #ddd; padding: 8px;">${car.Make}</td>
    <td style="border: 1px solid #ddd; padding: 8px;">${car.Model}</td>
    <td style="border: 1px solid #ddd; padding: 8px;">₹${car.Ex_Showroom_Price}</td>
    <td style="border: 1px solid #ddd; padding: 8px;">${car.City_Mileage}</td>
    <td style="border: 1px solid #ddd; padding: 8px;">${car.Fuel_Tank_Capacity}</td>
    <td style="border: 1px solid #ddd; padding: 8px;">${car.Fuel_Type}</td>
    <td style="border: 1px solid #ddd; padding: 8px;">${car.Type}</td>
    <td style="border: 1px solid #ddd; padding: 8px;">${car.Seating_Capacity}</td>
    <td style="border: 1px solid #ddd; padding: 8px;"><a href="${googleSearchUrl}" target="_blank">${car.Make}${car.Model}</a></td>
  `;
  tbody.appendChild(row);
});



  carListDiv.appendChild(table);

  if (filteredCars.length === 0) {
    carListDiv.textContent = 'No cars found with these filters.';
  }
}

// Event listener assignment without invoking the function immediately
document.getElementById('filcars').addEventListener('click', filterCars);
