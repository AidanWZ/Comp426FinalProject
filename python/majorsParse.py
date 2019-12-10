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
with open('{}/class-files/json/majors.json'.format(os.getcwd()), 'w') as outfile1:
    json.dump(result,outfile1)
print(names)

majorTitles = []
minorTitles = []
for name in names:
    if (name.find('minor') > -1):
        minorTitles.append(name)
    elif (name.find('major') > -1):
        majorTitles.append(name)

minorTitlesObj = {
    'minorTitles': minorTitles
}
with open('{}/class-files/json/minorTitles.json'.format(os.getcwd()), 'w') as outfile2:
    json.dump(minorTitlesObj,outfile2)

majorTitlesObj = {
    'majorTitles': minorTitles
}
with open('{}/class-files/json/majorTitles.json'.format(os.getcwd()), 'w') as outfile3:
    json.dump(majorTitlesObj,outfile3)