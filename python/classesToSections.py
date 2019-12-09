import urllib.request
import pprint
import os
import json

data = open('{}/class-files/json/allClassesList.json'.format(os.getcwd()), 'r')
classes = json.load(data)['classes']
data.close()
data = open('{}/class-files/json/dept-abbr.json'.format(os.getcwd()), 'r')
depts = json.load(data)['depts']
data.close()
classString = ''
for title in classes:
    for dept in depts:
        if (title[0:4] == dept.upper()):
            classString = "{}+{}".format(title[0:4].lower(), title[4:len(title)])
            break
        elif (title[0:4] == dept.upper()):
            classString = "{}+{}".format(title[0:3].lower(), title[3:len(title)])
            break
    try:
        url = 'https://www.coursicle.com/unc/#search={}'.format(classString)
        response = urllib.request.urlopen(url)
    except:
        continue
    html = response.read()
    htmlText = html.decode('utf-8')
    print(htmlText)
    file = open('{}/class-files/html/courses/{}.html'.format(os.getcwd(), title), 'w')
    file.write(htmlText)
    file.close()
    break
