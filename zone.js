const zone = [{
    "scaled": 16,

    "sprite": 16,

    "carrots": [[1, 2], [4, 2], [6, 2], [10, 2], [3, 4], [8, 4], [6, 5], [10, 5], [1, 6], [4, 6]],

    "grass": [[2, 7], [3, 7], [5, 7], [7, 7], [9, 7], [10, 7]],

    "doors": [],

    "columns": 12,

    "rows": 9,

    "collision_map": [0, 4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 0,
                      2, 0, 0, 0, 0, 10, 0, 0, 14, 0, 0, 8,
                      2, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 8,
                      0, 3, 0, 0, 13, 4, 7, 0, 0, 0, 13, 0,
                      0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
                      2, 0, 0, 1, 0, 0, 0, 0, 11, 0, 0, 8,
                      2, 0, 0, 0, 0, 0, 11, 0, 10, 0, 13, 0,
                      0, 3, 0, 0, 11, 0, 10, 0, 10, 0, 0, 8,
                      0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],

    "graphical_map": [27, 36, 35, 5, 36, 25, 17, 35, 44, 17, 35, 5,
                      30, 39, 39, 39, 39, 11, 31, 39, 19, 31, 39, 7,
                      38, 31, 39, 31, 31, 11, 39, 39, 39, 39, 39, 7,
                      30, 3, 31, 39, 4, 23, 6, 31, 31, 39, 4, 14,
                      22, 21, 39, 31, 31, 39, 31, 39, 31, 39, 31, 20,
                      38, 39, 39, 47, 39, 31, 39, 39, 3, 39, 31, 12,
                      10, 31, 31, 31, 31, 39, 3, 39, 11, 31, 4, 46,
                      40, 2, 39, 39, 3, 39, 11, 39, 11, 31, 39, 8,
                      24, 49, 2, 3, 37, 27, 23, 13, 11, 12, 13, 8],

    "id": "00"
},
{
    "scaled": 16,

    "sprite": 16,

    "carrots": [],

    "grass": [],

    "doors": [],

    "columns": 14,

    "rows": 9,

    "collision_map": [2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10,
                      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
                      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
                      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
                      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
                      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
                      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
                      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
                      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

    "graphical_map": [31, 39, 39, 31, 31, 39, 39, 39, 31, 31, 31, 31, 31, 31,
                      31, 31, 39, 39, 39, 39, 31, 31, 39, 39, 31, 39, 39, 31,
                      31, 31, 31, 39, 31, 31, 31, 39, 39, 39, 39, 39, 31, 31,
                      31, 31, 31, 31, 39, 39, 39, 39, 31, 31, 39, 31, 31, 31,
                      39, 31, 39, 39, 31, 31, 39, 31, 39, 31, 39, 31, 31, 31,
                      39, 39, 39, 39, 31, 39, 39, 39, 39, 39, 39, 31, 31, 31,
                      31, 39, 31, 31, 31, 31, 39, 39, 39, 31, 31, 31, 31, 31,
                      39, 31, 39, 39, 31, 31, 39, 39, 31, 31, 39, 39, 31, 31,
                      5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],

    "id": "01"
}]

function getZone(a) {
    return zone[a];
}

function getAllZones() {
    return zone;
}