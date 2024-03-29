import TenanatModel from '../models/employee_login.js';
import express from 'express';
import { Router } from 'express';

const router = Router();
router.use(express.json());

// for verify otp
router.post('/verify', async (req, res) => {
  try {
    console.log('Received payload:', req.body);
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing' });
    }

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find the user by email
    const user = await TenanatModel.findOne({ 'employees.email': email });

    if (!user) {
      return res.status(400).json({ message: 'Email is not registered' });
    }

    const employee = user.employees.find((emp) => emp.email === email);

    // Check if the employee is already verified
    if (employee.verified) {
      return res.status(200).json({ message: 'Already Verified' });
    }

    // Check if OTP matches
    if (employee.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP has expired (you can set an expiration time in the database)
    const otpSentTime = new Date(employee.otpSentTime);
    const currentTime = new Date();

    // Assuming the OTP is valid for 5 minutes
    // const otpExpirationTime = 5 * 60 * 1000;

    // if (currentTime - otpSentTime > otpExpirationTime) {
    //   return res.status(400).json({ message: 'OTP has expired' });
    // }

    // Update the employee's verification status
    employee.verified = true;
    await user.save();

    return res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;



