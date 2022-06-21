# mongodb-search-training

THIS IS THE INDEX TO APPLY TO MONGODB MOVIES COLLECTION
{
    "mappings": {
        "dynamic": false,
        "fields": {
            "title": [
                {
                    "foldDiacritics": false,
                    "maxGrams": 7,
                    "minGrams": 3,
                    "tokenization": "edgeGram",
                    "type": "autocomplete"
                }
            ]
        }
    }
}
