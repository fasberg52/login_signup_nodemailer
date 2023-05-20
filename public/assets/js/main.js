(function ($) {
  "use strict";

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "tel" || $(input).attr("name") == "tel") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/gi
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }

  $("#register-user").on("click", function (e) {
    e.preventDefault();
    
    $("#user-phone-number").hide();
    $("#varification-code").show();
  });
})(jQuery);
