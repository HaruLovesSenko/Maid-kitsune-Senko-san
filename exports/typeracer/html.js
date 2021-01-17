module.exports = function(num, words) {
  if (!words || !num) {
    words = [];
    num = 0;
  }
  return `<!DOCTYPE html>
<html>
  <head>
    <title>DISCORD TYPERACER ~✨</title>
  </head>
  <body>
    <style>
      * {
        background-color: orchid;
        color: indigo;
      }
      .unselectable {
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 25px;
        border: 10px solid violet;
        padding: 20px;
        width: 400px;
        height: 150px;
        text-align: center;
      }
    </style>
    <form id="theForm">
      <div unselectable="on" class="unselectable">
        <h1 id="word">${words[0]}</h1>
        <h3 id="wrongWord" style="color: red;"></h3>
        <label for="typed">Type here:</label>
        <input type="text" id="typed" name="typed" autofocus />
        <input type="submit" value="submit" id="submit"/>
      </div>
      <h1 id="win" style="color: green;"></h1>
    </form>
    <script>
      let word = document.getElementById("word");
      let typed = document.getElementById("typed");
      let wrongWord = document.getElementById("wrongWord");
      let words = [
        "${words[1]}",
        "${words[2]}",
        "${words[3]}",
        "${words[4]}",
        "${words[5]}",
        "${words[6]}",
        "${words[7]}",
        "${words[8]}",
        "${words[9]}",
        "COMPLETED!"
      ];
      let num = 0
      document.getElementById("theForm").addEventListener("submit", e => {
        e.preventDefault();
        if (word.innerHTML != typed.value) {
          wrongWord.innerHTML = "WRONG!";
        } else {
          wrongWord.innerHTML = "";
          word.innerHTML = words[num];
          num += 1
          if (num > 9) {
            document.getElementById("win").innerHTML = "CONGRATS! Send ${num} in discord first to win the race!."
            typed.disabled = true;
            document.getElementById("submit").disabled = true;
          }
        }
        typed.value = "";
      });
    </script>
  </body>
</html>
`;
};
