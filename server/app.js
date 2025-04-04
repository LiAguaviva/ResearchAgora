import createError from 'http-errors';
import express from 'express';
import path, {dirname} from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import cors from 'cors'; 

import userRouter from './modules/user/user.routes.js';
import projectRouter from './modules/project/project.routes.js';
import offerRouter from './modules/offer/offer.routes.js';
import reviewRouter from './modules/review/review.routes.js';
import messageRouter from './modules/message/message.routes.js';
import notificationRouter from './modules/notification/notification.routes.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/offer', offerRouter);
app.use('/api/review', reviewRouter);
app.use('/api/message', messageRouter);
app.use('/api/notification', notificationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(err);
});


export default app;