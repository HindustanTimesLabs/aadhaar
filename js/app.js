require('../css/styles.scss')

var d3 = require('d3')
var $ = require('jquery')
var _ = require('underscore')


d3.selection.prototype.tspans = function(lines, lh) {
    return this.selectAll('tspan')
        .data(lines)
        .enter()
        .append('tspan')
        .text(function(d) { return d; })
        .attr('x', 0)
        .attr('dy', function(d,i) { return i ? lh || 15 : 0; });
};

d3.wordwrap = function(line, maxCharactersPerLine) {
    var w = line.split(' '),
        lines = [],
        words = [],
        maxChars = maxCharactersPerLine || 40,
        l = 0;
    w.forEach(function(d) {
        if (l+d.length > maxChars) {
            lines.push(words.join(' '));
            words.length = 0;
            l = 0;
        }
        l += d.length;
        words.push(d);
    });
    if (words.length) {
        lines.push(words.join(' '));
    }
    return lines;
};

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


var data = [
  {
    "scheme": "MNREGA",
    "ministry": "",
    "notification": new Date (2017,0,3),
    "deadline_to_enroll": new Date (2017,2,31),
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
    "notification": new Date(2017,2,27),
    "deadline_to_enroll": new Date(2017,2,27),
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
    "notification": new Date(2017,2,30),
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
var date_format_axis = d3.timeFormat("%b '%y");
var date_format = d3.timeFormat("%d %b '%y");


var width = ($(window).width()>1000)?1000:($(window).width())
var breakpoint = (width>800)?40:20;
var height = 1200
var margin = {top: 30, bottom: 40, left: (width<1000)?30:100, right: (width<1000)?20:30}
var radius = 4
var big_radius = 5.5
var xScale = d3.scaleTime()
                .domain([new Date(2017, 0, 1), new Date(2018, 2, 31)])
                .range([0,width - margin.left - margin.right])
var yScale = d3.scaleBand()
                .domain(Array.apply(null, {length: data.length}).map(Number.call, Number))
                .range([margin.top,height - margin.top - margin.bottom])

var xAxis = d3.axisTop(xScale)
                    .tickSize(-(height-margin.top-margin.bottom), 0, 0)
                    .ticks(7)
                    .tickFormat(function(d){return date_format_axis(d)})

var svg = d3.select('.interactive')
            .append('svg')
            .attr('width',width)
            .attr('height',height)
            .append('g')
            .attr('transform','translate('+(margin.left)+","+margin.top+")")

svg.append('g')
    .call(xAxis)
    .attr('class','axis')

lines = svg.append('g')
    .attr('class','line-group')
    .selectAll('.group')
    .data(sortedByNotification, function(d){ return d.scheme; })
    .enter()
    .append('g')
    .attr('class',function(d,i){return 'group g-'+i})
    .style('opacity',0.7)
    .attr('transform',function(d,i){return 'translate(0,'+(yScale(i))+")"})

lines.append('line')
      .attr('y1',0)
      .attr('y2',0)
      .attr('x1',function(d){return xScale(d['deadline_to_enroll'])})
      .attr('x2',function(d){return xScale(d['notification'])})
      .style('stroke-width','1px')

lines.append('circle')
      .attr('cx',function(d){return xScale(d.notification)})
      .attr('r',radius)
      .attr('class','notification')

lines.append('circle')
      .attr('cx',function(d){return xScale(d['deadline_to_enroll'])})
      .attr('r',radius)
      .attr('class','deadline')

lines.append('g')
      .attr('class','name')
      .append('text')
      .text('')
      .attr('transform',function(d,i){return 'translate('+(xScale(d['deadline_to_enroll'])+15)+','+0+')'})
      .tspans(function(d){return d3.wordwrap(d.scheme, breakpoint)}) //wrap after 20 char

var voronoiGroup = svg.append("g")
      .attr("class", "voronoi");

voronoiGroup.selectAll("path")
  .data(sortedByNotification)
  .enter()
  .append("rect")
  .attr('x','0')
  .attr('y',function(d,i){return yScale(i)-yScale.bandwidth()/2})
  .attr('class',function(d,i){return 'rect-'+i})
  .attr('width',width-margin.left-margin.right)
  .attr('height',yScale.bandwidth())
  .style('cursor','pointer')
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

  d3.select('.g-'+i)
        .selectAll('line')
        .style('stroke-width','2px')

   d3.selectAll('.annotation-group')
        .style('opacity',1)
        .moveToFront()

      // d3.selectAll('.annotation-notification')
      //   .text( date_format(d['notification']))
      //   .attr('transform','translate(' + (xScale(d.notification)+5) + "," + (yScale(i) + (width*0.01)) + ")")

      // d3.selectAll('.annotation-deadline')
      //   .text(date_format(d['deadline_to_enroll']))
      //   .attr('transform','translate(' + (xScale(d['deadline_to_enroll'])+5)+ "," + (yScale(i)+(width*0.01)) + ")")
}

function mouseout(d,i){
   d3.select('.g-'+i)
        .style('opacity',0.7)
        .selectAll('circle')
        .attr('r',radius)

    d3.select('.g-'+i)
        .style('opacity',0.7)
        .selectAll('line')
        .style('stroke-width','1px')

}

function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

var t = d3.transition()
    .duration(2000);

$('.copy.intro span').on('click',function(){
  $('.copy.intro span').removeClass('active')
  $(this).addClass('active')

  if ($(this).hasClass('notification')){

    d3.selectAll('.group')
        .transition()
        .duration(1800)
        .attr('transform',function(d){return 'translate(0,'+yScale(parseInt(sortedByNotification.indexOf(d)))+")"})

    d3.selectAll('.voronoi rect')
        .attr('y',function(d){ return yScale(sortedByNotification.indexOf(d))-(yScale.bandwidth()/2)})

  } else if ($(this).hasClass('time')){

    d3.selectAll('.group')
        .transition()
        .duration(1800)
        .attr('transform',function(d){return 'translate(0,'+yScale(parseInt(data.indexOf(d)))+")"})

    d3.selectAll('.voronoi rect')
        .attr('y',function(d){return (yScale(data.indexOf(d)))-(yScale.bandwidth()/2)})

  } else {

    d3.selectAll('.group')
        .transition()
        .duration(1800)
        .attr('transform',function(d){return 'translate(0,'+yScale(parseInt(sortedByDeadline.indexOf(d)))+")"})

    d3.selectAll('.voronoi rect')
        .attr('y',function(d){return (yScale(sortedByDeadline.indexOf(d))-(yScale.bandwidth()/2))})
  }
  
})