/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 *
 * components:
 *   schemas:
 *     SignInRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: john@example.com
 *         password: user_password
 *
 *     TokenResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         admin:
 *           type: boolean
 *           description: Whether the user is an admin
 *         iat:
 *           type: integer
 *           description: The timestamp when the token was issued
 *         exp:
 *           type: integer
 *           description: The timestamp when the token expires
 *         token:
 *           type: string
 *           description: The JWT token
 *       example:
 *         id: d5fE_asz
 *         name: John Doe
 *         email: john@example.com
 *         admin: false
 *         iat: 1641970800
 *         exp: 1642229999
 *         token: jwt_token_string
 *
 *   responses:
 *     Error:
 *       description: An error response
 *       content:
 *         application/json:
 *           example:
 *             error: "Error message"
 *
 * /signin:
 *   post:
 *     summary: Sign in to get authentication token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *     responses:
 *       '200':
 *         description: Successful sign-in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       '400':
 *         $ref: '#/components/responses/Error'
 *       '401':
 *         description: Invalid email/password
 *         content:
 *           application/json:
 *             example:
 *               error: "Email/Senha inválidos!"
 *
 * /validateToken:
 *   post:
 *     summary: Validate authentication token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The JWT token to be validated
 *             required:
 *               - token
 *     responses:
 *       '200':
 *         description: Token is valid
 *         content:
 *           application/json:
 *             example:
 *               true
 *       '400':
 *         description: Token is invalid or expired
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid or expired token"
 *       '500':
 *         $ref: '#/components/responses/Error'
 */

module.exports = (app) => {
  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);
};
