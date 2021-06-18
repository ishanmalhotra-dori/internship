import requests

url = "http://127.0.0.1:5000"

payload={}
headers = {}

response = requests.get( url, headers=headers, data=payload)

print(response.text)