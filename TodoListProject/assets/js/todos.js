//Toggle todo item completed
$("li").on("click", function(){
  $(this).toggleClass("completed");
});

//Click on X to delete Todo item
$("span").click(function(event){
  $(this).parent().fadeOut(350, function(){
    $(this).remove();
  });
  event.stopPropagation();
});

//Add new Todo item
$("input[type='text']").keypress(function(event){
  if(event.which === 13){
    var newTodo = $(this).val();
    $(this).val("");
    $("ul").append("<li><span>X</span> " + newTodo + "</li>");
  }
});
