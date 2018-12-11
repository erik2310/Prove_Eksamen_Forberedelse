let date = new Date();
document.getElementById("date").innerHTML = date;

let cookieValue = getCookie("numberOfVisits");

cookieValue++;

document.cookie = "numberOfVisits =" + cookieValue;

function getCookie(name)
{
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}
