$(function() {
  var client = ZAFClient.init();
  client.invoke("resize", { width: "100%", height: "320px" });
  // showInfo();
  // console.log(client.get('ticket').then(console.log));
  // client.get("ticket.requester.id").then(function(data) {
  //   var user_id = data["ticket.requester.id"];
  //   requestUserInfo(client, user_id);
  // });
  client.get("ticket.createdAt").then( ticket_data => {
    const timestamp=new Date(ticket_data["ticket.createdAt"]).getTime();
    const url=`https://permutator.jans.site/api/zdtracker/events?groupByUser=1&before=${timestamp}&after=${timestamp-1000*60*60}`
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(pageviews=>{
      const source=document.querySelector('#pageview-template').innerHTML;
      const template=Handlebars.compile(source);
      const html=template({pageviews});
      console.log(source,html)
      document.querySelector('#content').innerHTML=html;
    })
  });
  // showError();
});
function showInfo(data,client) {
  console.log("SD")
  client.get("ticket.createdAt").then( ticket_data => {
    console.log("TD", ticket_data);
    var requester_data = {
      name: data.user.name,
      tags: data.user.tags,
      created_at: formatDate(data.user.created_at)+"xxx",
      last_login_at: formatDate(data.user.last_login_at),
      ticket_created_at: new Date(ticket_data["ticket.createdAt"]).getTime()
    };
    fetch("https://permutator.jans.site/api/zdtracker/events?groupByUser=1").then(res=>res.json()).then(events=>{
      var source = $("#requester-template").html();
      var template = Handlebars.compile(source);
      requester_data.pageviews=events;
      console.log(events)
      var html = template(requester_data);
      $("#content").html(html);
    })
    
  });
}
function showError(response) {
  var error_data = {
    status: response.status,
    statusText: response.statusText
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}
function requestUserInfo(client, id) {
  var settings = {
    url: "/api/v2/users/" + id + ".json",
    type: "GET",
    dataType: "json"
  };

  client.request(settings).then(
    function(data) {
      showInfo(data,client);
    },
    function(response) {
      showError(response);
    }
  );
}
function formatDate(date) {
  var cdate = new Date(date);
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  date = cdate.toLocaleDateString("en-us", options);
  return date;
}
