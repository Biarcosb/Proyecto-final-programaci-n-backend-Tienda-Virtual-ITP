import { Request, Response } from 'express';

const errorHandler = (err: Error, _req: Request, res: Response):void => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
};

export default errorHandler;
