const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let initialized = false
// console.log(sampleValues)
// // Slice top 10 OTUs for plotting
// slicedData = sampleValues.slice(0,10)
// // Reverse data to accommodate Plotly's defaults
// reversedData = sampleValues.reverse()

// Display the default plot

function updateBar(data,subject_id){
  console.log(`updateBar ${subject_id}`);
  //get otu_ids
  let id_dictionary = findDictionary(data["samples"],'id',subject_id)

  //values for bar graph
  sampleValues = id_dictionary["sample_values"]
  //sampleValuesReversed = sampleValues.reverse()
  top_10_sampleValues = sampleValues.slice(0,10)
  //Reversing to graph in descending order
  reversed_top10Samples = top_10_sampleValues.reverse()
  
  console.log(top_10_sampleValues)

  //labels for bar graph
  otu_ids_array = id_dictionary["otu_ids"]
  //otu_ids_reversed = otu_ids_array.reverse()
  top_10_otuIDs = otu_ids_array.slice(0,10)
  //Reversing to graph in descending order
  reversed_otuIDs = top_10_otuIDs.reverse()

  yaxislabels = []
  for(i=0; i< reversed_otuIDs.length; i++){
    yaxislabels.push("OTU " + reversed_otuIDs[i])
  }


  console.log(top_10_otuIDs)
  console.log(yaxislabels)
  //hovertext for bar graph
  otu_labels = id_dictionary["otu_labels"].slice(0,10)
  console.log(otu_labels)

  
  let bar_data = [{
    x: reversed_top10Samples,
    y: yaxislabels,
    text: yaxislabels,
    type: "bar",
    orientation:"h"
  }]


  let layout = {
    title: "Top 10 OTU IDs for Subject " + subject_id
  }

  if(!initialized){
    Plotly.newPlot("bar",bar_data,layout);
    let initialized = true
  }
  else{
    updatePlotly(bar_data)
  }
  
}

function findDictionary(arr,key,value){
  for(i=0; i < arr.length; i++){
    if(arr[i][key] === value){
      return arr[i]
    }
  }
  return null
}

function updateBubble(data,subject_id){

  console.log(`updateBubble ${subject_id}`);
}


function updateDemo(data,subject_id){
  console.log(`updateDemo ${subject_id}`);
  console.log(data);
}


function optionChanged(subject_id){
  d3.json(url).then(function(data){
    updateBar(data, subject_id);
    updateBubble(data, subject_id);
    updateDemo(data, subject_id);
  });
}


function init() {
  let dropdownMenu = d3.select("#selDataset");
  d3.json(url).then(function(data){
    subject_ids = data.names;

    // dropdownMenu.append("option").attr("value", "940").text("940");
    for(i = 0; i < subject_ids.length; i++){
      dropdownMenu.append("option").attr("value", subject_ids[i]).text(subject_ids[i]);
    }
    optionChanged(subject_ids[0]);
  });
}   

// Plotly.newPlot("plot",traceData,layout)
function updatePlotly(newdata) {
  Plotly.restyle("bar", "values", [newdata]);
}

init();