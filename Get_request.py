import requests

# Search GitHub's repositories for requests
response = requests.get(
    'https://api.github.com/search/repositories',
    params={'q': 'requests+language:python'},
)

# Inspect some attributes of the `requests` repository
json_response = response.json()
repository = json_response['items'][0]
print('Repository name:' + str({repository["name"]}))  # Python 3.6+
print('Repository description:' + str({repository["description"]}))  # Python 3.6+

