const vehicles = [
  { name: 'Toyota Corolla', price: 18000, mileage: 32 },
  { name: 'Honda Civic', price: 22000, mileage: 30 },
  { name: 'Ford Focus', price: 20000, mileage: 28 },
  { name: 'Chevrolet Malibu', price: 25000, mileage: 27 },
  { name: 'BMW 3 Series', price: 40000, mileage: 25 },
  { name: 'Nissan Altima', price: 21000, mileage: 29 },
  { name: 'Hyundai Elantra', price: 19000, mileage: 33 },
  { name: 'Mazda 3', price: 23000, mileage: 31 },
  { name: 'Volkswagen Jetta', price: 24000, mileage: 30 },
  { name: 'Subaru Impreza', price: 20000, mileage: 28 },
  { name: 'Kia Optima', price: 21000, mileage: 27 },
  { name: 'Mercedes-Benz C-Class', price: 42000, mileage: 24 },
  { name: 'Audi A4', price: 39000, mileage: 25 },
  { name: 'Tesla Model 3', price: 45000, mileage: 120  },
  { name: 'Lexus IS', price: 38000, mileage: 22 },
  { name: 'Jaguar XE', price: 41000, mileage: 24 },
  { name: 'Volvo S60', price: 37000, mileage: 26 },
  { name: 'Dodge Charger', price: 28000, mileage: 20 },
  { name: 'Chrysler 300', price: 32000, mileage: 19 },
  { name: 'Acura TLX', price: 36000, mileage: 25 },
  { name: 'Cadillac ATS', price: 34000, mileage: 22 },
  { name: 'Infiniti Q50', price: 40000, mileage: 24 },
  { name: 'Alfa Romeo Giulia', price: 43000, mileage: 26 },
  { name: 'Genesis G70', price: 38000, mileage: 24 },
  { name: 'Porsche Panamera', price: 80000, mileage: 18 },
  { name: 'Mitsubishi Lancer', price: 22000, mileage: 29 },
  { name: 'Fiat 500', price: 16000, mileage: 33 },
  { name: 'Peugeot 308', price: 27000, mileage: 32 },
  { name: 'Renault Megane', price: 25000, mileage: 31 },
  { name: 'Skoda Octavia', price: 23000, mileage: 30 }
];


function filterVehiclesByBudget() {
    const budget = document.getElementById('price').value;
    const budgetValue = parseInt(budget); 
    if (isNaN(budgetValue)) {
        alert("Please enter a valid number.");
        return;
    }
   
    // Filter the vehicles
    const affordableVehicles = vehicles.filter(vehicle => vehicle.price <= budgetValue);

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 
    if (affordableVehicles.length > 0) {
        affordableVehicles.forEach(vehicle => {
            const vehicleElement = document.createElement('p');
            vehicleElement.textContent = `${vehicle.name} - $${vehicle.price} - Mileage-${vehicle.mileage} `;

            resultsDiv.appendChild(vehicleElement);
        });
    } else {
        resultsDiv.textContent = 'No vehicles available within this budget.';
    }
}

// Attach event listener to input field for user action
document.getElementById('price').addEventListener('input', filterVehiclesByBudget);
