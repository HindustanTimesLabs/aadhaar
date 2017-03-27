require('../css/styles.scss')

var d3 = require('d3')
var $ = require('jquery')
var _ = require('underscore')

var data = _.sortBy([
  {
    "scheme": "NREGA",
    "Ministry": "",
    "notification": new Date (2017,0,3),
    "deadline to enroll": new Date (2017,2,31),
    "desc": null,
    "link": "http://nrega.nic.in/netnrega/writereaddata/Circulars/2001173479.pdf"
  },
  // {
  //   "scheme": "PDS",
  //   "Ministry": "",
  //   "notification": "29-Dec-14",
  //   "deadline to enroll": "",
  //   "desc": null,
  //   "link": "http://pdsportal.nic.in/Files/Do%20Lr%20Sir_0001.pdf"
  // },
  {
    "scheme": "RTE/Sarva Shiksha Abhiyan",
    "Ministry": "MINISTRY OF HUMAN RESOURCE DEVELOPMENT ",
    "notification": new Date (2017,2,2),
    "deadline to enroll": new Date (2017,5,30),
    "desc": "This notification shall come into effect from the date of its publication in all States and Union\nTerritories except the States of Assam, Meghalaya and Jammu and Kashmir. ",
    "link": "http://egazette.nic.in/WriteReadData/2017/174484.pdf"
  },
  {
    "scheme": "Support to Training and Employment Programme (STEP) Scheme for women",
    "Ministry": "Women and Child Development",
    "notification": new Date (2017,1,25),
    "deadline to enroll": new Date (2017,5,30),
    "desc": null,
    "link": "http://www.wcd.nic.in/sites/default/files/NOTIFICATION%20-%20PEW-STEP.pdf"
  },
  {
    "scheme": "Swadhar Greh Scheme: Women victims of unfortunate circumstances who are in need of institutional support for rehabilitation so that they could lead their life with dignity and the Scheme is a Sub-Scheme of Centrally Sponsored Umbrella Scheme called ",
    "Ministry": "Women and Child Development",
    "notification": new Date(2017,1,23),
    "deadline to enroll": new Date(2017,8,30),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174364.pdf"
  },
  {
    "scheme": "Ujjawala Scheme for prevention of trafficking and rescue, rehabilitation, and reintegration of victims of trafficking for commercial sexual exploitation",
    "Ministry": "Women and Child Development",
    "notification": new Date(2017,1,23),
    "deadline to enroll": new Date(2017,2,31),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174365.pdf"
  },
  {
    "scheme": "Saakshar Bharat",
    "Ministry": "MINISTRY OF HUMAN RESOURCE DEVELOPMENT",
    "notification": new Date(2017,1,21),
    "deadline to enroll": new Date(2018,2,31),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174524.pdf"
  },
  // {
  //   "scheme": "Support to NGOs/Institutions/SRCs for Adult Education and Skill Development",
  //   "Ministry": "",
  //   "notification": "",
  //   "deadline to enroll": "",
  //   "desc": null,
  //   "link": ""
  // },
  {
    "scheme": "Central Sector Scholarship Schemes (hereinafter referred to as the Schemes) for education of Students with Disabilities",
    "Ministry": "MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT ",
    "notification": new Date(2017,2,3),
    "deadline to enroll": new Date(2017,4,30),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174527.pdf"
  },
  {
    "scheme": "Skill Training of Persons with Disabilities under the Central Sector Scheme for Implementation of Persons with Disability Act, 1995",
    "Ministry": "MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT",
    "notification": new Date(2017,2,3),
    "deadline to enroll": new Date(2017,4,30),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174530.pdf"
  },
  {
    "scheme": "Scheme of Assistance to Disabled Persons for Purchase and, or, Fitting of Aids and Appliances, assistive devices are given to Divyangjan with an aim to improve their independent functioning and to limit the extent of disability and occurrence of secondary disability;",
    "Ministry": "MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT",
    "notification": new Date(2017,2,3),
    "deadline to enroll": new Date(2017,4,30),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174521.pdf"
  },
  {
    "scheme": "community health workers Accredited Social Health Activists (ASHA) a critical link between the community and the public health system;",
    "Ministry": "MINISTRY OF HEALTH AND FAMILY WELFARE",
    "notification": new Date(2017,1,28),
    "deadline to enroll": new Date(2017,2,31),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174522.pdf"
  },
  {
    "scheme": "National Health Mission",
    "Ministry": "MINISTRY OF HEALTH AND FAMILY WELFARE ",
    "notification": new Date(2017,1,28),
    "deadline to enroll": new Date(2017,2,31),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174523.pdf"
  },
  {
    "scheme": "National Career services",
    "Ministry": "MINISTRY OF LABOUR AND EMPLOYMENT ",
    "notification": new Date(2017,2,27),
    "deadline to enroll": new Date(2017,2,27),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174402.pdf"
  },
  {
    "scheme": "National Career services - Stipend to Trainees under the Scheme of Welfare for the Scheduled Castes and the Scheduled Tribes Job-seekers through Coaching, Guidance and Vocational Training implemented by the National Career Services Centres for the Scheduled Castes and the Scheduled Tribes (Erstwhile Coaching cum Guidance Centre for the Scheduled Castes and the Scheduled Tribes)",
    "Ministry": "MINISTRY OF LABOUR AND EMPLOYMENT ",
    "notification": new Date(2017,2,27),
    "deadline to enroll": new Date(2017,2,27),
    "desc": "Aadhar is said to be preferable in 2016 - http://www.labour.nic.in/sites/default/files/specialadvt01.pdf",
    "link": "http://egazette.nic.in/WriteReadData/2017/174402.pdf"
  },
  {
    "scheme": "National Career services - Stipend to Persons with Disabilities defined under the Right of Person With Disabilities (RPwD) Act, 2016 under the Scheme of National Career Services Centres for Differently Abled (Erstwhile Vocational Rehabilitation Centre for Handicapped)",
    "Ministry": "MINISTRY OF LABOUR AND EMPLOYMENT ",
    "notification": new Date(2017,2,27),
    "deadline to enroll": new Date(2017,2,27),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174402.pdf"
  },
  {
    "scheme": "Conduct of Yoga Classes at Grih Kalyan\nKendras ",
    "Ministry": "MINISTRY OF PERSONNEL, PUBLIC GRIEVANCES AND PENSIONS",
    "notification": new Date(2017,1,15),
    "deadline to enroll": new Date(2017,1,28),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174165.pdf"
  },
  {
    "scheme": "Assistance for come and play scheme ",
    "Ministry": "MINISTRY OF PERSONNEL, PUBLIC GRIEVANCES AND PENSIONS",
    "notification": new Date(2017,1,15),
    "deadline to enroll": new Date(2017,1,28),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174165.pdf"
  },
  {
    "scheme": "Annual Grant to Grih Kalyan Kendras ",
    "Ministry": "MINISTRY OF PERSONNEL, PUBLIC GRIEVANCES AND PENSIONS",
    "notification": new Date(2017,1,15),
    "deadline to enroll": new Date(2017,1,28),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174165.pdf"
  },
  {
    "scheme": "Coaching Academies and summer camps by the\nCentral Civil Services Cultural and Sports Board ",
    "Ministry": "MINISTRY OF PERSONNEL, PUBLIC GRIEVANCES AND PENSIONS",
    "notification": new Date(2017,1,15),
    "deadline to enroll": new Date(2017,1,28),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174165.pdf"
  },
  {
    "scheme": " Centrally Sponsored Scholarship Schemes for SC+OBC",
    "Ministry": "MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT",
    "notification": new Date(2017,1,16),
    "deadline to enroll": new Date(2017,2,31),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174186.pdf"
  },
  {
    "scheme": "National Means Cum-Merit Scholarship Scheme (NMMSS)",
    "Ministry": "MINISTRY OF HUMAN RESOURCE DEVELOPMENT",
    "notification": new Date(2017,1,15),
    "deadline to enroll": new Date(2017,4,30),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174187.pdf"
  },
  {
    "scheme": "Army, Navy, Airforce Pensions",
    "Ministry": "MINISTRY OF DEFENCE",
    "notification": new Date(2017,2,30),
    "deadline to enroll": new Date(2017,4,30),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174639.pdf"
  },
  {
    "scheme": "Pradhan Mantri Ujjwala Yojana ( PMUY)",
    "Ministry": "MINISTRY OF PETROLEUM AND NATURAL GAS",
    "notification": new Date(2017,2,6),
    "deadline to enroll": new Date(2017,4,31),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174618.pdf"
  },
  {
    "scheme": "Central Sector Scheme to aid the students in\neducation, and research in Science and technology development. The schemes viz. DISHA Programme, INSPIRE Award, INSPIRE Scholarship, INSPIRE Internship, INSPIRE Fellowship and INSPIRE Faculty (hereinafter referred toas the Schemes) are implemented through Government or Non-Government Academic Institutions (hereinafter referredto as the Implementing Agencies); ",
    "Ministry": "MINISTRY OF SCIENCE AND TECHNOLOGY",
    "notification": new Date(2017,2,9),
    "deadline to enroll": new Date(2017,8,30),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174686.pdf"
  },
  {
    "scheme": "Mission for Integrated Development of Horticulture has six sub-schemes, namely, the National Horticulture Mission (NHM), Horticulture Mission for North East & Himalayan States (HMNEH), National Agroforestry & Bamboo Mission (NABM), National Horticulture Board (NHB), Coconut Development Board (CDB), and the Central Institute for Horticulture (CIH), Nagaland, out of which the National Horticulture Mission, and the Horticulture Mission for North East and Himalayan States are centrally sponsored schemes and the rest of the schemes are central sector schemes; ",
    "Ministry": "MINISTRY OF AGRICULTURE AND FARMERS WELFARE",
    "notification": new Date(2017,2,10),
    "deadline to enroll": new Date(2017,3,1),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174731.pdf"
  },
  {
    "scheme": " Agri-Clinics and Agri-Business Centres (AC&ABC) ",
    "Ministry": "MINISTRY OF AGRICULTURE AND FARMERS WELFARE",
    "notification": new Date(2017,2,22),
    "deadline to enroll": new Date(2017,2,31),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174914.pdf"
  },
  {
    "scheme": "Self Employment Scheme for Rehabilitation of Manual Scavengers (SRMS)\n(hereinafter referred to as the Scheme) under which grants are provided to National Safai Karamcharis Finance and Development Corporation (hereinafter referred to as NSKFDC); ",
    "Ministry": "MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT",
    "notification": new Date(2017,2,17),
    "deadline to enroll": new Date(2017,5,30),
    "desc": null,
    "link": "http://egazette.nic.in/WriteReadData/2017/174851.pdf"
  }
],'notification')
var date_format_axis = d3.timeFormat("%b '%y");
var date_format = d3.timeFormat("%d %b '%y");


