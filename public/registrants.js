async function downloadInfo() {
  const res = await fetch(route + "registrant/info");
  var response = await res.json();
  console.log(response);
}