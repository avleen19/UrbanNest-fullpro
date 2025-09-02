const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const sequelize = require("./config/database");
const schema = require('./graphql/schema');

app.use(express.json()); 

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.use('/graphql', (req, res, next) => {
  console.log('✅ /graphql route hit');
  next(); 
}, graphqlHTTP({
  schema,
  graphiql: true
}));



const categoryRoutes = require("./routes/CategoryRoutes");
const productRoutes = require("./routes/ProductRoutes");
const itemRoutes = require('./routes/itemRoutes');
const customerRoutes = require('./routes/customerRoutes');  
const orderRoutes = require('./routes/orderRoutes');  
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');
const countryRoutes = require('./routes/countryRoutes');
const regionRoutes = require('./routes/regionRoutes');
const stateRoutes = require('./routes/stateRoutes');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const stripeRoutes = require('./routes/stripeRoutes');


app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);  
app.use('/api/payments', paymentRoutes);
app.use("/api/users", userRoutes); 
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/regions', regionRoutes); 
app.use('/api/states', stateRoutes); 
app.use('/api/stripe', stripeRoutes);



console.log("✅ productRoutes:", productRoutes);
console.log("✅ categoryRoutes:", categoryRoutes);
console.log("✅ itemRoutes:", itemRoutes);
console.log("✅ userRoutes:", userRoutes);
console.log("✅ customerRoutes:", customerRoutes);
console.log("✅ orderRoutes:", orderRoutes);
console.log("✅ paymentRoutes:", paymentRoutes);
console.log("✅ roleRoutes:", roleRoutes);
console.log("✅ permissionRoutes:", permissionRoutes);
console.log("✅ countryRoutes:", countryRoutes);
console.log("✅ regionRoutes:", regionRoutes);
console.log("✅ stateRoutes:", stateRoutes);



  sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully!');
    
    return sequelize.sync(); 
  })
  .then(() => {
    console.log('✅ Sequelize models synchronized.');
  })
  .catch((err) => {
    console.error('❌ Error connecting to the database:');
    console.error(`Error message: ${err.message}`);
    console.error(`Error stack: ${err.stack}`);
  });


  
app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
