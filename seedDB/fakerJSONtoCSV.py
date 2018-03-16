import json
import os
import csv
import io

def doubleQuote(string):
    return "\"" + string + "\""

def singleQuote(string):
    return "'" + string + "'"
    
def jsonKV(key, value) :
    return "{" + doubleQuote(key) + ": " + doubleQuote(value) + "}"
    
basePath = '/Users/slangbro/Code/HackReactor/map-sidebar/seedDB/'
File_in = basePath + "fakerData.json"
File_out_places = basePath + "fakerPlacesNoPeriods.csv"
File_out_openHours = basePath + "fakerOpenHours.csv"
File_out_json = basePath + "fakerOpenPeriods.json"

#open file instream

with io.open(File_in, mode="r", encoding="utf-8") as jsonFile:
    # jsonFileReader = csv.reader(jsonFile)
    # try:
    #     latestinputrow = next(jsonFileReader)
    #     latestinputrow = next(jsonFileReader)
    # except StopIteration:
    #     print ("empty file: ", File_in)

#open write stream
    with open(File_out_places, mode='wt', encoding="utf-8") as places:
        placesCSV = csv.writer(places)
        placesCSV.writerow(["place_id", "name", "formatted_address", "international_phone_number", "website", "url", "open_now", "open_periods", "weekday_text", "lat", "lon"])
        with open(File_out_openHours, mode='wt', encoding="utf-8") as openHours:
            openHoursCSV = csv.writer(openHours)
            openHoursCSV.writerow(["place_id", "openday", "opentime", "closeday", "closetime"])
            with open(File_out_json, 'wt') as openPeriodsJSON:
                i = 0
                for documentRow in jsonFile:
                    i += 1
                    if i % 100000 == 0:
                        print('proceced ' + str(i) + ' rows')
                    #print(documentRow)
                    document = json.loads(documentRow)['result'];
                    
                    placesRow = [document['place_id'], document['name'], document['formatted_address'], document['international_phone_number'], document['website'], document['url'], document['opening_hours']['open_now'],'''json.dumps(document['opening_hours']['periods']),''' document['opening_hours']['weekday_text'], document['geometry']['location']['lat'], document['geometry']['location']['lng']]
                
                    placesCSV.writerow(placesRow)
                    
        
                    
                    # for period in document['opening_hours']['periods']:
                    #     #add to places csv
                    #     periodRow = [document['place_id'], period['open']['day'], period['open']['time'], period['close']['day'], period['close']['time']]
                    #     openHoursCSV.writerow(periodRow)
                    #     
                    #     #add to json
                    #     
                    #     jsonRow = '{ place_id: ' + document['place_id'] + ', periods: ' + json.dumps(period) + '}'
                    #     
                    #     openPeriodsJSON.write(jsonRow)
                    #     openPeriodsJSON.write("\n")
            
            
        
            
            
            


#//for readline
  #//parse json
   #transforma and write
   
   
#close  write stream

#close readstrea