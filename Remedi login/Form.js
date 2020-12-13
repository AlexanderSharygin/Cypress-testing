const form = document.forms[0];
form.addEventListener("submit", event => 
{
  event.preventDefault();
  let data =
  {
    name: document.getElementById('name').innerHTML,
    email: document.getElementById('name').innerHTML,
    message: document.getElementById('message').innerHTML,
  }
 
  const jsonBody = JSON.stringify(data);
  const request = new XMLHttpRequest();
  request.open("POST", "https://jsonplaceholder.typicode.com/users/");
  request.send(jsonBody);
  // получение ответа
 
  request.onload = function() {
    const jsonResponse = JSON.parse(this.response);
    let responceStatusLabel = document.getElementById('response');
    responceStatusLabel.innerHTML = `Response from the server: ${jsonResponse.id}`;
  };
});