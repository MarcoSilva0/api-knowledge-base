/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API endpoints for managing articles
 *
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - categoryId
 *         - userId
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the article
 *         name:
 *           type: string
 *           description: The name/title of the article
 *         description:
 *           type: string
 *           description: The description of the article
 *         categoryId:
 *           type: integer
 *           description: The id of the category to which the article belongs
 *         userId:
 *           type: integer
 *           description: The id of the user who authored the article
 *         content:
 *           type: string
 *           description: The content of the article
 *       example:
 *         id: 1
 *         name: Introduction to Swagger
 *         description: An overview of Swagger documentation
 *         categoryId: 2
 *         userId: 3
 *         content: This is the content of the article.
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
 *             message: "Article not found"
 *
 * /articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: A list of articles with pagination information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *                 count:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       500:
 *         $ref: '#/components/responses/BadRequest'
 *
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       204:
 *         description: Article successfully created
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/BadRequest'
 *
 * /articles/{id}:
 *   get:
 *     summary: Get an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the article to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/BadRequest'
 *
 *   put:
 *     summary: Update an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the article to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       204:
 *         description: Article successfully updated
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/BadRequest'
 *
 *   delete:
 *     summary: Delete an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the article to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Article successfully deleted
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/BadRequest'
 *
 * /articles/category/{id}:
 *   get:
 *     summary: Get articles by category
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to filter articles
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: A list of articles within the specified category with pagination information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *                 count:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       500:
 *         $ref: '#/components/responses/BadRequest'
 */

const admin = require("../admin");

module.exports = (app) => {
  app
    .route("/articles")
    .all(app.config.passport.authenticate())
    .get(admin(app.api.article.get))
    .post(admin(app.api.article.save));

  app
    .route("/articles/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getById)
    .put(admin(app.api.article.save))
    .delete(admin(app.api.article.remove));

  app
    .route("/categories/:id/articles")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getByCategory);
};
