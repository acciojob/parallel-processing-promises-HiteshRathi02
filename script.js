const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" }
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.style = "width: 200px; height: 300px; margin: 10px;";
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

function downloadImages() {
  loading.style.display = "block";
  errorDiv.innerText = "";
  output.innerHTML = "";

  Promise.all(images.map((image) => downloadImage(image.url)))
  .then((loadedImages) => {
    output.innerHTML = loadedImages.map((img) => `<img src="${img.src}" />`).join("");
  })
  .catch((error) => {
    errorDiv.innerText = error;
  })
  .finally(() => {
    loading.style.display = "none";
  });
}

downloadImages();