var width = $(window).width()
var height = 800
var margin = {top: 30, bottom: 40, left: 60, right: 30}
var radius = 4
var big_radius = 5.5
var yScale = d3.scaleTime()
                .domain([new Date(2017, 0, 1), new Date(2018, 2, 31)])
                .range([0,height - margin.top - margin.bottom])

var xScale = d3.scaleLinear()
                .domain([0,data.length])
                .range([margin.left,width - margin.left - margin.right])

var yAxis = d3.axisLeft(yScale)
                    .tickSize(-(width-margin.left-margin.right), 0, 0)
                    .ticks(6)
                    .tickFormat(function(d){return date_format_axis(d)})
var voronoi = d3.voronoi()
        .x(function(d,i) { return xScale(i); })
        .y(function(d) { return ((yScale(d.notification)+yScale(d['deadline to enroll']))/2); })
        .extent([[-margin.left, -margin.top], [width + margin.right, height + margin.bottom]]);

var svg = d3.select('.interactive')
            .append('svg')
            .attr('width',width)
            .attr('height',height)
            .append('g')
            .attr('transform','translate('+(margin.left)+","+margin.top+")")

svg.append('g')
    .call(yAxis)
    .attr('class','axis')

lines = svg.append('g')
    .attr('class','line-group')
    .selectAll('.group')
    .data(data)
    .enter()
    .append('g')
    .attr('class',function(d,i){return 'group g-'+i})
    .style('opacity',0.7)
    .attr('transform',function(d,i){return 'translate('+(xScale(i))+",0)"})

