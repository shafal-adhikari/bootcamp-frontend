const loadFood = () => {
  $.ajax({
    url: "http://192.168.10.10:3456/users/all_foods",
    contentYype: "Application/JSON",
    AccessControlAllowHeaders: "*",
    dataType: "json",
    success: (result) => {
      console.log(result);
      $(".card-loader").css("display", "none");
      result.dataInfo.map((data) => {
        console.log(data);
        $(".CardHolder").append(
          '<div class="Card"><h2 class="food-name">' +
            data.foodName +
            '</h3><img src="http://192.168.10.10:3456/' +
            data.foodImageName +
            '" class="food-image" /><p class="food-description">' +
            data.foodDescription +
            '</p><span class="food-price">' +
            data.foodPrice +
            '</span><button class="order-button" onClick="orderFood(\'' +
            data._id +
            '\')">Order Now</button></div>'
        );
      });
    },
  });
};
const orderFood = (id) => {
  $(".Modal").css("display", "flex");
  $(".Modal-overlay").css("display", "flex");
  $.ajax({
    url: "http://192.168.10.10:3456/users/order_this_food?foodID="+id,
    contentYype: "Application/JSON",
    AccessControlAllowHeaders: "*",
    dataType: "json",
    success: (result) => {
      console.log('result',result);
      $(".modal-loader").css("display", "none");
      $(".Modal").append("<p>"+result.message + "</p>");
    },
    error: err => {
      console.log('error',err)
    }
  });
};
const loadFromFilter = () => {
  const val = $('.filter-select').val()
  $(".card-loader").css("display", "block");
  $('.Card').remove()
  $.ajax({
    url: "http://192.168.10.10:3456/users/filter_type?foodType="+val,
    contentYype: "Application/JSON",
    AccessControlAllowHeaders: "*",
    dataType: "json",
    success: (result) => {
      console.log(result);
      $(".card-loader").css("display", "none");
      result.dataInfo.map((data) => {
        console.log(data);
        $(".CardHolder").append(
          '<div class="Card"><h2 class="food-name">' +
            data.foodName +
            '</h3><img src="http://192.168.10.10:3456/' +
            data.foodImageName +
            '" class="food-image" /><p class="food-description">' +
            data.foodDescription +
            '</p><span class="food-price">' +
            data.foodPrice +
            '</span><button class="order-button" onClick="orderFood(\'' +
            data._id +
            '\')">Order Now</button></div>'
        );
      });
    },
  });
  
}
const modalClose = () => {
  $(".Modal").css("display", "none");
  $(".Modal-overlay").css("display", "none");
};
$(document).ready(loadFood());
