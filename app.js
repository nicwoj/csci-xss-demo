function encodeInput(input) {
  return $("<div>").text(input).html();
}

var posts = [];

function showPosts() {
  for (var i = 0; i < posts.length; i++) {
    var html =
      "<div class='single-post'><h3>" +
      posts[i].title +
      "</h3><p>" +
      posts[i].body +
      "</p></div>";
  }
  $(".posts").append(html);
}

var isToggled = false;

function toggle() {
  if (!isToggled) {
    isToggled = true;
    document.getElementById("btn").innerHTML = "On";
    document.getElementById("output").innerHTML = "Switched On";
  } else {
    isToggled = false;
    document.getElementById("btn").innerHTML = "Off";
    document.getElementById("output").innerHTML = "Switched Off";
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

  console.log("isToggled: ", isToggled);

  if (isToggled) {
    posts.push({ title: title, body: body }); // vulnerable
  } else {
    posts.push({ title: encodeInput(title), body: encodeInput(body) }); // encoded
  }

  showPosts();
});
