d3.json("/samples.json").then(function(jsonData) {
    console.log(jsonData);
    var metadata = jsonData.metadata;
    var samples = jsonData.samples;
    var names = jsonData.names;
    console.log(metadata)
    samples.sort(function(a, b) {
        return parseFloat(b.sample_values) - parseFloat(a.sample_values);
      });
    samples = samples.slice(0, 10);
    samples = samples.reverse();
    console.log(samples)
    var trace1 = {
        x: samples.map(row => row.otu_ids),
        y: samples.map(row => row.sample_values),
        text: samples.map(row => row.otu_labels),
        type: "bar",
        orientation: "h"
  };
  var chartData = [trace1];
  var layout = {
    title: "Greek gods search results",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };
  Plotly.newPlot("plot", chartData, layout);
});