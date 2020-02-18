import json

material_demands = {
    '1':{},
    '2':{},
    '3':{},
    '4':{},
    '5':{}
}

with open('material_data.json', 'r+') as f_blueprint:
    temp = json.load(f_blueprint)


# for car in temp:
#     material_demands['1'].update(temp[car]['1'])
#     material_demands['2'].update(temp[car]['2'])
#     material_demands['3'].update(temp[car]['3'])
#     material_demands['4'].update(temp[car]['4'])
#     material_demands['5'].update(temp[car]['5'])

material_demands['1'].update(temp['racing_car']['1'])
material_demands['2'].update(temp['racing_car']['2'])
material_demands['3'].update(temp['racing_car']['3'])
material_demands['4'].update(temp['racing_car']['4'])
material_demands['5'].update(temp['racing_car']['5'])

print(json.dumps(material_demands, indent=4))
with open('material_demands.json', 'w+') as out:
    json.dump(material_demands, out, indent=4)
# print(json.dumps(temp, indent=4))