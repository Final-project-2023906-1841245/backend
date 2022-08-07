const geocode = async (address) => {
  const encodedAddress = encodeURIComponent(address).replaceAll("%2C", ",");
  console.log(encodedAddress);
  const key = "ed56555d4bc461f0a49d040823bd24a0";
  const url = `http://api.positionstack.com/v1/forward?access_key=${key}&query=${encodedAddress}`;
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      if (data) {
        const lat = data.data[0].latitude;
        const lon = data.data[0].longitude;
        console.log(lat);
        console.log(lon);
      }
    });
};

module.exports = geocode;
