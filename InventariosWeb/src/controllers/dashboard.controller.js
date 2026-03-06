const Dashboard = require('../models/dashboard.model');

//Mostrar dashboard
exports.showDashboard = async (req, res) => {
    try {
        const stockData = await Dashboard.getStock(); // tu SP devuelve arreglo
        //console.log(stockData);
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.json(stockData);
    }
        const categories = await Dashboard.getCategories();
        //console.log(req.user);
    
        res.render('dashboard/dashboard', {showHeader: true, user:req.user, stockData, categories }); // enviamos a Handlebars
    } catch (error) {
        console.error(error);
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(500).json([]);
    }
        res.render('dashboard/dashboard', {showHeader: true, user:req.user, stockData: [], categories: [] });
    }
};

//Enviar los datos filtrados por categoria
exports.getByCategory = async (req, res) => {
  try {
    const cat = req.params.id;
   
    const stockData = await Dashboard.getProductsByCategory(cat);

    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.json(stockData);
    }

    const categories = await Dashboard.getCategories();
    res.render('dashboard/dashboard', {
      showHeader: true,
      user: req.user,
      stockData,
      categories
    });
  } catch (error) {
    console.error(error);

    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(500).json([]);
    }

    res.render('dashboard/dashboard', {
      showHeader: true,
      user: req.user,
      stockData: [],
      categories: []
    });
  }
};

//Enviar los datos filtrados por busqueda
exports.getBySearch = async (req, res) => {
    //console.log(req.params.search);
    try {
        const search = req.params.search;
        //console.log(search);
        const results = await Dashboard.searchStock(search);
        res.json(results); // devuelve array de productos
    } catch (error) {
        console.error(error);
        res.status(500).json([]);
    }
};