(function(){
	var settings = {
		pagnation:true,
		autoPlay:true,
		speed:3000,
		height:327,
		width:960
	}
	$.fn.vslide = function(options,data){
		var opts = $.extend({},settings,options);
		//add stylesheet dynamically
		$('head').append('<link rel="stylesheet" href="style.css" type="text/css" />');
		
		return this.each(function(){			
			var that = $(this);
			//globe timer
			var timer;
			//bulid the html
			var slider = $('<div>',{id:'vslider'});
			slider.appendTo(that);
			var holder = $('<div>',{id:'vholder'});
			holder.appendTo(slider);
			var list = $('<ul>',{id:'imglist'});
			list.appendTo(holder);
			var link = $('<ul>',{id:'vthumb'});
			link.appendTo(holder);
			var loading = $('<div>',{id:'loading'});
			holder.css({height:opts.height,width:opts.width,position:'relative',border:'1px solid #ccc'});
			loading.appendTo(holder);
			loading.css({position:'absolute',left:'50%',top:'50%'});
			loading.append('<img src="89.gif" alt="loading plz wait"/>');
			//check the img fully loaded, loop throught the img
			var j = 0; 
			var len = data.length;
			var loaded = false;
			for( var i = 0; i < len ; i++ ){ 
			    addHandler( i );
			}
			function addHandler( this_i ) {
			    $(document.createElement('img')).attr('src', data[this_i].img ).load(function(){
			        j++;
			        if(j == data.length){
			            loaded = true;
			            conti();
			        }
			    });
			}
			var conti = function(){
				loading.remove();
				for(var i in data){
					var li = $('<li>');
					li.append('<a href='+data[i].link+'><img src="'+data[i].img+'" alt="'+data[i].desc+'" /></a>');
					if(data[i].desc){
						li.append('<div class="caption">'+data[i].desc+'</div>');
					}
					li.appendTo(list);
					if(opts.pagnation){
						var li2 = $('<li>');
						li2.append('<a href="#">'+(i*1+1)+'</a>');
						li2.appendTo(link);
					}
				}

				var posts = list.find('li');
				
				//adding css 
				var size = data.length;
				holder.css({height:opts.height,width:opts.width,position:'relative'});
				list.css({height:opts.height,width:opts.width * size,position:'absolute'});
				list.find('img').css({height:opts.height,width:opts.width});
				
				
				//the rotate main function
				var caption = function(i){
					return posts.eq(i*1).find('.caption');
				}
				var rotate = function(cindex,index){
					if(caption(cindex).length){
						caption(cindex).fadeOut(200);
						caption(cindex).fadeIn(1000);
					}
				   setTimeout(function(){
						list.animate({'left':-opts.width * index},'2000')
					},200);
					links.removeClass('active');
					links.eq(index).addClass('active');
				}
				
				//prepare before lanuch
				if(opts.pagnation){
					var links = link.find('li');
					links.first().addClass('active');
				}
				var play = function(cindex,index){
					var timer = setInterval(function(){
						rotate(cindex,index);
						cindex++;
						index++;
						if(index == size){
							cindex = (size*1 - 1);
							index = 0;
						}
						if(cindex == size){
							cindex = 0;
						}
					},opts.speed);
					return timer;
				}
				//first time auto play
				if(opts.autoPlay){
					var cindex = 0;
					var index = 1;
					timer = play(cindex,index);
				} 
				
				//bind a click event
				if(opts.pagnation){
					links.bind('click',function(){
						clearTimeout(timer);
						var that = $(this);
						var index = that.index();
						var cindex = links.index($('.active'));
						rotate(cindex,index);
						//continue autoplay
						cindex = index;
						if(cindex == (size-1)){
							index= 0;
						}else{
							index++;
						}
						if(opts.autoPlay){
							timer = play(cindex,index);
						} 
						return false;
					})
				}
			}
			

		})
		
	}
})(jQuery)
