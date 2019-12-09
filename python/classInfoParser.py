import pprint

file = open('temp2.txt', 'r')
lines = file.readlines()
numlines = len(lines)
counter = 0
classes = []
title = None
description = None
genEds = None
gradingStatus = None
repeatRules = None
requisites = None
for line in lines:
    words = line.split()
    if (len(words) == 0):
        continue
    if (words[0] == "COMP"):
        title = line
    elif (words[0] == "Gen"):
        genEds = line
    elif (words[0] == "Grading"):
        gradingStatus = line
    elif (words[0] == "Repeat"):
        repeatRules = line
    elif (words[0] == "Requisites"):
        requisites = line
    else:
        description = line

    keyCounter = 0
    if(title != None):
        keyCounter += 1
    if(genEds != None):
        keyCounter += 1
    if(description != None):
        keyCounter += 1
    if(requisites != None):
        keyCounter += 1
    if(repeatRules != None):
        keyCounter += 1
    if(gradingStatus != None):
        keyCounter += 1
    if(keyCounter >= 3):
        data = {
            "title": title,
            "description": description,
            "genEds": genEds,
            "requisites": requisites,
            "repeatRules": repeatRules,
            "gradingStatus": gradingStatus,
        }
        classes.append(data)
        
        title = None
        description = None
        genEds = None
        requisites = None
        repeatRules = None
        gradingStatus = None
    counter += 1
    # if (counter > 20):
    #     break


pprint.pprint(classes)
