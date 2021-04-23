function encodeInput(input) {
  return $("<div>").text(input).html();
}

getAllPosts();

async function getAllPosts() {
  const response = await fetch("/api");
  const data = await response.json();
  console.log("data: ", data);

  for (item of data) {
    posts.push(item);
    const root = document.createElement("div");
    root.classList.add("single-post");

    const title = document.createElement("h3");
    title.innerHTML = `${item.title}`;

    const body = document.createElement("p");
    body.innerHTML = `${item.body}`;

    root.append(title, body);
    $(".posts").append(root);
  }
}

async function getPost() {
  const response = await fetch("/api");
  const data = await response.json();
  console.log("data: ", data[data.length - 1]);

  const root = document.createElement("div");
  root.classList.add("single-post");

  const title = document.createElement("h3");
  title.innerHTML = `${data[data.length - 1].title}`;

  const body = document.createElement("p");
  body.innerHTML = `${data[data.length - 1].body}`;

  root.append(title, body);
  $(".posts").append(root);
}

var isToggled = false;

// when the switch is off, the input is not encoded
function toggle() {
  if (!isToggled) {
    isToggled = true;
    document.getElementById("output").innerHTML =
      "Switched On: Input is encoded";
  } else {
    isToggled = false;
    document.getElementById("output").innerHTML = "Switched Off: Vulnerable";
  }
}

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var title = document.getElementById("title").value;
  var body = document.getElementById("body").value;

  // console.log(title, escape(title));
  // console.log(body, escape(body));

  //posts.push({ title: encodeInput(title), body: encodeInput(body) });
  //posts.push({ title: escape(title), body: escape(body) });
  //posts.push({ title: title, body: body });

  // console.log("isToggled: ", isToggled);

  // if (isToggled) {
  //   posts.push({ title: encodeInput(title), body: encodeInput(body) }); // encoded
  // } else {
  //   posts.push({ title: title, body: body }); // vulnerable
  // }

  const data = { title, body };
  // console.log(data);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch("/api", options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("You posted: ", data);
    });

  getPost();
});
