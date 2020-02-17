import json

material_list = {
    
}

with open('material_data.json', 'r+') as f_blueprint:
    temp = json.load(f_blueprint)


for car in temp:
    for s in temp[car]:
        for material in temp[car][s]:
            material_list.update({material: 'm'})
            

print(json.dumps(material_list, indent=4))
with open('material_list.json', 'w+') as out:
    json.dump(material_list, out, indent=4)
# print(json.dumps(temp, indent=4))