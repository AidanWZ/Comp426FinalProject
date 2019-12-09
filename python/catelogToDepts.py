import urllib.request
import pprint
import os
import json

#get html
response = urllib.request.urlopen('https://catalog.unc.edu/courses/')
html = response.read()
htmlText = html.decode('utf-8')
file = open('{}/class-files/html/course-catelog.html'.format(os.getcwd()), 'w')
file.write(htmlText)
file.close()

file = open('{}/class-files/json/dept-abbr.json'.format(os.getcwd()), 'r')
text = file.read()
data = json.loads(text)
depts = data['depts']

for dept in depts:
    try:
        response = urllib.request.urlopen('https://catalog.unc.edu/courses/{}/'.format(dept))
    except:
        continue
    html = response.read()
    htmlText = html.decode('utf-8')
    file = open('{}/class-files/html/depts/{}.html'.format(os.getcwd(), dept), 'w')
    file.write(htmlText)
    file.close()