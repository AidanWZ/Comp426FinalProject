import os
import json
import mmap
import requests
### things to import
# classlist
# deptlist
# deptTitles
# classOfferings
# teacherList

print("Populating backend")
fileList = [
    '{}/class-files/json/dept-abbr.json'.format(os.getcwd()),
    '{}/class-files/json/allClassesList.json'.format(os.getcwd()),
    '{}/class-files/json/courseOfferings.json'.format(os.getcwd()),
    '{}/class-files/json/deptTitles.json'.format(os.getcwd()),
    '{}/class-files/json/allTeachersList.json'.format(os.getcwd())
]
urlList = [
    'http://localhost:3000/public/Portal/Departments',
    'http://localhost:3000/public/Portal/AllClasses',
    'http://localhost:3000/public/Portal/CourseOfferings',
    'http://localhost:3000/public/Portal/DeptTitles',
    'http://localhost:3000/public/Portal/Teachers',
]

for i in range(5):
    try:
        print("Retrieving")
        file = open(fileList[i], 'r')
        data = json.load(file)

        print("Uploading")
        Url = 'http://localhost:3000/public/Portal/Departments'
        response = requests.post(url=Url, data=data)
        print("Uploading succeeded")

    except urllib.request.HTTPError as e:
        print("Uploading finished with status: {}".format(e.code))
        print(e)
    except Exception as e:
        print("Failed to upload")
        print(e)