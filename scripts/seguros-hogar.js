var options = {
    minimumValue: 1,
    maximumValue: 99999,
    digitGroupSeparator: '.',
    decimalCharacter: ',',
    decimalPlaces: 0,
  };

$(document).ready(function(){

    restablecer();
    $('#tipoPropiedad').select2();
    $('#ubicacion').select2();
    new AutoNumeric('#metrosCuadrados', options);
    
    // Carga el select de propiedades
    loadSelectFrom("./mocks/propiedades.json","tipoPropiedad","Seleccione tipo de propiedad");
    // Carga el select de ubicaciónes
    loadSelectFrom("./mocks/ubicaciones.json","ubicacion","Seleccione ubicación");

    $("form").submit(function(){
        event.preventDefault();
        // Costo base = Ubicación
        // Factor multiplicador = Tipo de propiedad
        // Retiro el separador de miles para que no lo interprete JS como un punto decimal
        mostrarPrecioPoliza(ubicacion.value, metrosCuadrados.value.replace('.',''), tipoPropiedad.value);
    });
});

// Restablecer los inputs y selects
function restablecer(){
    $('#ubicacion').val("");
    $('#metrosCuadrados').val("");
    $('#tipoPropiedad').val("");
}

// Carga un select desde un json y setea el placeholder
function loadSelectFrom(jsonPathName, selectName, placeHolder){
    // Obtener la referencia al select
    const select = $(`#${selectName}`);

    // Realizar la petición GET al archivo JSON
    fetch(jsonPathName)
    .then(response => response.json())
    .then(data => {
        // Limpiar el select antes de agregar nuevas opciones
        select.empty();

        // Agregar una opción por defecto
        select.append($('<option>', { value: '', text: placeHolder, selected: true, disabled: true}));

        // Recorre el JSON (array de objeto) y agrega opciones al select
        data.forEach(objeto => {
            select.append($('<option>', { value: objeto.valor, text: objeto.texto }));
        });
    })
    .catch(error => console.error(`Error al cargar el JSON ${jsonPathName}: ${error}`));
}

// Costo base * metros cuadrados * factor multiplicador
let calcularPoliza = (cb, m2 , fm) => (cb * m2 * fm).toFixed(2);

function mostrarPrecioPoliza(cb, m2, fm){
    precioPoliza = calcularPoliza(cb, m2, fm).replace('.',',');
    $('#modalId .modal-body').html("$ "+precioPoliza);
    $('#modalId').modal('show'); 
}