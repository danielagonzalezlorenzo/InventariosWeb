$(document).ready(function () {   
    //Función que identifica si el stock actual es menor al stock minimo y modifica el color de la fila
    function marcarStockBajo() {
        const tabla = document.getElementById("tablaProductos");
        if (!tabla) return;

        const filas = tabla.querySelectorAll("tbody tr");

        filas.forEach(fila => {
            fila.classList.remove("stock-bajo"); // limpia los estilos anteriores

            const stockActual = parseInt(fila.cells[5].textContent);
            const stockMinimo = parseInt(fila.cells[6].textContent);

            if (stockActual < stockMinimo) {
                fila.classList.add("stock-bajo");
            } 
        });
    }
    //Llamada inicial para que se envie la alerta en caso de ser necesario en el dashboard inicial
    marcarStockBajo();

    //Manda a llamar la funcion de alerta cada que hay cambios en la tabla
    const tabla = document.getElementById("tablaProductos");
    if (tabla) {
        const observer = new MutationObserver(() => {
            marcarStockBajo();
        });
        observer.observe(tabla.querySelector("tbody"), { childList: true });
    }
    
    //Evento cuando se elije una categoría para filtro, modifica la tabla en dashboard
    $("#selectCategoria").change(function () {
        const cat = $(this).val();
        //console.log(cat);
        //Condicion para cuando en el select se elija Todas las categorias
        if(cat == 0){
            $.get("/dashboard/", function(stockData) {
                //console.log(stockData);
                const tbody = $("#tablaProductos tbody");
                tbody.empty();
                
                stockData.forEach(p => {
                    tbody.append(`
                        <tr>
                            <td>${p.sku_producto}</td>
                            <td>${p.nombre_producto}</td>
                            <td>${p.categoria}</td>
                            <td>${p.precio_unitario}</td>
                            <td>${p.unidad_medida}</td>
                            <td>${p.stock_actual}</td>
                            <td>${p.stock_minimo}</td>
                        </tr>
                    `);
                });
            });
        }else{
            $.get("/dashboard/" + cat, function(stockData) {
                //console.log(stockData);
                const tbody = $("#tablaProductos tbody");
                tbody.empty();
                
                stockData.forEach(p => {
                    tbody.append(`
                        <tr>
                            <td>${p.sku_producto}</td>
                            <td>${p.nombre_producto}</td>
                            <td>${p.categoria}</td>
                            <td>${p.precio_unitario}</td>
                            <td>${p.unidad_medida}</td>
                            <td>${p.stock_actual}</td>
                            <td>${p.stock_minimo}</td>
                        </tr>
                    `);
                });
                marcarStockBajo();
            });
        }
    });

    //Evento que captura el input de busqueda para filtrar la tabla
    $("#searchInput").on("input", function() {
        const search = $(this).val();
        //console.log(search);
        //console.log(search.length);
        //Condicion para que cuando se vacie el input se vuelva a cargar el stock completo
        if(search.length == 0){
            $.get("/dashboard/", function(stockData) {
                //console.log(stockData);
                const tbody = $("#tablaProductos tbody");
                tbody.empty();
            
                stockData.forEach(p => {
                    tbody.append(`
                        <tr>
                            <td>${p.sku_producto}</td>
                            <td>${p.nombre_producto}</td>
                            <td>${p.categoria}</td>
                            <td>${p.precio_unitario}</td>
                            <td>${p.unidad_medida}</td>
                            <td>${p.stock_actual}</td>
                            <td>${p.stock_minimo}</td>
                        </tr>
                    `);
                });
            });
        }else{
            $.get("/dashboard/search/"+search, function(products) {

                const tbody = $("#tablaProductos tbody");
                tbody.empty(); // Vacía la tabla antes de mostrar resultados
                //console.log(products);

                //Agrega las filas a la tabla
                products.forEach(p => {
                    tbody.append(`
                        <tr>
                            <td>${p.sku_producto}</td>
                        <td>${p.nombre_producto}</td>
                        <td>${p.categoria}</td>
                        <td>${p.precio_unitario}</td>
                        <td>${p.unidad_medida}</td>
                        <td>${p.stock_actual}</td>
                        <td>${p.stock_minimo}</td>
                        </tr>
                    `);
                });

            });
        }
    });
});