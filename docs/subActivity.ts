/**
 * @swagger
 * components:
 *   schemas:
 *     SubActivity:
 *       type: object
 *       required:
 *         - transactionType
 *         - activity
 *         - pricingMethod
 *         - portalItemNameEn
 *         - portalItemNameAr
 *         - isActive
 *       properties:
 *         _id:
 *           type: string
 *           format: mongodb-objectid
 *           description: The auto-generated id of the sub-activity
 *         transactionType:
 *           type: string
 *           format: mongodb-objectid
 *           description: Reference to the transaction type
 *         activity:
 *           type: string
 *           format: mongodb-objectid
 *           description: Reference to the parent activity
 *         pricingMethod:
 *           type: string
 *           enum: [manual, fixed, perItem, perLocation]
 *           description: The pricing method for this sub-activity
 *         portalItemNameEn:
 *           type: string
 *           description: The English name of the sub-activity
 *         portalItemNameAr:
 *           type: string
 *           description: The Arabic name of the sub-activity
 *         isActive:
 *           type: boolean
 *           description: Whether the sub-activity is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the sub-activity was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the sub-activity was last updated
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         transactionType: "507f1f77bcf86cd799439012"
 *         activity: "507f1f77bcf86cd799439013"
 *         pricingMethod: "manual"
 *         portalItemNameEn: "Document Review"
 *         portalItemNameAr: "مراجعة المستندات"
 *         isActive: true
 *         createdAt: "2023-01-01T00:00:00.000Z"
 *         updatedAt: "2023-01-01T00:00:00.000Z"
 *
 * @swagger
 * tags:
 *   name: SubActivities
 *   description: Sub-activities management API
 *
 * @swagger
 * /sub-activities:
 *   post:
 *     summary: Create a new sub-activity
 *     tags: [SubActivities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transactionType
 *               - activity
 *               - pricingMethod
 *               - portalItemNameEn
 *               - portalItemNameAr
 *               - isActive
 *             properties:
 *               transactionType:
 *                 type: string
 *                 format: mongodb-objectid
 *                 description: ID of the transaction type
 *               activity:
 *                 type: string
 *                 format: mongodb-objectid
 *                 description: ID of the parent activity
 *               pricingMethod:
 *                 type: string
 *                 enum: [manual, fixed, perItem, perLocation]
 *               portalItemNameEn:
 *                 type: string
 *                 description: English name
 *               portalItemNameAr:
 *                 type: string
 *                 description: Arabic name
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Sub-activity created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/SubActivity'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *
 * @swagger
 * /sub-activities/{id}:
 *   get:
 *     summary: Get a sub-activity by ID
 *     tags: [SubActivities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongodb-objectid
 *         description: Sub-activity ID
 *     responses:
 *       200:
 *         description: Sub-activity found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubActivity'
 *       404:
 *         description: Sub-activity not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sub-activity not found"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *
 *   put:
 *     summary: Update a sub-activity
 *     tags: [SubActivities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongodb-objectid
 *         description: Sub-activity ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transactionType:
 *                 type: string
 *                 format: mongodb-objectid
 *               activity:
 *                 type: string
 *                 format: mongodb-objectid
 *               pricingMethod:
 *                 type: string
 *                 enum: [manual, fixed, perItem, perLocation]
 *               portalItemNameEn:
 *                 type: string
 *               portalItemNameAr:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Sub-activity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubActivity'
 *       404:
 *         description: Sub-activity not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sub-activity not found"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *
 *   delete:
 *     summary: Delete a sub-activity
 *     tags: [SubActivities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongodb-objectid
 *         description: Sub-activity ID
 *     responses:
 *       204:
 *         description: Sub-activity deleted successfully
 *       404:
 *         description: Sub-activity not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sub-activity not found"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *
 * @swagger
 * /sub-activities/by-activity/{activityId}:
 *   get:
 *     summary: Get all sub-activities for a specific activity
 *     tags: [SubActivities]
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: string
 *           format: mongodb-objectid
 *         description: Activity ID to filter sub-activities
 *     responses:
 *       200:
 *         description: List of sub-activities for the specified activity
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
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         format: mongodb-objectid
 *                       portalItemNameEn:
 *                         type: string
 *                       portalItemNameAr:
 *                         type: string
 *                       pricingMethod:
 *                         type: string
 *                         enum: [manual, fixed, perItem, perLocation]
 *                       isActive:
 *                         type: boolean
 *                       transactionType:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             format: mongodb-objectid
 *                           name:
 *                             type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
