import pandas as pd
from flask import Flask, jsonify,request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config["DEBUG"] = True

# jason = {
#   "surface": 85,
#   "bedrooms": 3,
#   "restrooms": 2
# }


@app.route('/')
def home():
    return jsonify({'message': 'Bienvenidos a la API de AAAA!'})

#1 Modelo cargado
model = pd.read_pickle('models/modelo_v1.pkl')


# http://localhost:5000/prediction?surface=100&bedrooms=2&restrooms=1
@app.route('/prediction', methods=['GET'])
def prediction():
    surface   = int(request.args.get('surface'))
    bedrooms  = int(request.args.get('bedrooms'))
    restrooms = int(request.args.get('restrooms'))

    input_data = [[surface, bedrooms, restrooms]]
    prediction = model.predict(input_data)

    return jsonify({'prediction': float(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")