const allImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let currentIndex = 0;
let visibleImages = Array.from(allImages);

allImages.forEach((img, index)=>{
    img.addEventListener("click", ()=>{
        visibleImages = Array.from(allImages).filter(i => i.style.display !== "none");
        currentIndex = visibleImages.indexOf(img);
        showImage();
        lightbox.style.display = "flex";
        // Try to open fullscreen for a true full-screen view (user gesture)
        if (lightbox.requestFullscreen) {
            lightbox.requestFullscreen().catch(()=>{});
        } else if (lightbox.webkitRequestFullscreen) {
            lightbox.webkitRequestFullscreen();
        }
    });
});

function showImage(){
    if(visibleImages.length > 0){
        lightboxImg.src = visibleImages[currentIndex].src;
    }
}

document.getElementById("next").onclick = ()=>{
    if(visibleImages.length > 0){
        currentIndex = (currentIndex + 1) % visibleImages.length;
        showImage();
    }
};

document.getElementById("prev").onclick = ()=>{
    if(visibleImages.length > 0){
        currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
        showImage();
    }
};

document.getElementById("close").onclick = ()=>{
    lightbox.style.display = "none";
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
};

lightbox.onclick = (e)=>{
    if(e.target === lightbox){
        lightbox.style.display = "none";
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        }
    }
};

function filterImages(category){
    allImages.forEach(img=>{
        if(category === "all" || img.classList.contains(category))
            img.style.display = "block";
        else
            img.style.display = "none";
    });
    visibleImages = Array.from(allImages).filter(i => i.style.display !== "none");
}