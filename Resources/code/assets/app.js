


var svgWidth = 980;
var svgHeight = 620;

//Define margins 
var chartMargins = {
    top: 20,
    right: 40,
    bottom: 20,
    left: 20
};

//Define dimensions of the chart area 
var chartWidth = svgWidth - chartMargins.right - chartMargins.left;
var chartHeight = svgHeight - chartMargins.top - chartMargins.bottom;

//Select div id="scatter" and append svg area to it, set the dimensions 
var svg = d3
            .select("#scatter")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth)

//Append group to SVG area and shift 'translate' to the right and to the bottom 
var chartGroup = svg
                    .append("g")
                    .attr("transform", `translate(${chartMargins.left}, ${chartMargins.top})`);


// // read in csv and cast id as id 
// d3.csv("Data.csv").then(function(healthData)  {

//     healthData.forEach(function(d) {
//         d.poverty = +d.poverty
//         d.age = +d.age
//         d.income = +d.income
//         d.healthcare = +d.healthcare
//         d.obesity = +d.obesity
//         d.smokes = +d.smokes
//     })
//     console.log(healthData)

//     // configure a band scale for the horizontal axis with padding 
//     var xLinearScale = d3
//                         .scaleLinear()
//                         .domain([0, d3.max(healthData, d => d.healthcare)])
//                         .range([0, chartWidth])
    
//     //linear scale for y axis 
//     var yLinearScale = d3
//                         .scaleLinear()
//                         .domain([0, d3.max(healthData, d => d.income)])
//                         .range(chartHeight, 0)
    
//     //create new functions passing scales as arguments 
//     //these will be used to create the charts axes 
//     var bottomAxis = d3.axisBottom(xLinearScale);
//     var leftAxis = d3.axisLeft(yLinearScale);

//     //Append two SVG group elements to the chartGroup area 
//     //create bottom and left axis inside of them 
//     chartGroup.append("g")
//                 .call(leftAxis)
    
//     chartGroup.append("g")
//                 .attr("transform", `translate(0, ${chartHeight})`)
//                 .call(bottomAxis)
    
//     // Create one SVG circle per piece of data 
//     //use the linear and band scales to position each circle within the chart 
//     var circlesGroup = chartGroup.selectAll("circle")
//                 .data(healthData)
//                 .enter()
//                 .append("circle")
//                 .attr("cx", d => xLinearScale(d.healthcare))
//                 .attr("cy", d => yLinearScale(d.income))
//                 .attr("r", "20")
//                 .attr("fill", "blue")
//                 .attr("opacity", ".35")
//     console.log(circlesGroup)
//     // initialize the tooltip
//     // var tooltip = d3.tip()
//     //             .attr("class", "tooltip")
//     //             .offset([80, 60])
//     //             .html(function(d) {
//     //                 return (`healthcare: ${d.healthcare} <br> poverty: ${d.poverty}`)
//     //             });
    
//     //create tooltip in the chartgroup 
//     // chartGroup.call(tooltip);

//     //Create event listeners for mouseover 
//     // circlesGroup.on("mouseover", function(data) { 
//     //     tooltip.show(data, this);
//     // })

//     // //mouseout event 
//     // circlesGroup.on("mouseout", function(data, index) { 
//     //     tooltip.hide(data);
//     // })
                
//     //axis labels 
//     chartGroup.append("text")
//                 .attr("transform", "rotate(-90)")
//                 .attr("y", 0 - chartMargins.left + 40)
//                 .attr("x", 0 - (chartHeight / 2))
//                 .attr("dy", "1em")
//                 .attr("class", "aText")
//                 .text("Poverty Rate")
    
//     // x axis label 
//     chartGroup.append("text")
//                 .attr("transform", `translate(0, ${chartHeight})`)
//                 .attr("class", "aText")
//                 .text("Healthcare coverage %")
// })





d3.csv("Data.csv").then(function(healthData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    healthData.forEach(function(d) {
        d.poverty = +d.poverty;
        d.age = +d.age;
        d.income = +d.income;
        d.healthcare = +d.healthcare;
        d.obesity = +d.obesity;
        d.smokes = +d.smokes;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.healthcare)])
      .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.income)])
      .range([chartHeight, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(20, ${chartHeight})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .attr("transform", `translate(20, 0)`)
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare))
    .attr("cy", d => yLinearScale(d.income))
    .attr("r", "15")
    // .attr("fill", "pink")
    .attr("opacity", ".5");
    var textGroup = chartGroup
          .selectAll('.stateText')
          .data(healthData)
          .enter()
          .append('text')
          .attr('x', d => xLinearScale(d.healthcare))
          .attr('y', d => yLinearScale(d.income))
          .text(d => d.abbr)
          .attr('class', 'stateText')
          .attr('font-size', '12px')
          .attr('text-anchor', 'middle')
          .attr('fill', 'grey')

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`Healthcare: ${d.healthcare}<br>Income: ${d.income}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargins.left + 40)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Average Income Per Capita");

    chartGroup.append("text")
      .attr("transform", `translate(500, ${chartHeight -10})`)
      .attr("class", "axisText")
      .text("Healthcare");
  }).catch(function(error) {
    console.log(error);
  });