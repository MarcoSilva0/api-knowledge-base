/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: API endpoints for managing statistics
 *
 * components:
 *   schemas:
 *     Stat:
 *       type: object
 *       properties:
 *         users:
 *           type: integer
 *           description: The number of users
 *         categories:
 *           type: integer
 *           description: The number of categories
 *         articles:
 *           type: integer
 *           description: The number of articles
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the statistics were recorded
 *       example:
 *         users: 50
 *         categories: 10
 *         articles: 100
 *         createdAt: '2024-01-12T12:00:00.000Z'
 *
 *   responses:
 *     NotFound:
 *       description: Resource not found error.
 *       content:
 *         application/json:
 *           example:
 *             error: "Not Found"
 *             message: "Statistics not found"
 *
 * /stats:
 *   get:
 *     summary: Get the latest statistics
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: The latest statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stat'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

module.exports = (app) => {
  app
    .route("/stats")
    .all(app.config.passport.authenticate())
    .get(app.api.stat.get);
};
