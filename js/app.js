require('../css/styles.scss')

var d3 = require('d3')
var $ = require('jquery')
var _ = require('underscore')

data.forEach(function(d){
  if (d.deadline_to_enroll!='NA'){
    d.difference = (d.deadline_to_enroll-d.notification)/(1000 * 3600 * 24)
  } else{
    d.difference = 10000000000000000
  }
})

var total_things = data.length,
    non_welfare = _.where(data,{welfare: 'N'}).length,
    welfare = _.where(data,{welfare: 'Y'}).length,
    employment = _.where(data,{type: 'employment'}).length,
    subsidy = _.where(data,{type: 'subsidy'}).length,
    scholarship = _.where(data,{type: 'scholarship'}).length

$('.total-things').text(total_things)
$('.non-welfare').text(non_welfare)
$('.welfare').text(welfare)
$('.employment').text(employment)
$('.subsidy').text(subsidy)
$('.scholarship').text(scholarship)

sortedByNotification = _.sortBy(data,'notification').reverse()
sortedByDeadline = _.sortBy(data,function(d){
  if (d.deadline_to_enroll!='NA'){
    return d.deadline_to_enroll
  } else {
    return -1
  }
  
}).reverse()
data = _.sortBy(data,'difference')
var date_format_axis = d3.timeFormat("%d %b");
var date_format_axis_w_yr = d3.timeFormat("%d %b %Y");



var xScale = d3.scaleTime()
                .domain([new Date(2017, 0, 1), new Date(2018, 2, 31)])
                .range([0,1])
var yScale = d3.scaleBand()
                .domain(Array.apply(null, {length: data.length}).map(Number.call, Number))
                .range([0,1])
