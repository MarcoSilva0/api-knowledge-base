/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The hashed password of the user
 *         confirmPassword:
 *           type: string
 *           description: The confirmation of the password
 *         admin:
 *           type: boolean
 *           description: Whether the user is an admin
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *       example:
 *         id: d5fE_asz
 *         name: John Doe
 *         email: john@example.com
 *         password: hashed_password
 *         confirmPassword: hashed_password
 *         admin: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 *
 *   responses:
 *     Error:
 *       description: An error response
 *       content:
 *         application/json:
 *           example:
 *             error: "Error message"
 *
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         $ref: '#/components/responses/Error'
 *
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         $ref: '#/components/responses/Error'
 *
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         $ref: '#/components/responses/Error'
 *
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         $ref: '#/components/responses/Error'
 *
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: User deleted successfully
 *       '400':
 *         $ref: '#/components/responses/Error'
 *       '500':
 *         $ref: '#/components/responses/Error'
 */

const admin = require("../admin");

module.exports = (app) => {
  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .post(admin(app.api.user.save))
    .get(admin(app.api.user.get));

  app
    .route("/users/:id")
    .all(app.config.passport.authenticate())
    .put(admin(app.api.user.save))
    .get(admin(app.api.user.getById))
    .delete(admin(app.api.user.remove));
};
