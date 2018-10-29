//Toggle todo item completed
$('ul').on('click','li', function() {
    $(this).toggleClass('completed')
})

$('.fa-coffee').click(function() {
    $("input[type='text']").fadeToggle()
})

//Click on X to delete Todo item
$('ul').on('click','span', function() {
    $(this).parent().fadeOut(350, function() {
        $(this).remove()
    })
    event.stopPropagation()
})

//Add new Todo item
$("input[type='text']").keypress(function(event) {
    if (event.which === 13) {
        var newTodo = $(this).val()
        $(this).val('')
        $('ul').append("<li><span><i class='far fa-trash-alt'></i></span> " + newTodo + '</li>')
    }
})
