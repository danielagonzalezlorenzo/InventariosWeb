$(document).ready(function () {
    //Funcion que envia los datos del formulario de agregar movimiento
    $("#formAddMovement").submit(function (e) {
        e.preventDefault(); 

        const sku = $("#sku").val();
        const tipo = $("#tipo").val();
        const cantidad = $("#cantidad").val();
        const motivo = $("#motivo").val();
        //console.log(sku,tipo,cantidad,motivo);

        $.ajax({
            url: "/movements/add",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ sku:sku, tipo:tipo, cantidad:cantidad, motivo:motivo }),

            success: function (response) {
                $("#message").html(`
                <div class="alert alert-success">
                    Movimiento registrado correctamente
                </div>
                `);
            },

            error: function (xhr) {
                const response = xhr.responseJSON;
                $("#message").html(`
                <div class="alert alert-danger">
                    ${response?.message || 'Error al registrar el movimiento'}
                </div>
                `);
            }
        });
    });
});