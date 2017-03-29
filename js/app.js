require('../css/styles.scss')

var d3 = require('d3')
var $ = require('jquery')
var _ = require('underscore')

var data = [
  {
    "scheme": "Mahatma Gandhi National Rural Employment Gurantee Act (MGNREGA)",
    "ministry": "Ministry of Rural Development",
    "notification": new Date (2017,0,3),
    "deadline_to_enroll": new Date (2017,2,31),
    "desc": null,
    "link": "http://nrega.nic.in/netnrega/writereaddata/Circulars/2001173479.pdf"
  },
  {
    "scheme": "Central Sector Scheme of Stipend Component to Children in Special Training Centres",
    "ministry": "Ministry of Labour and Employment",
    "notification": new Date (2017,2,24),
    "deadline_to_enroll": new Date (2017,8,30),
    "desc": null,
    "link": "http://nrega.nic.in/netnrega/writereaddata/Circulars/2001173479.pdf"
  },
  // {
  //   "scheme": "PDS",
  //   "ministry": "",
  //   "notification": "29-Dec-14",
  //   "deadline_to_enroll": "",
  //   "desc": null,
  //   "link": "http://pdsportal.nic.in/Files/Do%20Lr%20Sir_0001.pdf"
  // },
  {
    "scheme": "Sarva Shiksha Abhiyan",
    "ministry": "MINISTRY OF HUMAN RESOURCE DEVELOPMENT",
    "notification": new Date (2017,2,2),
    "deadline_to_enroll": new Date (2017,5,30),
    "desc": "This notification shall come into effect from the date of its publication in all States and Union Territories except the States of Assam, Meghalaya and Jammu and Kashmir.",
    "link": "http://egazette.nic.in/WriteReadData/2017/174484.pdf"
  },
  {
    "scheme": "PAN Card/I-T Returns",
    "ministry": "MINISTRY OF FINANCE",
    "notification": new Date (2017,2,22),
    "deadline_to_enroll": new Date (2017,6,1),
    "desc": "This notification shall come into effect from the date of its publication in all States and Union Territories except the States of Assam, Meghalaya and Jammu and Kashmir.",
    "link": "http://www.hindustantimes.com/business-news/now-aadhaar-a-must-to-file-income-tax-returns-and-apply-for-pan-card/story-71CBEXGGD8yd9iFjUn4oNI.html"
  },
  {
    "scheme": "STEP Scheme for women",
    "ministry": "Women and Child Development",
    "notification": new Date (2017,1,25),
    "deadline_to_enroll": new Date (2017,5,30),
    "desc": "Support to Training and Employment Programme (STEP) Scheme for women",
    "link": "http://www.wcd.nic.in/sites/default/files/NOTIFICATION%20-%20PEW-STEP.pdf"
  },
  {
    "scheme": "Swadhar Greh Scheme",
    "ministry": "Women and Child Development",
    "notification": new Date(2017,1,23),
    "deadline_to_enroll": new Date(2017,8,30),
    "desc": "Women victims of unfortunate circumstances who are in need of institutional support for rehabilitation so that they could lead their life with dignity and the Scheme is a Sub-Scheme of Centrally Sponsored Umbrella Scheme called Swadhar Greh Scheme",
    "link": "http://egazette.nic.in/WriteReadData/2017/174364.pdf"
  },
  {
    "scheme": "Ujjawala Scheme",
    "ministry": "Women and Child Development",
    "notification": new Date(2017,1,23),
    "deadline_to_enroll": new Date(2017,2,31),
    "desc": "Prevention of trafficking and rescue, rehabilitation, and reintegration of victims of trafficking for commercial sexual exploitation",
    "link": "http://egazette.nic.in/WriteReadData/2017/174365.pdf"
  },
  {
    "scheme": "Saakshar Bharat",
    "ministry": "MINISTRY OF HUMAN RESOURCE DEVELOPMENT",
    "notification": new Date(2017,1,21),
    "deadline_to_enroll": new Date(2018,2,31),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174524.pdf"
  },
  {
    "scheme": "Central Scholarship Schemes for students with disabilities",
    "ministry": "MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT",
    "notification": new Date(2017,2,3),
    "deadline_to_enroll": new Date(2017,4,30),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174527.pdf"
  },
  {
    "scheme": "Skill Training of Persons with Disabilities",
    "ministry": "MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT",
    "notification": new Date(2017,2,3),
    "deadline_to_enroll": new Date(2017,4,30),
    "desc": "Under the Central Sector Scheme for Implementation of Persons with Disability Act, 1995",
    "link": "http://egazette.nic.in/WriteReadData/2017/174530.pdf"
  },
  {
    "scheme": "Scheme of Assistance to Disabled Persons for assistive devices.",
    "ministry": "MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT",
    "notification": new Date(2017,2,3),
    "deadline_to_enroll": new Date(2017,4,30),
    "desc": " for Purchase and, or, Fitting of Aids and Appliances, assistive devices are given to Divyangjan with an aim to improve their independent functioning and to limit the extent of disability and occurrence of secondary disability;",
    "link": "http://egazette.nic.in/WriteReadData/2017/174521.pdf"
  },
  {
    "scheme": "Community health workers Accredited Social Health Activists (ASHA)",
    "ministry": "MINISTRY OF HEALTH AND FAMILY WELFARE",
    "notification": new Date(2017,1,28),
    "deadline_to_enroll": new Date(2017,2,31),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174522.pdf"
  },
  {
    "scheme": "National Health Mission",
    "ministry": "MINISTRY OF HEALTH AND FAMILY WELFARE",
    "notification": new Date(2017,1,28),
    "deadline_to_enroll": new Date(2017,2,31),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174523.pdf"
  },
  {
    "scheme": "National Career Services",
    "ministry": "MINISTRY OF LABOUR AND EMPLOYMENT",
    "notification": new Date(2017,1,27),
    "deadline_to_enroll": new Date(2017,1,27),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174402.pdf"
  },
  // {
  //   "scheme": "National Career services - Stipend to Trainees under the Scheme of Welfare for the Scheduled Castes and the Scheduled Tribes Job-seekers through Coaching, Guidance and Vocational Training implemented by the National Career Services Centres for the Scheduled Castes and the Scheduled Tribes (Erstwhile Coaching cum Guidance Centre for the Scheduled Castes and the Scheduled Tribes)",
  //   "ministry": "MINISTRY OF LABOUR AND EMPLOYMENT",
  //   "notification": new Date(2017,2,27),
  //   "deadline_to_enroll": new Date(2017,2,27),
  //   "desc": "Aadhar is said to be preferable in 2016 - http://www.labour.nic.in/sites/default/files/specialadvt01.pdf",
  //   "link": "http://egazette.nic.in/WriteReadData/2017/174402.pdf"
  // },
  // {
  //   "scheme": "National Career services - Stipend to Persons with Disabilities defined under the Right of Person With Disabilities (RPwD) Act, 2016 under the Scheme of National Career Services Centres for Differently Abled (Erstwhile Vocational Rehabilitation Centre for Handicapped)",
  //   "ministry": "MINISTRY OF LABOUR AND EMPLOYMENT",
  //   "notification": new Date(2017,2,27),
  //   "deadline_to_enroll": new Date(2017,2,27),
  //   "desc": null,
  //   "link": "http://egazette.nic.in/WriteReadData/2017/174402.pdf"
  // },
  {
    "scheme": "Conduct of Yoga Classes at Grih Kalyan Kendras",
    "ministry": "MINISTRY OF PERSONNEL, PUBLIC GRIEVANCES AND PENSIONS",
    "notification": new Date(2017,1,15),
    "deadline_to_enroll": new Date(2017,1,28),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174165.pdf"
  },
  {
    "scheme": "Assistance for come and play scheme",
    "ministry": "MINISTRY OF PERSONNEL, PUBLIC GRIEVANCES AND PENSIONS",
    "notification": new Date(2017,1,15),
    "deadline_to_enroll": new Date(2017,1,28),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174165.pdf"
  },
  {
    "scheme": "Annual Grant to Grih Kalyan Kendras",
    "ministry": "MINISTRY OF PERSONNEL, PUBLIC GRIEVANCES AND PENSIONS",
    "notification": new Date(2017,1,15),
    "deadline_to_enroll": new Date(2017,1,28),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174165.pdf"
  },
  {
    "scheme": "Coaching Academies and summer camps by the Central Civil Services Cultural and Sports Board",
    "ministry": "MINISTRY OF PERSONNEL, PUBLIC GRIEVANCES AND PENSIONS",
    "notification": new Date(2017,1,15),
    "deadline_to_enroll": new Date(2017,1,28),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174165.pdf"
  },
  {
    "scheme": " Centrally Sponsored Scholarship Schemes for SC+OBC",
    "ministry": "MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT",
    "notification": new Date(2017,1,16),
    "deadline_to_enroll": new Date(2017,2,31),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174186.pdf"
  },
  {
    "scheme": "National Means Cum-Merit Scholarship Scheme (NMMSS)",
    "ministry": "MINISTRY OF HUMAN RESOURCE DEVELOPMENT",
    "notification": new Date(2017,1,15),
    "deadline_to_enroll": new Date(2017,4,30),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174187.pdf"
  },
  {
    "scheme": "Army, Navy, Airforce Pensions",
    "ministry": "MINISTRY OF DEFENCE",
    "notification": new Date(2017,1,30),
    "deadline_to_enroll": new Date(2017,4,30),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174639.pdf"
  },
  {
    "scheme": "Pradhan Mantri Ujjwala Yojana (PMUY)",
    "ministry": "MINISTRY OF PETROLEUM AND NATURAL GAS",
    "notification": new Date(2017,2,6),
    "deadline_to_enroll": new Date(2017,4,31),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174618.pdf"
  },
  {
    "scheme": "Central Sector Scheme to aid the students in education, and research in science and technology development.",
    "ministry": "MINISTRY OF SCIENCE AND TECHNOLOGY",
    "notification": new Date(2017,2,9),
    "deadline_to_enroll": new Date(2017,8,30),
    "desc": "Central Sector Scheme to aid the students in education, and research in Science and technology development. The schemes viz. DISHA Programme, INSPIRE Award, INSPIRE Scholarship, INSPIRE Internship, INSPIRE Fellowship and INSPIRE Faculty (hereinafter referred toas the Schemes) are implemented through Government or Non-Government Academic Institutions (hereinafter referredto as the Implementing Agencies)",
    "link": "http://egazette.nic.in/WriteReadData/2017/174686.pdf"
  },
  {
    "scheme": "Mission for Integrated Development of Horticulture",
    "ministry": "MINISTRY OF AGRICULTURE AND FARMERS WELFARE",
    "notification": new Date(2017,2,10),
    "deadline_to_enroll": new Date(2017,3,1),
    "desc": "It has six sub-schemes, namely, the National Horticulture Mission (NHM), Horticulture Mission for North East & Himalayan States (HMNEH), National Agroforestry & Bamboo Mission (NABM), National Horticulture Board (NHB), Coconut Development Board (CDB), and the Central Institute for Horticulture (CIH), Nagaland, out of which the National Horticulture Mission, and the Horticulture Mission for North East and Himalayan States are centrally sponsored schemes and the rest of the schemes are central sector schemes;",
    "link": "http://egazette.nic.in/WriteReadData/2017/174731.pdf"
  },
  {
    "scheme": " Agri-Clinics and Agri-Business Centres (AC&ABC)",
    "ministry": "MINISTRY OF AGRICULTURE AND FARMERS WELFARE",
    "notification": new Date(2017,2,22),
    "deadline_to_enroll": new Date(2017,2,31),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174914.pdf"
  },
  {
    "scheme": "Self Employment Scheme for Rehabilitation of Manual Scavengers (SRMS)",
    "ministry": "MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT",
    "notification": new Date(2017,2,17),
    "deadline_to_enroll": new Date(2017,5,30),
    "desc": "Under this scheme grants are provided to National Safai Karamcharis Finance and Development Corporation (hereinafter referred to as NSKFDC)",
    "link": "http://egazette.nic.in/WriteReadData/2017/174851.pdf"
  }
]

