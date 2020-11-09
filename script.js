$(document).ready(function(){

    $(".Button").on("click", function(){

        let inputValue = $(".inputValue").val();
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputValue +"&units=imperial" + "&appid=5b1c716e64155c6f31f83fc752ff2b1f"
        $.ajax ({
            url: queryURL,
            method: "GET",
            
        }).then(function(response){
            console.log(response)
            let currentDate = moment().format('MMMM Do YYYY')
            let name =$(".name").html(response.name + " " + currentDate)
            console.log(name)
            let temp = $(".temp").html(response.main.temp)
            
            
        })
    })
})