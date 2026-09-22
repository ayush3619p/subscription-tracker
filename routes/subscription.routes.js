import {Router} from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({title: "get all subscription route"});
});

subscriptionRouter.get('/:id', (req, res) => {
    res.send({title: "get subscription by ID route"});
});

subscriptionRouter.post('/', (req, res) => {
    res.send({title: "Create subscription route"});
});

subscriptionRouter.put('/:id', (req, res) => {
    res.send({title: "Update subscription route"});
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({title: "Delete subscription route"});
});

subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({title: "Get subscription by user ID route"});
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({title: "Cancel subscription route"});
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({title: "Get upcoming renewals route"});
});

export default subscriptionRouter;