// @TODO: YOUR CODE HERE!
d3.csv("data.csv").then(function(data)  {
    console.log(data)

    data.forEach(function(d) {
        d.id = +d.id
    })
})

