/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - actSrl
 *         - activityTransactionType
 *         - activityNameEn
 *         - activityNameAr
 *         - activityCode
 *         - portalActivityNameEn
 *         - portalActivityNameAr
 *         - isWithItems
 *         - financeEffect
 *         - sign
 *         - isOpsActive
 *         - isPortalActive
 *         - isInOrderScreen
 *         - isActive
 *       properties:
 *         _id:
 *           type: string
 *           format: mongodb-objectid
 *           description: The auto-generated id of the activity
 *         actSrl:
 *           type: string
 *           description: Unique serial number for the activity
 *         activityTransactionType:
 *           type: string
 *           format: mongodb-objectid
 *           description: Reference to the transaction type
 *         activityNameEn:
 *           type: string
 *           description: English name of the activity
 *         activityNameAr:
 *           type: string
 *           description: Arabic name of the activity
 *         activityCode:
 *           type: string
 *           description: Unique code for the activity
 *         portalActivityNameEn:
 *           type: string
 *           description: English name shown in the portal
 *         portalActivityNameAr:
 *           type: string
 *           description: Arabic name shown in the portal
 *         isWithItems:
 *           type: boolean
 *           description: Whether the activity includes items
 *           default: false
 *         financeEffect:
 *           type: boolean
 *           description: Whether the activity has financial impact
 *           default: false
 *         sign:
 *           type: boolean
 *           description: Sign indicator for the activity
 *           default: false
 *         isOpsActive:
 *           type: boolean
 *           description: Whether the activity is active in operations
 *           default: false
 *         isPortalActive:
 *           type: boolean
 *           description: Whether the activity is active in the portal
 *           default: false
 *         isInOrderScreen:
 *           type: boolean
 *           description: Whether the activity appears in order screen
 *           default: false
 *         isActive:
 *           type: boolean
 *           description: Whether the activity is active overall
 *           default: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the activity was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the activity was last updated
 *         subActivities:
 *           type: array
 *           description: List of sub-activities associated with this activity
 *           items:
 *             $ref: '#/components/schemas/SubActivity'
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         actSrl: "ACT001"
 *         activityTransactionType: "507f1f77bcf86cd799439012"
 *         activityNameEn: "Document Verification"
 *         activityNameAr: "التحقق من المستندات"
 *         activityCode: "DOC-VER"
 *         portalActivityNameEn: "Document Verification Service"
 *         portalActivityNameAr: "خدمة التحقق من المستندات"
 *         isWithItems: true
 *         financeEffect: true
 *         sign: true
 *         isOpsActive: true
 *         isPortalActive: true
 *         isInOrderScreen: true
 *         isActive: true
 *         createdAt: "2023-01-01T00:00:00.000Z"
 *         updatedAt: "2023-01-01T00:00:00.000Z"
 *         subActivities: []
 *
 * @swagger
 * tags:
 *   name: Activities
 *   description: Activities management API
 *
 * @swagger
 * /activities:
 *   get:
 *     summary: Get all activities
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: List of all activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 *   post:
 *     summary: Create a new activity
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - actSrl
 *               - activityTransactionType
 *               - activityNameEn
 *               - activityNameAr
 *               - activityCode
 *               - portalActivityNameEn
 *               - portalActivityNameAr
 *               - isWithItems
 *               - financeEffect
 *               - sign
 *               - isOpsActive
 *               - isPortalActive
 *               - isInOrderScreen
 *               - isActive
 *             properties:
 *               actSrl:
 *                 type: string
 *               activityTransactionType:
 *                 type: string
 *                 format: mongodb-objectid
 *               activityNameEn:
 *                 type: string
 *               activityNameAr:
 *                 type: string
 *               activityCode:
 *                 type: string
 *               portalActivityNameEn:
 *                 type: string
 *               portalActivityNameAr:
 *                 type: string
 *               isWithItems:
 *                 type: boolean
 *               financeEffect:
 *                 type: boolean
 *               sign:
 *                 type: boolean
 *               isOpsActive:
 *                 type: boolean
 *               isPortalActive:
 *                 type: boolean
 *               isInOrderScreen:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Activity created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *
 * @swagger
 * /activities/{id}:
 *   get:
 *     summary: Get an activity by ID
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongodb-objectid
 *         description: Activity ID
 *     responses:
 *       200:
 *         description: Activity found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Activity not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Activity not found"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *
 *   put:
 *     summary: Update an activity
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongodb-objectid
 *         description: Activity ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               actSrl:
 *                 type: string
 *               activityTransactionType:
 *                 type: string
 *                 format: mongodb-objectid
 *               activityNameEn:
 *                 type: string
 *               activityNameAr:
 *                 type: string
 *               activityCode:
 *                 type: string
 *               portalActivityNameEn:
 *                 type: string
 *               portalActivityNameAr:
 *                 type: string
 *               isWithItems:
 *                 type: boolean
 *               financeEffect:
 *                 type: boolean
 *               sign:
 *                 type: boolean
 *               isOpsActive:
 *                 type: boolean
 *               isPortalActive:
 *                 type: boolean
 *               isInOrderScreen:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Activity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Activity not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Activity not found"
 *       400:
 *         description: Validation error or duplicate actSrl
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Activity with this actSrl already exists"
 *
 *   delete:
 *     summary: Delete an activity and its sub-activities
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongodb-objectid
 *         description: Activity ID
 *     responses:
 *       204:
 *         description: Activity and related sub-activities deleted successfully
 *       404:
 *         description: Activity not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Activity not found"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