lines.append('line')
      .attr('y1',function(d){return yScale(d['deadline to enroll'])})
      .attr('y2',function(d){return yScale(d['notification'])})
      .attr('x1',0)
      .attr('x2',0)

lines.append('circle')
      .attr('cy',function(d){return yScale(d.notification)})
      .attr('r',radius)
      .attr('class','notification')

lines.append('circle')
      .attr('cy',function(d){return yScale(d['deadline to enroll'])})
      .attr('r',radius)
      .attr('class','deadline')

var voronoiGroup = svg.append("g")
      .attr("class", "voronoi");

voronoiGroup.selectAll("path")
  .data(voronoi.polygons(data))
  .enter()
  .append("path")
  .attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; })
  .on("mouseover", mouseover)
  .on("mouseout", mouseout)

annotation1 = svg.append('g')
  .attr('class','annotation-group')
  .style('opacity',0)

annotation2 = svg.append('g')
  .attr('class','annotation-group')
  .style('opacity',0)

annotation1.append('text')
  .attr('class','annotation-notification white')

annotation1.append('text')
  .attr('class','annotation-notification black')

annotation2.append('text')
  .attr('class','annotation-deadline white')

annotation2.append('text')
  .attr('class','annotation-deadline black')

function mouseover(d,i){
  d3.select('.g-'+i)
        .style('opacity',1)
        .selectAll('circle')
        .attr('r',big_radius)

   d3.selectAll('.annotation-group')
        .style('opacity',1)
        .moveToFront()

      d3.selectAll('.annotation-notification')
        .text(date_format(d.data.notification))
        .attr('transform','translate('+(xScale(i)+(width*0.01))+","+(yScale(d.data.notification)+5)+")")

      d3.selectAll('.annotation-deadline')
        .text(date_format(d.data['deadline to enroll']))
        .attr('transform','translate('+(xScale(i)+(width*0.01))+","+(yScale(d.data['deadline to enroll'])+5)+")")
}

function mouseout(d,i){
   d3.select('.g-'+i)
        .style('opacity',0.7)
        .selectAll('circle')
        .attr('r',radius)
}

d3.selection.prototype.moveToFront = function() {  
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };

d3.selection.prototype.moveToBack = function() {  
    return this.each(function() { 
        var firstChild = this.parentNode.firstChild; 
        if (firstChild) { 
            this.parentNode.insertBefore(this, firstChild); 
        } 
    });
};
