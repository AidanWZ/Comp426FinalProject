import urllib.request
import pprint
import os
import json

def find_all(a_str, sub):
    start = 0
    while True:
        start = a_str.find(sub, start)
        if start == -1: return
        yield start
        start += len(sub) 

data = open('{}/class-files/json/dept-abbr.json'.format(os.getcwd()), 'r')
depts = json.load(data)['depts']
data.close()
data = open('{}/class-files/text/bigAss.txt'.format(os.getcwd()), 'r')
lines = data.readlines()
data.close()
counter = 1
classCounter = 0
sectionList = []
while (True):
    words = lines[counter+1].split()
    if (len(words) > 0):
        if (words[0].lower() in depts):
            classCounter += 1
            subject = ""
            catelogNum = ""
            section = ""
            classNum = ""
            title = ""
            component = ""
            units = ""
            bldg = ""
            room = ""
            days = ""
            time = ""
            teacher = ""
            seats = ""
            waitlist = ""

            subject = lines[counter+1].strip('\n')
            catelogNum = lines[counter+2].strip('\n')
            section = lines[counter+3].strip('\n')
            classNum = lines[counter+4].strip('\n')
            title = lines[counter+5].strip('\n')
            component = lines[counter+6].strip('\n')
            units = lines[counter+7].strip('\n')
            bldg = lines[counter+10].strip('\n')
            room = lines[counter+11].strip('\n')
            days = lines[counter+12].strip('\n')
            time = lines[counter+13].strip('\n')
            seats = lines[counter+17].strip('\n')
            teacher = lines[counter+16].strip('\n')
            waitlist = lines[counter+21].strip('\n')

            if (len(classNum) > 20 or len(bldg) > 20):
                classCounter += 1
                subject = ""
                catelogNum = ""
                section = ""
                classNum = ""
                title = ""
                component = ""
                units = ""
                bldg = ""
                room = ""
                days = ""
                time = ""
                teacher = ""
                seats = ""
                waitlist = ""
                
            counter += 21
            obj = {
                'subject': subject,
                'catelogNum': catelogNum,
                'section': section,
                'classNum': classNum,
                'title': title,
                'component': component,
                'units': units,
                'bldg': bldg,
                'room': room,
                'days': days,
                'time': time,
                'seats': seats,
                'teacher': teacher,
                'waitlist': waitlist
            }
            sectionList.append(obj)
            try:
                if lines[counter+21] == None:
                    break
            except:
                break
        else:
            counter += 1
            try:
                if lines[counter+21] == None:
                    break
            except:
                break
    else:
        counter += 1
        try:
            if lines[counter+21] == None:
                break
        except:
            break

final = {
    'classes': sectionList
}
with open('{}/class-files/json/courseOfferings.json'.format(os.getcwd()), 'w') as outfile:
    json.dump(final,outfile)
pprint.pprint(sectionList)
print(classCounter)
