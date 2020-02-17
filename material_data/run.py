
import json
import pprint

pp = pprint.PrettyPrinter(indent=4)

f = open("MaterialData","r")
MaterialJSON = {}
data = []
MaterialType = {}
MaterialTemp = []
progress = {}
progressNumber = ""
CarType = ""


if f.mode == "r":
	data = f.readlines()
	for l in data:
		if l[0] == '=':
			CarType = l[1:].strip('\n')
			MaterialJSON[CarType] = {}
		else:
			if l[0] == ':':
				progressNumber = l[1:].strip('\n')
				MaterialJSON[CarType][progressNumber] = []
			else:
				MaterialJSON[CarType][progressNumber].append(l.strip('\n'))
				# MaterialTemp.append(l.strip('\n'))



arr = {1: [], 2: [], 3: [], 4: [], 5: []}
for m in MaterialJSON:
	for n in MaterialJSON[m]:
		arr[int(n)] = arr[int(n)] + MaterialJSON[m][n]

for i in range(1,5):
	arr[i] = list(dict.fromkeys(arr[i]))


# pp.pprint(arr)


with open('MaterialJSON.json', 'w') as outfile:
    json.dump(MaterialJSON, outfile)

pp.pprint(MaterialJSON)

f.close()



