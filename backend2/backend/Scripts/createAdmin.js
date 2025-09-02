const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');
const User = require('../models/userModel');
const Role = require('../models/roleModel'); // Role model

require('dotenv').config();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB ✅');

    // Get from .env
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME;
    const roleId = process.env.ADMIN_ROLE_ID;

    // Check if already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      console.log('⚠️ Admin user already exists.');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId,
    });

    console.log('✅ Admin user created:', user.email);
  } catch (err) {
    console.error('❌ Error creating admin user:', err);
  } finally {
    await sequelize.close();
  }
})();
