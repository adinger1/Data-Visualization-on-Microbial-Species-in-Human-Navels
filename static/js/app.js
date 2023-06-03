const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function updateBar(data,subject_id){
  console.log(`updateBar ${subject_id}`);
  let id_dictionary = findDictionary(data["samples"],'id',subject_id);

  //values for bar graph
  let sampleValues = id_dictionary["sample_values"]
  
  let top_10_sampleValues = sampleValues.slice(0,10)
  //Reversing to graph in descending order
  let reversed_top10Samples = top_10_sampleValues.reverse()
  

  //labels for bar graph
  let otu_ids_array = id_dictionary["otu_ids"]
  
  let top_10_otuIDs = otu_ids_array.slice(0,10)
  //Reversing to graph in descending order
  let reversed_otuIDs = top_10_otuIDs.reverse()

  let yaxislabels = []
  for(i=0; i< reversed_otuIDs.length; i++){
    yaxislabels.push("OTU " + reversed_otuIDs[i])
  }

  //hovertext for bar graph
  let otu_labels = id_dictionary["otu_labels"].slice(0,10)
  //Reversing to align with x and y data
  let otu_labels_reversed = otu_labels.reverse()

  
  let bar_data = [{
    x: reversed_top10Samples,
    y: yaxislabels,
    text: otu_labels_reversed,
    type: "bar",
    orientation:"h"
  }]


  let layout = {
    title: "Top 10 OTU IDs for Subject " + subject_id
  }

  Plotly.newPlot("bar",bar_data,layout);
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
  let id_dictionary = findDictionary(data["samples"],'id',subject_id)

  let otuIDs = id_dictionary["otu_ids"]
  let sampleValues = id_dictionary["sample_values"]
  let otu_labels = id_dictionary["otu_labels"]

  let bubble_data = [{
    x: otuIDs,
    y: sampleValues,
    text: otu_labels,
    mode: 'markers',
    marker: {
      color:otuIDs,
      opacity:0.75,
      size:sampleValues
    }
  }]

  let layout = {
    title:"Samples for Subject " + subject_id
  }

  Plotly.newPlot('bubble',bubble_data,layout)
}


function updateDemo(data,subject_id){
  console.log(`updateDemo ${subject_id}`);
  console.log(data);
  let id_metadata = findDictionary(data["metadata"],'id',parseInt(subject_id))

  let demoTable = d3.select("#sample-metadata");
  let keys = Object.keys(id_metadata)

  d3.selectAll("h6").remove()  
  for(i = 0; i < keys.length; i++){
    let key = keys[i];
    let row = key + ": " + id_metadata[key];
    
    demoTable.append("h6").text(row);
  }

}


function optionChanged(subject_id){
  d3.json(url).then(function(data){
    updateBar(data, subject_id);
    updateBubble(data, subject_id);
    updateDemo(data, subject_id);
  });
}


function init() {
  //Creating dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  d3.json(url).then(function(data){
    subject_ids = data.names;
    for(i = 0; i < subject_ids.length; i++){
      dropdownMenu.append("option").attr("value", subject_ids[i]).text(subject_ids[i]);
    }
    optionChanged(subject_ids[0]);
  });
}   

init();