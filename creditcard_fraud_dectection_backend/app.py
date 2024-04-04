from flask import Flask, request, jsonify
from ModelTraining.services import Services

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def predict():
    transaction_data = request.json

    service = Services()
    
    prediction = service.get_training_data()
    
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
