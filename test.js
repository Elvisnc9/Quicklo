// const bcrypt = require('bcrypt');

// const storedHash = "$2b$10$8dlHXekkbSyh.sTdcN57IuczvhdGtwQrgxea4qOf/9Sodc6mP2qj2"; // Get from your DB
// const enteredPassword = "12345"; // Enter what you type during login

// async function testPassword() {
//     const isMatch = await bcrypt.compare(enteredPassword, storedHash);
//     console.log("Password Match:", isMatch);
// }

// testPassword();



const bcrypt = require('bcrypt');
const { User } = require('./server/model/user');

async function rehashPassword(email, plainPassword) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    await User.update({ password: hashedPassword }, { where: { email } });
    console.log(`✅ Password for ${email} updated successfully!`);
}

rehashPassword("elvis@gmail.com","12345");
