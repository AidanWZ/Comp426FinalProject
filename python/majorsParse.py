import urllib.request
import pprint
import os
import json

data = open('{}/class-files/text/deptsStrings.txt'.format(os.getcwd()), 'r')
majors = data.readlines()
data.close()

names = []
for line in majors:
    index = line.index('/')
    deptName = line[0:index]
    names.append(deptName)

result = {
    'majorNames': names
}
with open('{}/class-files/json/majors.json'.format(os.getcwd()), 'w') as outfile:
    json.dump(result,outfile)
print(names)