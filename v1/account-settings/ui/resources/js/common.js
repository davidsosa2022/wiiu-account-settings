if (typeof wiiuSound === 'undefined') {
  window.wiiuSound = {
      playSoundByName: function(name, device) {
          console.log('Play sound ' + name);
      }
  };
}

if (typeof wiiuBrowser === 'undefined') {
  window.wiiuBrowser = {
      jumpToBaristaAccount: function() {
        alert('Jump to Barista Account');
      }
  };
}


document.addEventListener("DOMContentLoaded", function() {
  wiiuSound.playSoundByName('BGM_ACCOUNT_MAIN_DRC', 1);
  wiiuSound.playSoundByName('BGM_ACCOUNT_MAIN_TV', 2);
  initSounds();
  initInputs();
});

function initSounds() {
  var elt = document.querySelectorAll('a.btn_001, .btn_002, p.btn_005, a.btn_005, input[type="radio"], label.radiobtn, select.select_short, select.select_long, input[type="text"].textbox');
  for (var i = 0; i < elt.length; i++) {
    elt[i].addEventListener('touchstart', playHover);
  }
  function playHover() {
    wiiuSound.playSoundByName('SE_ACCOUNT_DRC_TOUCH_TRG', 1);
  }

  var els = document.querySelectorAll("[data-sound]");
  if (!els) return;
  for (var i = 0; i < els.length; i++) {
      els[i].addEventListener("click", playSound);
  }
  function playSound(e) {
      wiiuSound.playSoundByName(e.currentTarget.getAttribute('data-sound'), 1);
  }
}

function initInputs() {
var els = document.querySelectorAll("a, button, *[class^='btn_']");
for (var i = 0; i < els.length; i++) {
    var el = els[i];
    el.addEventListener("click", function () {
        el.blur();
    });
 }
}

function submitEmailChangeForm() {
  function showError(elementId, message) {
    var element = document.getElementById(elementId);
    element.classList.remove("none");
    element.innerHTML = message;
  }

  function hideError(elementId) {
    var element = document.getElementById(elementId);
    element.classList.add("none");
  }

  var originalEmail = document.getElementsByName("emailChange.originalEmail")[0].value;
  var emailNew = document.getElementsByName("emailChange.address")[0].value;
  var emailNewConfirm = document.getElementsByName("emailChange.confirmNewEmail")[0].value;

  hideError("networksetting_comment2");
  hideError("newEmailAlert");
  hideError("newEmailAlert3");
  hideError("newEmailBlank");
  hideError("confirmNewEmailBlank");
  hideError("confirmEmailAlert3");

  if (originalEmail == emailNew) {
    showError("networksetting_comment2", "There is a problem with the information you entered.<br>Check the items with an error displayed.");
    showError("newEmailAlert3", "Email cannot be the same as the original.");
    return false;
  }
  
  if (!/@/.test(emailNew) || emailNew.length < 5) {
    showError("networksetting_comment2", "There is a problem with the information you entered.<br>Check the items with an error displayed.");
    showError("newEmailAlert", "Invalid email format.");
    return false;
  }  
  
  if (emailNew == '') {
    showError("networksetting_comment2", "There is a problem with the information you entered.<br>Check the items with an error displayed.");
    showError("newEmailBlank", "Email cannot be blank.");
    return false;
  }

  if (emailNewConfirm == '') {
    showError("networksetting_comment2", "Please confirm the new email.");    showError("networksetting_comment2", "There is a problem with the information you entered.<br>Check the items with an error displayed.");    showError("confirmNewEmailBlank", "Please confirm the new email.");
    return false;
  }

  if (emailNew != emailNewConfirm) {
    showError("networksetting_comment2", "There is a problem with the information you entered.<br>Check the items with an error displayed.");
    showError("confirmEmailAlert3", "Emails do not match.");
    return false;
  }

  return true;
}

function submitEmailFlagForm() {
  submitForm();
}

function submitUserInfoForm() {
  submitForm();
}

function submitForm() {
  document.getElementById("nsform").submit();
}
