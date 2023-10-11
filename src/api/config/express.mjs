import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

function configExpress(app) {
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
}

export default configExpress;
