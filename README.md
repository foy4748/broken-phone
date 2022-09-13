# Error Log
## Error 1  
Found in Console.  
Problem: The ID was wrong, so event was listening to null. js/app.js : 59
Fix: Fixed the id.  

## Error 2  
Found in Console.  
GET http://localhost:3000/undefined 404 (Not Found)  

Problem: Media is trying to accessing undefined url.  
Fix: The phone cards had wrong property value.  

## Error 3  
Found in UI  

Problem: Only one item was showing on UI. because the template was feeding to wrong place  

Fix: Feed the template to template container Then append the template container in the whole item container  

## Error 4  
Found in UI  

Problem: Logical Error in Showing Loading Spin.  

Fix: Showing Spinner if isLoading is true. Setting the Spinner before loading data.  

## Error 5  

Problem: The URL was wrong & doesn't contains https://  

Fix: Copied the right url from API documentation  

## Error 6  

Problem: Storage was showing [Object object] in modal

Fix: Accessed the property value storage

## Error 7  

Problem: dataLimit was not provided  

Fix: passed dataLimit as argument  

## Error 8  

Problem: Hard coded dataLimit as written  

Fix: used the dataLimit variable  

## Error 9

Problem: Phone Container was appending new results at the end after searching. 

Fix: Uncommented the line that empty the Phone Container

## Error 10  

Problem: Pressing enter to search phone was not working  

Fix: Set the comparsion of pressed key as lower case  

## Issue 1 
Fixed the home page Show all button by saving the search  
query in localstorage
---
# phone-hunter

## API Links

### Phone Search
URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

Example: https://openapi.programming-hero.com/api/phones?search=iphone


### Phone detail url:
URL Format: https://openapi.programming-hero.com/api/phone/${id}


Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089
