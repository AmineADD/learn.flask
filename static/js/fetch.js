
var CARS_DATA;
var xhr = new XMLHttpRequest();
xhr.open("GET", '/cars', true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send(null);
xhr.onreadystatechange = function () { //Appelle une fonction au changement d'état.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        CARS_DATA=JSON.parse(xhr.responseText).cars
        update_table(CARS_DATA);
    }
}

function update_table(data) {
    document.querySelector("#table_body").innerHTML = "";
    console.log("data => ",data)
    data.forEach((car, index) => {
        document.querySelector("#table_body").innerHTML = document.querySelector("#table_body").innerHTML + `<tr>
        <td id="${car.id}.brand" data-label="brand" contenteditable="true">${car.brand}</td>
        <td id="${car.id}.model" data-label="model" contenteditable="true">${car.model}</td>
        <td id="${car.id}.power" data-label="power" contenteditable="true">${car.power}</td>
        <td data-label="Actions">
            <button onclick="deleteCar(${car.id})">
                DEL
            </button>
            <button onclick="updateCar(${car.id})">
                UPDATE
            </button>
        </td>
      </tr>`
    });
}

function deleteCar(carId) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", '/cars/' + carId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onload = function () {
        // do something to response
        console.log(this.responseText);
        alert("car deleted");
    };
}

function updateCar(carId) {
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", '/cars/' + carId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    let newbrand = document.getElementById(carId+'.brand').textContent
    let newModel = document.getElementById(carId+'.model').textContent 
    let newpower = document.getElementById(carId+'.power').textContent 

    let car_new_attributes = {
        brand: newbrand,
        model: newModel,
        power: newpower
    }

     xhr.send("cars_new_attributes="+JSON.stringify(car_new_attributes));

}

function addCar() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/cars', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
        // do something to response
        console.log(this.responseText);
        alert("Done");
    };

    let new_car_to_add = {
        'brand': document.getElementById('brand').value,
        'model': document.getElementById("model").value,
        'power': document.getElementById("power").value
    }
    xhr.send("new_cars_to_add="+JSON.stringify(new_car_to_add));
}

 function rechercheTable() {
    
    var brand,model,power;
    brand = document.querySelector("#brand").value;
    model = document.querySelector("#model").value;
    power =  document.querySelector("#power").value;
 
    var result=Array();
    CARS_DATA.forEach(element=>{
        if(element.brand === brand || element.model === model || element.power===power){
            result.push(element);
        }
    })
    if(result.length==0){
        alert("No cars found")
    }
    update_table(result); 
     
};

 /********************Reset table */
 function resetTable(){
    update_table(CARS_DATA); 
 }