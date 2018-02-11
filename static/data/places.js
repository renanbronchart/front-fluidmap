export default {
  "type":"FeatureCollection",
  "features":[
    {
      "type":"Feature",
      "properties": {
        "id": "12346",
        "name": "Stade Yves-du-Manoir",
        "capacity": "49977513",
        "stationsClosest": [
          {
            "id": 234567,
            "name": "Gare de Lyon",
            "hint": 4
          }
        ],
        "events": [
          {
            "id": 56789,
            "name": "Escrime - homme",
            "timestamps": [1533542400, 1533549600],
            "placeName": "Stade Yves-du-Manoir",
            "geo_point_2d": [48.754542648932755, 1.834361843330175], // mêmes que celles des places
            "placeId": 12346
          }
        ],
        "totalHints": [
          {
            "timestamp": 23456100,
            "hint": 0.3
          }
        ]
      },
      "geometry":{
        "type":"Point",
        "coordinates":[
           48.9292771,
           2.24777169999993
        ]
      }
    },
    {
      "type":"Feature",
      "properties": {
        "id": "12345",
        "name": "Invalides",
        "capacity": "44939493",
        "stationsClosest": [
          {
            "id": 234567,
            "name": "Gare de Lyon",
            "hint": 4
          }
        ],
        "events": [
          {
            "id": 56790,
            "name": "Natation - Femme",
            "timestamps": [1533945600, 1533952800],
            "placeName": "Invalides",
            "geo_point_2d": [48.85990100000001, 2.3142669999999725], // mêmes que celles des places
            "placeId": 12345
          },
          {
            "id": 56791,
            "name": "Water Polo - Femme",
            "timestamps": [1533441600, 1533448800],
            "placeName": "Invalides",
            "geo_point_2d": [48.85990100000001, 2.3142669999999725], // mêmes que celles des places
            "placeId": 12345
          }
        ],
        "totalHints": [
          {
            "timestamp": 23456100,
            "hint": 0.3
          }
        ]
      },
      "geometry":{
        "type":"Point",
        "coordinates":[
           48.85990100000001,
           2.3142669999999725
        ]
      }
    },
  ]
}

