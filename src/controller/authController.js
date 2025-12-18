const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const register = async(req, res) =>{
    try{
        const{username, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users(username, password) VALUES($1, $2)",
            [username, hashedPassword]
        );

        res.json({message: "User Register Successfully"});
    }
    catch(err) {
        res.status(500).json({error: err.message});

    }
}

const login = async(req, res) =>{
    try{
        const {username, password} = res.body;
        const result = await pool.query("SELECT * FROM users WHERE username =$1", [usename]);
        if(result.rows.length === 0){
                  return res.status(400).json({ error: "User not found" });

        }

         const validPassword = await bcrypt.compare(password, result.rows[0].password);

    if (!validPassword) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: result.rows[0].id, username: result.rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.Jwt_EXPIRES}
    );

    res.json({ message: "Login successful!", token });


    }
    catch(err){
          res.status(500).json({ error: err.message });

    }
}


module.exports= {register,login};