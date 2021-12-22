const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const { userId } = req.user;
  const jobs = await Job.find({ createdBy: userId }).sort("createdAt");

  if (!jobs.length) {
    throw new NotFoundError(
      `Unfortunately there is no job associated with the ${userId} user`
    );
  }

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ createdBy: userId, _id: jobId });

  if (!job) {
    throw new NotFoundError("job is not found");
  }

  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const { body } = req;

  const job = await Job.create({ ...body });

  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("company or position cannot be empty");
  }

  const job = await Job.findOneAndUpdate(
    { createdBy: userId, _id: jobId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!job) {
    throw new NotFoundError("job is not found");
  }

  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndDelete({ createdBy: userId, _id: jobId });

  if (!job) {
    throw new NotFoundError("job is not found");
  }

  res.status(StatusCodes.OK).json({ job });
};

module.exports = { getAllJobs, getJob, updateJob, createJob, deleteJob };
