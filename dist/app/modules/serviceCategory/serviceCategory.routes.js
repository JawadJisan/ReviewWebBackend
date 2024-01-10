"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewCategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const serviceCategory_controller_1 = require("./serviceCategory.controller");
const router = express_1.default.Router();
router.get('/:id', serviceCategory_controller_1.reviewCategoryController.getDataById);
router.delete('/:id', serviceCategory_controller_1.reviewCategoryController.deleteDataById);
router.patch('/:id', 
// validateRequest(validationSchema.update),
serviceCategory_controller_1.reviewCategoryController.updateDataById);
router.post('/', 
// validateRequest(validationSchema.create),
serviceCategory_controller_1.reviewCategoryController.insertIntoDB);
router.get('/', serviceCategory_controller_1.reviewCategoryController.getAllFromDB);
exports.reviewCategoryRoute = router;
