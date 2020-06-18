// from data.js
var tableData = data;
console.log(data.length)
// YOUR CODE HERE!



// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#datetime");

// Create event handlers 
button.on("click", findinfo);
form.on("submit",findinfo);
statevalues = sts.map(state => state.toLowerCase())
cityvalues = cities.map(city =>city.toLowerCase())
console.log(statevalues)
function findinfo() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    var dateinput = d3.select("#dateSelect").property("value");
    console.log(typeof(dateinput))
    console.log(dateinput)

    countryfilter = d3.select("#countrySelect").property("value");
    console.log(countryfilter)

    statefilter = d3.select("#stateSelect").property("value");
    console.log(statefilter)

    cityfilter = d3.select("#citySelect").property("value");
    console.log(cityfilter)

    shapefilter = d3.select("#shapeSelect").property("value");
    console.log(shapefilter)

    
    if (dates.includes(dateinput)){
        console.log("date passed")
        var filteredData = tableData.filter(siting => siting.datetime ===dateinput);
    }
    else {
        console.log("No date passed")
        var filteredData = tableData
    }
    
    if (cityvalues.includes(cityfilter)){
        console.log("city recognized")
        filteredData = filteredData.filter(siting => siting.city ===cityfilter);
    }
    else if (statevalues.includes(statefilter)){
            console.log("state recognized")
            filteredData = filteredData.filter(siting => siting.state ===statefilter);
        }
    else if (countryfilter !== "all"){
                console.log("country recognized")
                filteredData = filteredData.filter(siting => siting.country ===countryfilter);
    }
    else {
        console.log("No city,state, or country passed")
    }

    if (shapefilter !== "all"){
        console.log("shape recognized")
        filteredData = filteredData.filter(siting => siting.shape ===shapefilter);
    }
    else {
        console.log("No shape passed")
    }
    console.log("Data")
    console.log(filteredData)
    body= d3.select("tbody")
    body.html("");
    
    if(filteredData.length>0){
        filteredData.forEach(function(ufoReport){
            //console.log(ufoReport)
        var row =body.append("tr");
        Object.values(ufoReport).forEach(v => {
            // console.log(v);
            row.append("td").text(v);
            })
        })
    }
    else {
        alert("The combination of data you chose returns no results. Please try another filter");

        tableData.forEach(function(ufoReport){
            // console.log(ufoReport)
            var row = d3.select("tbody").append("tr");
            Object.values(ufoReport).forEach(v => {
                // console.log(v);
                row.append("td").text(v);
            })
        })
        d3.select("#dateSelect").node().value = "all";
        d3.select("#countrySelect").node().value = "all";
        d3.select("#shapeSelect").node().value = "all";
        d3.select("#citySelect").node().value = "all";
        d3.select("#stateSelect").node().value = "all";
        
    }    
}
var countryselect = d3.select("#countrySelect")
countryselect.on("click", limitAfterCountry)

function limitAfterCountry(){
    country = d3.select("#countrySelect").property("value")
    console.log(country)
    if(country !== "all") {   
        var countryfilter = tableData.filter(siting => siting.country ===country);
        //console.log(countryfilter)
        var sts = countryfilter.map(siting => siting.state.toUpperCase()).filter(uniqueValues).sort();
        var cities = countryfilter.map(function(siting) {
            a = toTitleCase(siting.city)
            return(a)
        }).filter(uniqueValues).sort();
            d3.select("#stateSelect").html("");
            d3.select("#citySelect").html("");
        sts.forEach(function(c) {
            var x = d3.select("#stateSelect");
            x.append("option").text(c).attr("value", c.toLowerCase());
            //console.log(x)
        })
        cities.forEach(function(c) {
            var x = d3.select("#citySelect");
            x.append("option").text(c).attr("value", c.toLowerCase());
            //console.log(x)
        })}
    else {
        d3.select("#stateSelect").html("");
        d3.select("#citySelect").html("");
        var sts = tableData.map(siting => siting.state.toUpperCase()).filter(uniqueValues).sort();
        var cities = tableData.map(function(siting) {
            a = toTitleCase(siting.city)
            return(a)
        }).filter(uniqueValues).sort();
        sts.forEach(function(c) {
            var x = d3.select("#stateSelect");
            x.append("option").text(c).attr("value", c.toLowerCase());
        })
        cities.forEach(function(c) {
            var x = d3.select("#citySelect");
            x.append("option").text(c).attr("value", c.toLowerCase());
        })
    }
}
var stateselect = d3.select("#stateSelect")
stateselect.on("click", limitAfterState)

function limitAfterState(){
    state = d3.select("#stateSelect").property("value")
    var statefilter = tableData.filter(siting => siting.state ===state);
    //console.log(statefilter)
    
    var cities = statefilter.map(function(siting) {
        a = toTitleCase(siting.city)
        return(a)
    }).filter(uniqueValues).sort();

        d3.select("#citySelect").html("");

    cities.forEach(function(c) {
        var x = d3.select("#citySelect");
        x.append("option").text(c).attr("value", c.toLowerCase());
        //console.log(x)
    })
}

// console.log("Data First")
// console.log(data[0])








