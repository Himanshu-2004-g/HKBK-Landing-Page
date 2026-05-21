import https from "https";

const urls = [
  "https://postimg.cc/7GnK3PXN",
  "https://postimg.cc/R6Lg7CGg",
  "https://postimg.cc/gwRS0HZf"
];

urls.forEach(url => {
  https.get(url, (res) => {
    let data = "";
    res.on("data", (chunk) => { data += chunk; });
    res.on("end", () => {
      const metaImages = [...data.matchAll(/<meta property="og:image" content="(.*?)"/g)];
      console.log(url, "->", metaImages.map(m => m[1])[0]);
    });
  });
});

