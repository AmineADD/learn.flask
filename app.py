from flask import Flask, request, render_template
import json

with open("./data/cars.json", "r+") as file:
    cars = json.load(file)

app = Flask(__name__, static_url_path='/templates')

biggest_id = "0"
for b in cars['cars']:
    if int(biggest_id) < int(b['id']):
        biggest_id = b['id']


@app.route("/")
def home():
    return render_template('index.html')


@app.route("/cars", methods=['GET', 'POST'])
def get_all_cars():
    if request.method == 'GET':
        return cars
    elif request.method == 'POST':
        new_cars_to_add = json.loads(request.form["new_cars_to_add"])
        new_cars_to_add['id'] = str(int(biggest_id)+1)
        cars['cars'].append(new_cars_to_add)
        with open("./data/cars.json", "w") as f:
            json.dump(cars, f)
        return new_cars_to_add


@app.route("/cars/<cars_id>", methods=['GET', 'DELETE', 'PUT'])
def get_cars_by_id(cars_id):
    for index, car in enumerate(cars['cars']):
        if car['id'] == cars_id:
            if request.method == 'GET':
                return cars
            elif request.method == 'DELETE':
                del cars['cars'][index]
                with open("./data/cars.json", "w") as f:
                    json.dump(cars, f)
                return cars
            elif request.method == 'PUT':
                new_attr = json.loads(request.form['cars_new_attributes'])
                car['brand'] = new_attr['brand']
                car['model'] = new_attr['model']
                car['power'] = new_attr['power']
                with open("./data/cars.json", "w") as f:
                    json.dump(cars, f)
                return car
