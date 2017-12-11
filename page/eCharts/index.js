window.onload = function() {
	var c = echarts.init(document.getElementById("myChart"));

	//	var noise = new SimplexNoise(Math.random);

	function generateData(theta, min, max) {
		var data = [];
		for(var i = 0; i <= 40; i++) {
			for(var j = 0; j <= 40; j++) {
				for(var k = 0; k <= 40; k++) {
					//var value = noise.noise3D(i / 20, j / 20, k / 20);
					var value = Math.random();
					valMax = Math.max(valMax, value);
					valMin = Math.min(valMin, value);
					data.push([i, j, k, value * 2 + 4]);
				}
			}
		}
		return data;
	}
	var valMin = Infinity;
	var valMax = -Infinity;
	var data = generateData(2, -5, 5);
	console.log(valMin, valMax);
	console.log(data);
	var option = {
		visualMap: {
			show: false,
			min: 2,
			max: 6,
			inRange: {
				symbolSize: [0.5, 15],
				color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
				colorAlpha: [0.2, 1]
			}
		},
		xAxis3D: {
			type: 'value'
		},
		yAxis3D: {
			type: 'value'
		},
		zAxis3D: {
			type: 'value'
		},
		grid3D: {
			axisLine: {
				lineStyle: { color: '#fff' }
			},
			axisPointer: {
				lineStyle: { color: '#fff' }
			},
			viewControl: {
				// autoRotate: true
			}
		},
		series: [{
			type: 'scatter3D',
			data: data
		}]
	};

	c.setOption(option);
}