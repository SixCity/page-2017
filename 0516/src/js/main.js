// 加载状态
function Loader(bool) {
  var loader = $("#loader")
  var product = $("#product")
  if (bool) {
    loader.addClass("hide")
    product.removeClass("hide")
  } else {
    loader.removeClass("hide")
    product.addClass("hide")
  }
}

function webSiteMore() {
  $("#web-more").on("click", "a", function() {
    $("#web-list-ui").removeClass("hide_2")
    $("#web-more").hide()
  })
}

function ClickSearch() {

  $("#search-btn").on("click", function() {
    var keyInput = $("#search-key")
    var key = trim(keyInput.val())

    if (key == "") {
      urlErrMsg("请输入商品网址")
      return
    }

    if (!checkURL(key)) {
      urlErrMsg("请输入正确的网址")
      return
    }

    Loader()

    setTimeout(function() {
      Loader("1")
    }, 2000);

  })

}

;