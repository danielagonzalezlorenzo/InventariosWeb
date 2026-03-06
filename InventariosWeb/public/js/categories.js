$(document).ready(function () {
    //Función para enviar los datos del formulario de agregar categoría
    $("#formAddCategory").submit(function (e) {
        e.preventDefault(); 

        const sku = $("#sku").val();
        const name = $("#name").val();

        $.ajax({
            url: "/categories/add",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ sku:sku, name: name }),

            success: function (response) {
                $("#message").html(`
                <div class="alert alert-success">
                    Categoría agregada correctamente
                </div>
                `);
            },
            error: function (xhr) {
                const response = xhr.responseJSON;
                $("#message").html(`
                <div class="alert alert-danger">
                    ${response?.message || 'Error al agregar la categoría'}
                </div>
                `);
            }
        });

    });

    //Función para enviar los datos del formulario de editar categoría
    $("#formEditCategory").submit(function (e) {
        e.preventDefault(); 

        const sku = $("#sku").val();
        const name = $("#name").val();
        //console.log(sku,name);

        $.ajax({
            url: "/categories/edit",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({ sku:sku, name: name }),
        
            success: function(response) {
                $("#message").html(`<div class="alert alert-success">${response.message}</div>`);
            },
            error: function(xhr) {
                const response = xhr.responseJSON;
                $("#message").html(`<div class="alert alert-danger">${response?.message || 'Error al editar'}</div>`);
            }
        });
    });

    //Función para enviar el dato de eliminar categoría
    $("#formDeleteCategory").submit(function (e) {
        e.preventDefault(); 

        const sku = $("#sku").val();
        //console.log(sku);

        $.ajax({
            url: "/categories/delete",
            method: "DELETE",
            contentType: "application/json",
            data: JSON.stringify({ sku:sku}),

            success: function(response) {
                $("#message").html(`<div class="alert alert-success">${response.message}</div>`);
            },
            error: function(xhr) {
                const response = xhr.responseJSON;
                $("#message").html(`<div class="alert alert-danger">${response?.message || 'Error al editar'}</div>`);
            }
        });  
    });
});