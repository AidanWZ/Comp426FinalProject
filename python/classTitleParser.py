import re
import os

def find_all(a_str, sub):
    start = 0
    while True:
        start = a_str.find(sub, start)
        if start == -1: return
        yield start
        start += len(sub) # use start += 1 to find overlapping matches


file = open('{}/class-files/text/catelog.txt'.format(os.getcwd()), 'r')
text = file.read()
result = list(find_all(text, "COMP"))

classes = []
for index in result:
    classes.append(text[index:index+8])

answer = []
for classs in classes:
    if (classs[-1] == '.'):
        answer.append(classs[0:7])
    else:
        answer.append(classs)

finalAnswer = []
for item in answer:
    splits = item.split()
    finalAnswer.append("{}{}".format(splits[0], splits[1]))
print(finalAnswer)