/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionType:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           format: mongodb-objectid
 *           description: The auto-generated id of the transaction type
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: The name of the transaction type
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the transaction type was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the transaction type was last updated
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         name: "Purchase Order"
 *         createdAt: "2023-01-01T00:00:00.000Z"
 *         updatedAt: "2023-01-01T00:00:00.000Z"
 *
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           example: "Error message"
 *
 *   responses:
 *     ValidationError:
 *       description: Validation failed
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "field"
 *                     msg:
 *                       type: string
 *                       example: "Name is required"
 *                     path:
 *                       type: string
 *                       example: "name"
 *                     location:
 *                       type: string
 *                       example: "body"
 *
 * @swagger
 * tags:
 *   name: TransactionTypes
 *   description: Transaction types management API
 *
 * @swagger
 * /transaction-types:
 *   post:
 *     summary: Create a new transaction type
 *     tags: [TransactionTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "Purchase Order"
 *     responses:
 *       201:
 *         description: Transaction type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/TransactionType'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *
 *   get:
 *     summary: Get all transaction types
 *     tags: [TransactionTypes]
 *     responses:
 *       200:
 *         description: List of all transaction types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TransactionType'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *
 * @swagger
 * /transaction-types/{id}:
 *   get:
 *     summary: Get a transaction type by ID
 *     tags: [TransactionTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongodb-objectid
 *         description: Transaction type ID
 *     responses:
 *       200:
 *         description: Transaction type found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/TransactionType'
 *       404:
 *         description: Transaction type not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *
 *   put:
 *     summary: Update a transaction type
 *     tags: [TransactionTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongodb-objectid
 *         description: Transaction type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "Updated Purchase Order"
 *     responses:
 *       200:
 *         description: Transaction type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/TransactionType'
 *       404:
 *         description: Transaction type not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *
 *   delete:
 *     summary: Delete a transaction type
 *     tags: [TransactionTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongodb-objectid
 *         description: Transaction type ID
 *     responses:
 *       200:
 *         description: Transaction type deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: {}
 *       404:
 *         description: Transaction type not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
