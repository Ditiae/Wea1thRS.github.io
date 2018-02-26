/* Made By Hilarious */
var textarea = document.getElementById("textarea");
var textareastring = "";
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}
var bosses = [
  ["1mhpboss(Jogre)", 15],
  ["Alien Demon", 57],
  ["Arrav Hero", 97],
  ["Baby Dragon", 3],
  ["Barrelchest", 72],
  ["Bisharp(Phat)", 110],
  ["Bork", 80],
  ["Broddi(Seeds)", 5],
  ["Caitlin", 20],
  ["Cave Goblin Miner", 5],
  ["Cave Horror", 50],
  ["Celestial Dragon", 30],
  ["Charmeleon", 85],
  ["Corporeal Beast", 270],
  ["Corpse Mage", 13],
  ["Diablo", 580],
  ["Donor Boss", 175],
  ["Dragith Nurn(vipzone)", 25],
  ["Ethereal Mage", 85],
  ["Evil Turnip", 95],
  ["Fire Elemental", 60],
  ["Forgotten Warrior", 66],
  ["Frost Dragon", 30],
  ["Ganodermic Beast", 80],
  ["General Graardor", 78],
  ["Gorak", 55],
  ["Hank the Tank", 323],
  ["Insectoid Assassin", 33],
  ["Jolteon", 94],
  ["Kril Tsutsaroth", 270],
  ["Lion", 75],
  ["Lucky Knight", 225],
  ["Mercenary Captain", 38],
  ["Mysterious Shadow", 11],
  ["Ninja", 32],
  ["Oomlie Bird", 2],
  ["Pikachu", 22],
  ["Queen Black Dragon", 700],
  ["Rage Vorago", 290],
  ["Rainbow Unicorn", 75],
  ["Rock Crab", 40],
  ["Santa Animal(Santa)", 110],
  ["Scyther", 65],
  ["Shadow-Forger", 10],
  ["Sonic", 24],
  ["Spongebob", 90],
  ["Tome of Magic", 27],
  ["Tormented Demon", 230],
  ["Totodile", 80],
  ["Transformed Horse", 95],
  ["Turtle", 85],
  ["TzHaar-Xil", 110],
  ["Undead Hero", 43],
  ["Uodai(Hween)", 110],
  ["Ursaring", 55],
  ["Warped Terrorbird", 72]
];

function arrayColumn(arr, n) {
  return arr.map(x => x[n]);
}

autocomplete(document.getElementById("bossSelection"), arrayColumn(bosses, 0));

function changeValueInElement(element) {
  document.getElementById(element).value = getBossDropRate(
    document.getElementById("bossSelection").value
  );
}

function getBossDropRate(boss) {
  var result;
  for (var i = 0, len = bosses.length; i < len; i++) {
    if (bosses[i][0] === boss) {
      result = bosses[i][1];
      break;
    }
  }
  return result;
}

var Main = (function() {
  function Main() {}
  Main.main = function(args) {
    var dropChanceS = "",
      dropChanceD = 0,
      dropChanceYo = 0,
      dropRateB = document.getElementById("dropRate").value,
      dropRateD = document.getElementById("baseDropRate").value,
      dropPotential = document.getElementById("dropRatePotential").value;
    if (dropRateD < 100 && dropPotential >= 0.1) {
            console.info("test");
            dropChanceS = "Your current drop rate is: " + Main.convertDecimalToFraction((1 / (dropRateD / dropPotential)));
            dropChanceYo = (dropRateD / dropPotential);
            dropChanceD = dropRateD / (1 + (dropRateB / 100));
        }
        else if (dropRateD < 100 && dropPotential >= -0.1 && dropPotential <= 0.1) {
            console.info("test1");
            dropChanceS = "Your current drop rate is: 1/" + (dropRateD | 0);
            dropChanceYo = dropRateD;
            dropChanceD = dropRateD / (1 + (dropRateB / 100));
        }
        else if (dropRateD >= 100 && dropPotential >= 0.1) {
            if (dropPotential >= 0.9 && dropPotential <= 1.1) {
                if (dropRateD / (1 + (dropRateB / 100)) > 100) {
                    console.info("test2");
                    dropChanceS = "Your current drop rate is: 1/100";
                    console.info("test");
                    dropChanceD = 100;
                }
                else {
                    console.info("test3");
                    dropChanceS = "Your current drop rate is: 1/100";
                    dropChanceD = dropRateD / (1 + (dropRateB / 100));
                }
            }
            else {
                console.info("test4");
                dropChanceS = "Your current drop rate is: " + Main.convertDecimalToFraction((1 / (100 / dropPotential)));
                dropChanceYo = (100 / dropPotential);
                dropChanceD = dropRateD / (1 + (dropRateB / 100));
            }
        }
        else if (dropRateD >= 100 && dropPotential >= -0.1 && dropPotential <= 0.1) {
            console.info("test5");
            dropChanceS = "Your current drop rate is: 1/" + (dropRateD | 0);
            dropChanceYo = (dropRateD | 0);
            dropChanceD = dropRateD / (1 + (dropRateB / 100));
        }
    if (dropChanceYo > dropChanceD || dropChanceYo == 0) {
      console.info("test6");
      textareastring = textareastring + ("Your current drop rate is: 1/" + Math.round(dropChanceD) + "");
      var chance = 1 / dropChanceD;
      for (var i = 10; i <= 100; i += 10) {
        var top_1 = (function(x) {
          return Math.log(x) * Math.LOG10E;
        })(1 - i / 100);
        var bottom = (function(x) {
          return Math.log(x) * Math.LOG10E;
        })(1 - 1 / dropChanceD);
        var amountOfTries =
          (function(x) {
            return Math.log(x) * Math.LOG10E;
          })(1 - i / 100) /
          (function(x) {
            return Math.log(x) * Math.LOG10E;
          })(1 - chance);
        textareastring = textareastring + ("\nYou have a " + i + "% chance to get this drop in the next " + Math.round(amountOfTries) +" kills.");
      }
    } else {
      textareastring = textareastring + (dropChanceS);
      var chance = 1 / dropChanceYo;
      for (var i = 10; i <= 100; i += 10) {
        var top_2 = (function(x) {
          return Math.log(x) * Math.LOG10E;
        })(1 - i / 100);
        var bottom = (function(x) {
          return Math.log(x) * Math.LOG10E;
        })(1 - 1 / dropChanceD);
        var amountOfTries =
          (function(x) {
            return Math.log(x) * Math.LOG10E;
          })(1 - i / 100) /
          (function(x) {
            return Math.log(x) * Math.LOG10E;
          })(1 - chance);
        textareastring = textareastring + ("\nYou have a " + i + "% chance to get this drop in the next " + Math.round(amountOfTries) + " kills.");
      }
    }
  };
  Main.convertDecimalToFraction = function(x) {
    if (x < 0) {
      return "-" + Main.convertDecimalToFraction(-x);
    }
    var tolerance = 1.0e-6;
    var h1 = 1,
      h2 = 0,
      k1 = 0,
      k2 = 1,
      b = x;
    do {
      var a = Math.floor(b),
        aux = h1;
      h1 = a * h1 + h2;
      h2 = aux;
      aux = k1;
      k1 = a * k1 + k2;
      k2 = aux;
      b = 1 / (b - a);
    } while (Math.abs(x - h1 / k1) > x * tolerance);
    return 1 + "/" + Math.round(Math.ceil(k1 / h1) | 0);
  };
  return Main;
})();

function updateTextArea() {
  textarea.value = "";
  textarea.value = textareastring;
  console.info(textareastring);
}

function resetString() {
  textareastring = "";
}