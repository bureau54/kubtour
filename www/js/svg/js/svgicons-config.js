var svgIconConfig = {
	volume : {
		url : 'svg/volume.svg',
		animation : [
			{ 
				el : 'path:nth-child(1)', 
				animProperties : { 
					from : { val : '{"transform" : "t-10 0 s0 32 32"}' }, 
					to : { val : '{"transform" : "t0 0 s1 32 32", "opacity" : 1}', before : '{"transform" : "t-10 0 s0 32 32"}', delayFactor : .5 }
				} 
			},
			{ 
				el : 'path:nth-child(2)', 
				animProperties : { 
					from : { val : '{"transform" : "t-10 0 s0 32 32"}', delayFactor : .25 }, 
					to : { val : '{"transform" : "t0 0 s1 32 32", "opacity" : 1}', before : '{"transform" : "t-10 0 s0 32 32"}', delayFactor : .25 }
				} 
			},
			{ 
				el : 'path:nth-child(3)', 
				animProperties : { 
					from : { val : '{"transform" : "t-10 0 s0 32 32"}', delayFactor : .5 }, 
					to : { val : '{"transform" : "t0 0 s1 32 32", "opacity" : 1}', before : '{"transform" : "t-10 0 s0 32 32"}' }
				} 
			}
		]
	},
	play : {
		url : 'js/svg/svg/play.svg',
		animation : [
			{ 
				el : 'path', 
				animProperties : { 
					from : { val : '{"path" : "M 18.741071,52 31.30178,42.531655 45.258928,31.887987 18.741071,12 z"}' }, 
					to : { val : '{"path" : "m 12.5,52 39,0 0,-40 -39,0 z"}' }
					
				} 
			}
		]
	}
};