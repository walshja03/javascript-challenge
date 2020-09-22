
var dateselected = ""
var dateSel = new Litepicker({
    element: document.getElementById('datepicker'),
    startDate:"2010-01-01",
    maxDate: "2010-01-13",
    minDate: "2010-01-01",
    format: 'YYYY-MM-DD',
    onSelect: function (date1){
        console.log(date1)
        dateselected =dateSel.getDate('YYYY-MM-DD')
        return dateselected
    }
    
})
tableData = data

//Populate table with all data on initial load
tableData.forEach(function(ufoReport){
    // console.log(ufoReport)
    var row = d3.select("tbody").append("tr");
    Object.values(ufoReport).forEach(v => {
        // console.log(v);
        row.append("td").text(v);
    })
})
//date picker


// function to convert strings to title case.  Credit: // https://gist.github.com/SonyaMoisset/aa79f51d78b39639430661c03d9b1058#file-title-case-a-sentence-for-loop-wc-js
var toTitleCase = function (str) {
	str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
};
//function to return unique values of a list
function uniqueValues(value, index, self){
    return self.indexOf(value) === index
}



// map header values including city,state,country, and shape to a unique list for 
// drop down selection options
var dates = tableData.map(siting => siting.datetime).filter(uniqueValues);
console.log(dates)
var sts = tableData.map(siting => siting.state.toUpperCase()).filter(uniqueValues).sort();
var cities = tableData.map(function(siting) {
    a = toTitleCase(siting.city)
    return(a)
}).filter(uniqueValues).sort();
var country = tableData.map(siting =>siting.country.toUpperCase()).filter(uniqueValues).sort();
var shape = tableData.map(siting =>siting.shape).filter(uniqueValues).sort();
// console.log(dates)
//Load Initial Filter Values
// dates.forEach(function(c) {
//     var x = d3.select("#dateSelect");
//     x.append("option").text(c).attr("value", c);
// })
country.forEach(function(c) {
    var x = d3.select("#countrySelect");
    x.append("option").text(c).attr("value", c.toLowerCase());
})
sts.forEach(function(c) {
    var x = d3.select("#stateSelect");
    x.append("option").text(c).attr("value", c.toLowerCase());
})
cities.forEach(function(c) {
    var x = d3.select("#citySelect");
    x.append("option").text(c).attr("value", c.toLowerCase());
})
shape.forEach(function(c) {
    var x = d3.select("#shapeSelect");
    x.append("option").text(c).attr("value", c);
})
