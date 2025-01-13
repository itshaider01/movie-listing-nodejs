import httpStatus from "http-status";
import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import * as userService from "./user.service";
import { ApiError } from "../../config/errors";

export const getUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["userId"] === "string") {
    const user = await userService.getUserById(
      new mongoose.Schema.Types.ObjectId(req.params["userId"])
    );
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    res.send(user);
  }
});



