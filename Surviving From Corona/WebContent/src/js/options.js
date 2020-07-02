let sound_volume = true;

function change_volume() {
  let sound = document.getElementById("sound_icon");
  if (sound_volume == true) {
    sound.src = "../src/images/mute.png";
    sound_volume = false;
  } else if (sound_volume == false) {
    sound.src = "../src/images/sound.png";
    sound_volume = true;
  } else {
    console.log("invalid thing");
  }
}

function go_back() {
  location.href = location.href;
}

function setOption() {
  const option = document.getElementById("option");

  const ul = document.createElement("ul");
  const sound = document.createElement("li");
  const sound_icon = new Image();
  sound_icon.src = "../src/images/sound.png";
  sound_icon.setAttribute("class", "option-icon");
  sound_icon.setAttribute("id", "sound_icon");
  sound_icon.setAttribute("value", "on");
  sound_icon.setAttribute("onclick", "change_volume();");
  sound.appendChild(sound_icon);
  ul.appendChild(sound);

  const back = document.createElement("li");
  const back_icon = new Image();
  back_icon.src = "../src/images/rotate.png";
  back_icon.setAttribute("class", "option-icon");
  back_icon.setAttribute("id", "back_icon");
  back_icon.setAttribute("onclick", "go_back();");
  back.appendChild(back_icon);
  ul.appendChild(back);

  option.appendChild(ul);
}
