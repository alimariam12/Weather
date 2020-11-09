$(document).ready(function(){

    $(".Button").on("click", function(){

        

        let inputValue = $(".inputValue").val();
        localStorage.setItem("savedCities", [inputValue])
        let newList = $("<li>")
        let newDiv = $("<div>")
        newDiv.append(newList)
        newList.append(inputValue)
        $("#list").prepend(newDiv)

        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputValue +"&units=imperial" + "&appid=5b1c716e64155c6f31f83fc752ff2b1f"
        $.ajax ({
            url: queryURL,
            method: "GET",
            
        }).then(function(response){
            console.log(response)
            let currentDate = moment().format('MMMM Do YYYY')
            let name =$(".name").html(response.city.name + " " + currentDate)
            let temp = $(".temp").html("Tempurature " + response.list[0].main.temp)
            let humidity = $(".humidity").html("Humidity " + response.list[0].main.humidity + "%")
            let windSpeed = $(".windSpeed").html("Wind Speed " + response.list[0].wind.speed + " " + response.list[0].wind.deg)
            let latitude =  response.city.coord.lat
            let longitude = response.city.coord.lon    
            let day = 0
            let imgUrl = "http://openweathermap.org/img/w/"
            let iconImg = $(".icon").attr("src", imgUrl + response.list[0].weather[0].icon + ".png")
            

            getUV(latitude, longitude)   
            
            $(".fiveDay").empty()
            for (i = 7; i < response.list.length; i+=8){
                day++
                $(".fiveDay").append(`
                <div class = "card">
                <h3> ${new moment().add(day, "day").format("L")} </h3>
                <img src = "http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png"/>
                <h4> temperature: ${response.list[i].main.temp} </h4>
                <h4> humidity: ${response.list[i].main.humidity} </h4>
                </div>
                `)
            }
        })
        
    })
    function getUV(lat,lon){
        let uvApiURL = "https://api.openweathermap.org/data/2.5/onecall?" + "&lat=" + lat + "&lon=" + lon + "&exclude={part}" + "&appid=5b1c716e64155c6f31f83fc752ff2b1f"
        $.ajax ({
            url: uvApiURL,
            method: "GET",
            
        }).then(function(responseTwo){
          $(".uvInfo").html("UV " + responseTwo.current.uvi)  
          
        })
    }

})
   