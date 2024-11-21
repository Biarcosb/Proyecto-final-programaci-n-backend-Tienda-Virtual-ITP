import { Request, Response } from 'express';
import { GetUserProfile } from '../services/getUserProfileService';

export const getProfile = async (req: Request, res: Response) : Promise<void> => {
  try {
    console.log(req, 'req');
    const userProfile = new GetUserProfile();
    const user = await userProfile.getUserProfile(req.user.id);
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
