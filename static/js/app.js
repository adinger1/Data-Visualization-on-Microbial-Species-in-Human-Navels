const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(function(data){
    console.log(data);
});

let ids = Object.values(data.names)
console.log(ids);

let sampleValues = data.sort((a,b) => b.samples.sampleValues - a.samples.sampleValues)
console.log(sampleValues)
// Slice top 10 OTUs for plotting
slicedData = sampleValues.slice(0,10)
// Reverse data to accommodate Plotly's defaults
reversedData = sampleValues.reverse()

// Display the default plot
function init() {
    let data = [{
      values: australia,
      labels: labels,
      type: "bar",
      orientation:'h'
    }];
  
    let layout = {
      height: 600,
      width: 800
    };
  
    Plotly.newPlot("plot", data, layout);
}

function getData(){
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a letiable
    let dataset = dropdownMenu.property("value");
    // Initialize an empty array for the country's data
    let plot_data = [];

    if(names.includes(dataset)){
      //plot_data = 
    }

}
let trace1 = {
    x: reversedData.map(object => object.sample_values),
    y: reversedData.map(object => object.otu_ids),
    text: reversedData.map(object => object.otu_labels),
    type:"bar",
    orientation:"h"
};

let traceData = [trace1]

let layout = {
    title: "Top 10 OTU IDs",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

Plotly.newPlot("plot",traceData,layout)
function updatePlotly(newdata) {
  Plotly.restyle("bar", "values", [newdata]);
}

init();