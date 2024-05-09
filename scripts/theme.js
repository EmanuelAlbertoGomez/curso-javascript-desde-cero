$(document).ready(function() {
    // Verificar si hay un tema guardado en localStorage al cargar la página
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme)
        actualizarTema(savedTheme);

    // Manejar el clic en el botón para cambiar el tema
    $('#btnSwitch').on('click', function() {
        var currentTheme = $('html').attr('data-bs-theme');
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Guardar el nuevo tema en localStorage
        localStorage.setItem('theme', newTheme);

        actualizarTema(newTheme);
    });
});

// Aplicar el nuevo tema y actualizar el icono
function actualizarTema(theme){
    $('html').attr('data-bs-theme', theme);
    updateIcon(theme);
    updateSelect2(theme);
}

// Función para actualizar el icono según el tema
function updateIcon(theme) {
    var icon = $('#icon-theme');
    icon.removeClass(theme === 'dark' ? 'bi-sun' : 'bi-moon-stars');
    icon.addClass(theme === 'dark' ? 'bi-moon-stars' : 'bi-sun');
}

// Actualiza el tema para todos los select2
function updateSelect2(theme) {
    var bootstrapTheme = theme === 'dark' ? 'bootstrap-dark' : 'bootstrap';
    $("select.select2-hidden-accessible").each(function() {
        $(this).select2({theme: bootstrapTheme});
      }); 
  }