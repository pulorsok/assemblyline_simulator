
import pandas as pd
from pandas import ExcelFile
import json


m = pd.read_excel('material_data.xlsx', skiprows=1)
# gokart = pd.read_excel('material_data.xlsx', skiprows=1, usecols="E,F,G", dtype={'station': str, 'material': int, 'number': int})
# quad = pd.read_excel('material_data.xlsx', skiprows=1, usecols="I,J,K", dtype={'station': str, 'material': int, 'number': int})
# print(racing_car)

material_table = {
	'racing_car':{
	'1':{},
	'2':{},
	'3':{},
	'4':{},
	'5':{}
	},
	'gokart':{
	'1':{},
	'2':{},
	'3':{},
	'4':{},
	'5':{}
	},
	'quad':{
	'1':{},
	'2':{},
	'3':{},
	'4':{},
	'5':{}
	},
}
print(m)
# print(racing_car)
# print(gokart)
# print(quad)

for i in m.index:
	if m['go_station'][i] == 1:
		material_table['gokart']['1'].update({int(m['go_material'][i]) : m['go_number'][i]})
	if m['go_station'][i] == 2:
		material_table['gokart']['2'].update({int(m['go_material'][i]): m['go_number'][i]})
	if m['go_station'][i] == 3:
		material_table['gokart']['3'].update({int(m['go_material'][i]): m['go_number'][i]})
	if m['go_station'][i] == 4:
		material_table['gokart']['4'].update({int(m['go_material'][i]): m['go_number'][i]})
	if m['go_station'][i] == 5:
		material_table['gokart']['5'].update({int(m['go_material'][i]): m['go_number'][i]})

for i in m.index:
	if m['race_station'][i] == 1:
		material_table['racing_car']['1'].update({(m['race_material'][i]): m['race_number'][i]})
	if m['race_station'][i] == 2:
		material_table['racing_car']['2'].update({(m['race_material'][i]): m['race_number'][i]})
	if m['race_station'][i] == 3:
		material_table['racing_car']['3'].update({(m['race_material'][i]): m['race_number'][i]})
	if m['race_station'][i] == 4:
		material_table['racing_car']['4'].update({(m['race_material'][i]): m['race_number'][i]})
	if m['race_station'][i] == 5:
		material_table['racing_car']['5'].update({(m['race_material'][i]): m['race_number'][i]})

for i in m.index:
	if m['quad_station'][i] == 1:
		material_table['quad']['1'].update({int(m['quad_material'][i]): m['quad_number'][i]})
	if m['quad_station'][i] == 2:
		material_table['quad']['2'].update({int(m['quad_material'][i]): m['quad_number'][i]})
	if m['quad_station'][i] == 3:
		material_table['quad']['3'].update({int(m['quad_material'][i]): m['quad_number'][i]})
	if m['quad_station'][i] == 4:
		material_table['quad']['4'].update({int(m['quad_material'][i]): m['quad_number'][i]})
	if m['quad_station'][i] == 5:
		material_table['quad']['5'].update({int(m['quad_material'][i]): m['quad_number'][i]})


with open('material_data.json', 'w+') as out:
	json.dump(material_table, out, indent=4)
print(json.dumps(material_table, indent=4))
# print(racing_car_data)
# print(df.columns.ravel())
# print(df['B'].tolist())