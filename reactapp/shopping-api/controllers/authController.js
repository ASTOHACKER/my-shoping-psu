const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const register = async (req, res) => {
  const { username, password, fullname } = req.body;

  if (!username || !password || !fullname) {
    return res.status(400).json({
      success: false,
      message: "Username, password, and fullname are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (username, password, fullname, role)
       VALUES ($1, $2, $3, 'user')
       RETURNING id, username, fullname, role`,
      [username.trim(), passwordHash, fullname.trim()]
    );

    return res.status(201).json({
      success: true,
      message: "Register success",
      user: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    console.error("Register error", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  try {
    const result = await db.query(
      "SELECT id, username, password, fullname, role FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        role: user.role || "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      success: true,
      token,
      role: user.role || "user",
      user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        role: user.role || "user",
      },
    });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { login, register };
