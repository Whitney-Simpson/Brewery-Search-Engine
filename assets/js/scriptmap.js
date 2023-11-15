var findPlaceUrl =`https://maps.googleapis.com/maps/api/place/findplacefromtext/json
?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry
&input=Michigan%2Breweries
&inputtype=textquery
&key=AIzaSyCZ_-INX9g599QWR2mqkX7Z3ctcsdSLWAk`

fetch (findPlaceUrl,{
    mode:"no-cors",
    headers:{
        "Access-Control-Allow-Origin":"*",
    }
}).then((response)=>console.log(response))

