import boto3
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split


class Services: 

    def get_training_data(self):
        dynamoDB = boto3.resource('dynamodb')

        table = dynamoDB.Table('creditcardfraud')
        response = table.scan()  # Scan the table to get all items
        items = response['Items']

        print(items)
        return None

