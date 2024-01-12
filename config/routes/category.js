/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for managing categories
 *
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         parentId:
 *           type: integer
 *           description: The id of the parent category (if any)
 *       example:
 *         id: 1
 *         name: Electronics
 *         parentId: null
 *
 *   responses:
 *     BadRequest:
 *       description: Bad request error.
 *       content:
 *         application/json:
 *           example:
 *             error: "Bad Request"
 *             message: "Invalid input data"
 *
 *     NotFound:
 *       description: Resource not found error.
 *       content:
 *         application/json:
 *           example:
 *             error: "Not Found"
 *             message: "Category not found"
 *
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         $ref: '#/components/responses/BadRequest'
 *
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/BadRequest'
 *
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/BadRequest'
 *
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/BadRequest'
 *
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Category successfully deleted
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/BadRequest'
 *
 * /categories/tree:
 *   get:
 *     summary: Get categories in a tree structure
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A tree structure of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         $ref: '#/components/responses/BadRequest'
 */

const admin = require("../admin");

module.exports = (app) => {
  app
    .route("/categories")
    .all(app.config.passport.authenticate())
    .get(admin(app.api.category.get))
    .post(admin(app.api.category.save));

  app
    .route("/categories/tree")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getTree);

  app
    .route("/categories/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getById)
    .put(admin(app.api.category.save))
    .delete(admin(app.api.category.remove));
};