appendThings(sortedByNotification)
function appendThings(selected_data){
  lines = d3.select('.interactive')
            .append('div')
            .attr('class','line-group')
            .selectAll('.group')
            .data(selected_data, function(d){ return d.scheme; })
            .enter()
            .append('div')
            .attr('class',function(d,i){return 'group g-'+sortedByNotification.indexOf(d)})
            .on('click',expandFunc)
  lines.style('opacity',0)
  linesg1 = lines.append('div')
                  .attr('class','panel panel-top')

  linesg1.append('h2')
        .attr('class','scheme-name')
        .text(function(d){return d.scheme})

  linesg1.append('h3')
        .attr('class','ministry-name')
        .text(function(d){return toTitleCase(d.ministry)})


  expand = lines.append('div')
        .attr('class','panel panel-expand')
        .html('<i class="fa fa-caret-down" aria-hidden="true"></i>')
  
  expand.append('span')
        .attr('class','det-ins')
        .text('show info') 

  linesg2 = lines.append('div')
        .attr('class','panel panel-bottom')

  chart = linesg2.append('div')
        .attr('class','chart')

  chart.append('div')
        .attr('class','chart-back c-line')
        .style('width', '100%')


  chart.append('div')
        .attr('class','chart-line c-line')
        .style('left',function(d){
          return (xScale(d.notification)/(xScale(new Date(2018, 2, 31))))*100+"%"
        })
        .style('width',function(d){
          if (d.deadline_to_enroll!="NA"){
            return (xScale(d.deadline_to_enroll)-xScale(d.notification))/(xScale(new Date(2018, 2, 31)))*100+"%"
          } else {
            return '0%'
          }
        })

  chart.append('div')
        .attr('class','dot notification')
        .style('left',function(d){
          return (xScale(d.notification)/(xScale(new Date(2018, 2, 31))))*100+"%"
        })

  chart.append('div')
        .attr('class','dot deadline')
        .style('left',function(d){
          if (d.deadline_to_enroll!='NA'){
            return (xScale(d.deadline_to_enroll)/(xScale(new Date(2018, 2, 31))))*100+"%"
          } else {
            return '0%'
          }
        })
        .style('opacity',function(d){
          if (d.deadline_to_enroll=='NA'){
            return 0
          }
        })

  chart.append('p')
        .attr('class','diff')
        .text(function(d){
          if (d.deadline_to_enroll!='NA'){
            // var diff = (d.deadline_to_enroll-d.notification)/(1000 * 3600 * 24)
            if (d.difference<0){
              return (d.difference*-1) + ' days ago'
            } else {
              return (d.difference) + ' days'
            }
          } else {
            return 'Deadline not specified'
          }
        })
        .style('left',function(d){
          if (d.deadline_to_enroll!='NA'){
            // var diff = (d.deadline_to_enroll-d.notification)/(1000 * 3600 * 24)
            if (d.difference<0){
              return (xScale(d.notification)/(xScale(new Date(2018, 2, 31))))*100+"%"
            } else {
              return (xScale(d.deadline_to_enroll)/(xScale(new Date(2018, 2, 31))))*100+"%"
            }
            
          } else {
            return (xScale(d.notification)/(xScale(new Date(2018, 2, 31))))*100+"%"
          }
        })
        .style('font-size',function(d){
          // var diff = (d.deadline_to_enroll-d.notification)/(1000 * 3600 * 24)
          if (d.deadline_to_enroll=='NA' || d.difference < 0){
            return '12px'
          }
        })
        .style('width',function(d){
          // var diff = (d.deadline_to_enroll-d.notification)/(1000 * 3600 * 24)
          if (d.deadline_to_enroll=='NA' || d.difference < 0){
            return '80px'
          }
        })

  chart.append('p')
        .attr('class','annotation ann-info notif')
        .text(function(d){
                    if (date_format_axis(d.deadline_to_enroll) != date_format_axis(d.notification)) {
                      return 'Notification date'
                    } else {
                      return 'Notification date and deadline'
                    }
        })
        .style('left',function(d){
          return (xScale(d.notification)/(xScale(new Date(2018, 2, 31))))*100+"%"
        })
        .style('text-align',function(d){
          // var diff = (d.deadline_to_enroll-d.notification)/(1000 * 3600 * 24)
          if (d.difference<0){
            return 'left'
          }
        })
        .style('margin-left',function(d){
          // var diff = (d.deadline_to_enroll-d.notification)/(1000 * 3600 * 24)
          if (d.difference<0){
            return '0'
          }
        })

  chart.append('p')
        .attr('class','annotation ann-info dd')
        .text(function(d){
          if (d.deadline_to_enroll!='NA'){
            if (date_format_axis(d.deadline_to_enroll) != date_format_axis(d.notification)) {
              return 'Deadline to enroll'
            } else {
              return ''
            }
          }
        })
        .style('left',function(d){
          // var diff = (d.deadline_to_enroll-d.notification)/(1000 * 3600 * 24)
          return (xScale(d.deadline_to_enroll)/(xScale(new Date(2018, 2, 31))))*100+"%"
        })
        .style('text-align',function(d){
          // var diff = (d.deadline_to_enroll-d.notification)/(1000 * 3600 * 24)
          if (d.difference<0){
            return 'right'
          }
        })
        .style('margin-left',function(d){
          // var diff = (d.deadline_to_enroll-d.notification)/(1000 * 3600 * 24)
          if (d.difference<0){
            return '-75px'
          }
        })

  chart.append('p')
        .attr('class','annotation ann-notif')
        .text(function(d,i){
          if (i==0){
            return date_format_axis_w_yr(d.notification)
          } else {
            return date_format_axis(d.notification)
          }
        })
        .style('left',function(d){
          return (xScale(d.notification)/(xScale(new Date(2018, 2, 31))))*100+"%"
        })
        .style('text-align',function(d){
          if (d.difference<0){
            return 'left'
          }
        })
        .style('margin-left',function(d){
          if (d.difference<0){
            return '-10px'
          }
        })

  chart.append('p')
        .attr('class','annotation ann-deadline')
        .text(function(d){
          if (d.deadline_to_enroll!='NA'){
            if ((d.deadline_to_enroll).getYear()>117){
              return date_format_axis_w_yr(d.deadline_to_enroll)
            } else {
              if (date_format_axis(d.deadline_to_enroll) != date_format_axis(d.notification)) {
                return date_format_axis(d.deadline_to_enroll)
              } else {
                return ''
              }
            }
            
          } 
        })
        .style('left',function(d){
          return (xScale(d.deadline_to_enroll)/(xScale(new Date(2018, 2, 31))))*100+"%"
        })
        .style('text-align',function(d){
          if (d.difference<0){
            return 'left'
          }
        })
        .style('margin-left',function(d){
          if (d.difference<0){
            return '-30px'
          }
        })

  lines.append('p')
        .attr('class','scheme-desc')
        .html(function(d){
          if (d.link){
            return d.desc + " <a target = '_blank' href='"+d.link+"'>Link to official notification</a>"
          } else {
            return d.desc
          }
        })
        .style('height',0)

  lines.transition()
      .duration(1200)
      .style('opacity',1)

}
function expandFunc(d){
  var growDiv = $(this).find('.scheme-desc')[0]
  if ($(this).hasClass('show')){
    $(this).removeClass('show')
    d3.select(growDiv)
      .transition()
      .duration(500)
      .style('height',0+'px')

    expand.select('span')
        .text('show info') 
  } else {
    $(this).addClass('show')
    d3.select(growDiv)
      .transition()
      .duration(500)
      .style('height',growDiv.scrollHeight+10+'px')

    expand.select('span')
        .text('hide info') 
  }
}

$('.copy.intro span').on('click',function(){
  $('.copy.intro span').removeClass('active')
  $(this).addClass('active')

  if ($(this).hasClass('notification')){

    d3.selectAll('.group')
        .transition()
        .duration(300)
        .style('opacity',0)
    
    d3.select('.line-group')
      .transition()
      .delay(400)
      .remove()
    setTimeout(function(){
      appendThings(sortedByNotification)
    },450)
    

  } else if ($(this).hasClass('time')){

    d3.selectAll('.group')
        .transition()
        .duration(300)
        .style('opacity',0)

     d3.select('.line-group')
      .transition()
      .delay(400)
      .remove()

    setTimeout(function(){
      appendThings(data)
    },450)
    

  } else {

    d3.selectAll('.group')
        .transition()
        .duration(300)
        .style('opacity',0)

     d3.select('.line-group')
      .transition()
      .delay(400)
      .remove()

    setTimeout(function(){
      appendThings(sortedByDeadline)
    },450)
  }
  
})

// function group

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}