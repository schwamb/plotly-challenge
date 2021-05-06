function optionChanged(value) {

  var userID = window.rawData.metadata.find(data => data.id === Number(value));
  refreshUserIDs(userID);

  var chartData = window.rawData.samples.find(data => data.id === value);
  var chartData2 = window.rawData.samples;
  var gaugeData2 = window.rawData.metadata;
  var gaugeData = window.rawData.metadata.find(data => data.id === parseInt(value))
  
  barChart(chartData);
  bubbleChart(chartData);
  gaugeChart(gaugeData)
 console.log(gaugeData)
//  console.log(chartData2)
}

function refreshUserIDs(userID) {
  var panel = d3.select("#sample-metadata");
  panel.html("");
  Object.entries(userID).forEach(([key, value]) => {
      panel.append("span")
          .html(`${key} : ${value}`)
          .append("br");
  });
}

function barChart(chartData) {
    var x_data = chartData.sample_values.slice(0, 10).reverse();
    var labels = chartData.otu_labels.slice(0,10).reverse();
    var y_data = chartData.otu_ids.map(row => `OTU ${row}`).slice(0, 10).reverse();

    var trace1 = {
      type: "bar",
      x: x_data,
      y: y_data,
      text: labels,
      orientation: "h"
    };
    var layout = {
      height: 500,
      width: 500
    }
    var data = [trace1];
    Plotly.newPlot("bar", data, layout);
};

function bubbleChart(chartData) {
    var x_bubble = chartData.otu_ids;
    var y_bubble = chartData.sample_values;
    var label_bubble = chartData.otu_labels;
    // console.log(label_bubble)
    var trace2 = {
      x: x_bubble,
      y: y_bubble,
      mode: 'markers',
      marker: {
        color: x_bubble,
        size: y_bubble
      },
      text: label_bubble
    };
    var layout = {
      height: 600,
      width: 1500
    };
    var data = [trace2]
    Plotly.newPlot('bubble', data, layout);
};

function gaugeChart(gaugeData) {
  var gauge_value = parseInt(gaugeData.wfreq);
  console.log(gauge_value)
  var trace3 = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      title: { text: "Belly Button Washing Frequency per Week" },
      type: "indicator",
      mode: "gauge+number",
      value: gauge_value,
      gauge: {
        axis: { range: [null, 9] },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 1], color: "#ffe6e6" },
          { range: [1, 2], color: "#ffb3b3" },
          { range: [2, 3], color: "#ff8080" },
          { range: [3, 4], color: "#ff4d4d" },
          { range: [4, 5], color: "#ff1a1a" },
          { range: [5, 6], color: "#e60000" },
          { range: [6, 7], color: "#b30000" },
          { range: [7, 8], color: "#800000" },
          { range: [8, 9], color: "#4d0000" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 9
        }
      }
    }
  ];
  var data = trace3;
  var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);

};
function init() {
  var location = "/samples.json";
  d3.json(location).then(function (data) {
      window.rawData = data;

      // Add default option called Select in the dropdown
      var select = d3.select("#selDataset");
      options = select.selectAll('option')
          .data(data.names)
          .enter()
          .append("option")
          .attr("value", value => value)
          .text(text => text);

      if(data.names.length > 0)
      {
          optionChanged(data.names[0]);
      }
  });
}

init();