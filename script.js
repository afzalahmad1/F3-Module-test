let ipAddress;
$.get(
  `https://ipinfo.io/json?token=49c4ba97c56bbc`,
  function (response) {
    ipAddress = response.ip;
    document.querySelector(
      "#ipAddress"
    ).textContent = `My public IP ADDRESS: ${response.ip}`;
  },
  "json"
);

let lat;
let long;
let post = [];

document.getElementById("get-data").addEventListener("click", () => {
  // get the lat and long
  document.getElementById("get-data").style.display = "none";
  document.querySelector(".container").style.display = "flex";
  document.querySelector(".abc").style.display = "block";
  document.querySelector(".input").style.display = "block";
  document.querySelector("#postoffice-details").style.display = "grid";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        document.querySelector("#lat").innerHTML = `<b>Lat:</b> ${lat}`;
        document.querySelector("#long").innerHTML = `<b>Lat:</b> ${long}`;
        // fetch

        document.getElementById(
          "map"
        ).innerHTML += `<iframe src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed" width="1277" height="300" frameborder="0" style="border:0"></iframe>`;
        fetch(`https://ipinfo.io/${ipAddress}?token=49c4ba97c56bbc`)
          .then((response) => response.json())
          .then((data) => {
            console.log("new",ipAddress);
            console.log("new",data);
            document.querySelector(
              "#city"
            ).innerHTML = `<strong>City: ${data.city}</strong>`;
            document.querySelector(
              "#region"
            ).innerHTML = `<strong>Region: ${data.region}</strong>`;
            document.querySelector(
              "#organisation"
            ).innerHTML = `<strong>Organisation: ${data.org}</strong>`;
            document.querySelector(
              "#hostname"
            ).innerHTML = `<strong>Hostname: ${data.hostname}</strong>`;

            let datetime = new Date().toLocaleString("en-US", {
              timeZone: data.timezone,
            });
            document.querySelector(
              "#time-zone"
            ).innerHTML = `<strong>Time Zone: ${data.timezone}</strong>`;
            document.querySelector(
              "#date"
            ).innerHTML = `<strong>Date And Time : ${datetime}</strong>`;
            document.querySelector(
              "#pincode"
            ).innerHTML = `<strong> Pincode: ${data.postal}</strong>`;

            fetch(`https://api.postalpincode.in/pincode/${data.postal}`)
              .then((res) => {
                return res.json();
              })
              .then((postOffice) => {
               // console.log(postOffice);
                document.getElementById(
                  "message"
                ).innerHTML = `<strong> Message: ${postOffice[0].Message}</strong>`;
                post = postOffice[0].PostOffice;
               // console.log("arr", post);
                let innerHtml = "";
                post.forEach((val) => {
                  innerHtml += `
                    <div class="p">
                    <p><strong >Name: ${val.Name}</strong></p>
                    <p><strong >Branch Type: ${val.BranchType}</strong> </p>
                    <p><strong >Delivery Status: ${val.DeliveryStatus}</strong> </p>
                    <p><strong >District: ${val.District}</strong></p>
                    <p><strong >Division: ${val.Division}</strong> </p>
                    </div>`;
                });
                // console.log(innerHtml);
                document.getElementById("postoffice-details").innerHTML =
                  innerHtml;
              });
          });
      },
      (error) => {
        alert(error);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

document.getElementById("input").addEventListener("input", () => {

  let newArr = post.filter((val) => {
    return (
      val.Name.toLowerCase().includes(
        document.getElementById("input").value.toLowerCase()
      ) ||
      val.Block.toLowerCase().includes(
        document.getElementById("input").value.toLowerCase()
      )
    );
  });
  console.log(newArr);
  let innerHtml = "";
  newArr.forEach((val) => {
    innerHtml += `
                    <div class="p">
                    <p><strong >Name: ${val.Name}</strong></p>
                    <p><strong >Branch Type: ${val.BranchType}</strong> </p>
                    <p><strong >Delivery Status: ${val.DeliveryStatus}</strong> </p>
                    <p><strong >District: ${val.District}</strong></p>
                    <p><strong >Division: ${val.Division}</strong> </p>
                    </div>`;
  });
  // console.log(innerHtml);
  document.getElementById("postoffice-details").innerHTML = innerHtml;
});




/*https://ipinfo.io/json?token=49c4ba97c56bbc*/