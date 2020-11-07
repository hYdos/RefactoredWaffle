var isPlaying = false;

document.getElementById("waffle").onmousedown = function() {
  document.getElementById("waffle-img").style.transition = "transform 0.1s";
  document.getElementById("waffle-img").style.transform = "scale(0.4)";
  if(!isPlaying) {
    document.getElementById("author").style.transition = "opacity 1s";
    document.getElementById("author").style.opacity = "100%";
    new Audio("https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Never+Gonna+Give+You+Up-+Original&filename=mz/Mzg1ODMxNTIzMzg1ODM3_JzthsfvUY24.MP3").play();
    isPlaying = true;
  }
}

var stop = function() {
  document.getElementById("waffle-img").style.transition = "";
  document.getElementById("waffle-img").style.transform = "";
}

document.getElementById("waffle").onmouseup = stop;
document.getElementById("waffle").onmouseleave = stop;