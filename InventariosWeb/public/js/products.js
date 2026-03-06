$(document).ready(function () {
    //Funcion que envia los datos del formulario de agregar producto
    $("#formAddProduct").submit(function (e) {
        e.preventDefault(); // evita que recargue la página

        const sku = $("#sku").val();
        const name = $("#name").val();
        const categoria = $("#category").val();
        const precio = $("#precio").val();
        const medida = $("#medida").val();
        const stock_min = $("#stock_min").val();
        //console.log(sku,name,categoria,precio,medida,stock_min);

        $.ajax({
            url: "/products/add",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ sku:sku, name: name, cat: categoria, precio: precio, medida:medida, stock: stock_min}),

            success: function (response) {
                $("#message").html(`
                <div class="alert alert-success">
                    Producto agregado correctamente
                </div>
                `);
            },
            error: function (xhr) {
                const response = xhr.responseJSON;
                $("#message").html(`
                <div class="alert alert-danger">
                    ${response?.message || 'Error al agregar el producto'}
                </div>
                `);
            }
        });
    });

    //Funcion que envia los datos del formulario de editar producto
    $("#formEditProduct").submit(function (e) {
        e.preventDefault(); 

        const sku = $("#sku").val();
        const name = $("#name").val();
        const categoria = $("#category").val();
        const precio = $("#precio").val();
        const medida = $("#medida").val();
        const stock_min = $("#stock_min").val();
        //console.log(sku,name,categoria,precio,medida,stock_min);

        $.ajax({
            url: "/products/edit",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({ sku:sku, name: name, cat: categoria, precio: precio, medida:medida, stock: stock_min}),

            success: function(response) {
                $("#message").html(`<div class="alert alert-success">${response.message}</div>`);
            },
            error: function(xhr) {
                const response = xhr.responseJSON;
                $("#message").html(`<div class="alert alert-danger">${response?.message || 'Error al editar'}</div>`);
            }
        });
    });

    //Funcion que envia el dato del formulario de eliminar producto
    $("#formDeleteProduct").submit(function (e) {
        e.preventDefault(); // evita que recargue la página

        const sku = $("#sku").val();
        //console.log(sku);

        $.ajax({
            url: "/products/delete",
            method: "DELETE",
            contentType: "application/json",
            data: JSON.stringify({ sku:sku}),

            success: function(response) {
                $("#message").html(`<div class="alert alert-success">${response.message}</div>`);
            },
            error: function(xhr) {
                const response = xhr.responseJSON;
                $("#message").html(`<div class="alert alert-danger">${response?.message || 'Error al eliminar'}</div>`);
            }
        });
    });
});