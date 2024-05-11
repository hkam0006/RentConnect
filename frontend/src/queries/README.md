# Queries
## Return Data structure
The data returns as an array of objects, the objects are the rows from the tables in Supabase with elements matching the headers of the table.

## How to use the queries
call the function to get the data:
'''
const property_data = useGetPropertyByID("cf96fd08-1903-4a93-95a9-51c675f9ff41");
'''

When adding the data to a react element using the following to account for the asyncronous execution can be useful. Where 0 and property_street_name can be replaced as needed.
'''
property_data.length > 0? property_data[0].property_street_name : ''
'''