data.forEach(function(d){
  d.difference = d.deadline_to_enroll - d.notification
})
sortedByNotification = _.sortBy(data,'notification')
sortedByDeadline = _.sortBy(data,'deadline_to_enroll')
data = _.sortBy(data,'difference')
var date_format_axis = d3.timeFormat("%d %b");


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
        .style('width',function(d){
          return (xScale(d.deadline_to_enroll)/(xScale(new Date(2018, 2, 31))))*100+"%"
        })


  chart.append('div')
        .attr('class','chart-line c-line')
        .style('left',function(d){
          return (xScale(d.notification)/(xScale(new Date(2018, 2, 31))))*100+"%"
        })
        .style('width',function(d){
          return (xScale(d.deadline_to_enroll)-xScale(d.notification))/(xScale(new Date(2018, 2, 31)))*100+"%"
        })

  chart.append('div')
        .attr('class','dot notification')
        .style('left',function(d){
          return (xScale(d.notification)/(xScale(new Date(2018, 2, 31))))*100+"%"
        })

  chart.append('div')
        .attr('class','dot deadline')
        .style('left',function(d){
          return (xScale(d.deadline_to_enroll)/(xScale(new Date(2018, 2, 31))))*100+"%"
        })

  chart.append('p')
        .attr('class','diff')
        .text(function(d){return ((d.deadline_to_enroll-d.notification)/(1000 * 3600 * 24)) + ' days'})
        .style('left',function(d){
          return (xScale(d.deadline_to_enroll)/(xScale(new Date(2018, 2, 31))))*100+"%"
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

  chart.append('p')
        .attr('class','annotation ann-info dd')
        .text(function(d){
          if (date_format_axis(d.deadline_to_enroll) != date_format_axis(d.notification)) {
            return 'Deadline to enroll'
          } else {
            return ''
          }
        })
        .style('left',function(d){
          return (xScale(d.deadline_to_enroll)/(xScale(new Date(2018, 2, 31))))*100+"%"
        })

  chart.append('p')
        .attr('class','annotation ann-notif')
        .text(function(d){return date_format_axis(d.notification)})
        .style('left',function(d){
          return (xScale(d.notification)/(xScale(new Date(2018, 2, 31))))*100+"%"
        })

  chart.append('p')
        .attr('class','annotation ann-deadline')
        .text(function(d){
          if (date_format_axis(d.deadline_to_enroll) != date_format_axis(d.notification)) {
            return date_format_axis(d.deadline_to_enroll)
          } else {
            return ''
          }
        })
        .style('left',function(d){
          return (xScale(d.deadline_to_enroll)/(xScale(new Date(2018, 2, 31))))*100+"%"
        })

  lines.append('p')
        .attr('class','scheme-desc')
        .text(function(d){return d.desc})
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
        .duration(500)
        .style('opacity',0)
    
    d3.select('.line-group')
      .transition()
      .delay(600)
      .remove()
    setTimeout(function(){
      appendThings(sortedByNotification)
    },650)
    

  } else if ($(this).hasClass('time')){

    d3.selectAll('.group')
        .transition()
        .duration(500)
        .style('opacity',0)

     d3.select('.line-group')
      .transition()
      .delay(600)
      .remove()

    setTimeout(function(){
      appendThings(data)
    },650)
    

  } else {

    d3.selectAll('.group')
        .transition()
        .duration(500)
        .style('opacity',0)

     d3.select('.line-group')
      .transition()
      .delay(600)
      .remove()

    setTimeout(function(){
      appendThings(sortedByDeadline)
    },650)
  }
  
})

// function group

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}