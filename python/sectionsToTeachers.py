import urllib.request
import pprint
import os
import json

data = open('{}/class-files/json/allTeachersList.json'.format(os.getcwd()), 'r')
teachers = json.load(data)['classes']
data.close()
data = open('{}/class-files/json/dept-abbr.json'.format(os.getcwd()), 'r')
depts = json.load(data)['depts']
data.close()
teacherString = ''
for teacher in teachers:
    teacherString = teacher.replace(' ', '+')
    try:
        response = urllib.request.urlopen('https://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=The+University+of+North+Carolina+at+Chapel+Hill&schoolID=1232&query={}'.format(teacherString))
    except:
        continue
    html = response.read()
    htmlText = html.decode('utf-8')
    file = open('{}/class-files/html/teachers/{}.html'.format(os.getcwd(), teacherString), 'w')
    file.write(htmlText)
    file.close()
