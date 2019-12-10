import urllib.request
import pprint
import os
import json


data = open('{}/class-files/json/majors.json'.format(os.getcwd()), 'r')
majors = json.load(data)['majorNames']
data.close()
counter = 0
response = ''
for major in majors:
    try:
        url = 'https://catalog.unc.edu/undergraduate/programs-study/{}/#requirementstext'.format(major)
        print(url)
        response = urllib.request.urlopen(url)
        html = response.read()
        htmlText = html.decode('utf-8').replace('\u200b', '')
        file = open('{}/class-files/html/majors/{}.html'.format(os.getcwd(), major), 'w')
        file.write(htmlText)
        file.close()
    except Exception as e:
        counter += 1
        print(e)
    