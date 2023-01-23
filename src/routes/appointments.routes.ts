import {  Router } from 'express';
import CreatAppointmemtService from '../services/CreatAppointmentService';
import {  parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appontment';
import AppointmentRepository from '../repositories/AppointmentsRepository';



const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) =>{
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointments = await appointmentRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
   
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);
   
    
    const creatAppointmemtService = new CreatAppointmemtService();

    const appointment =  await creatAppointmemtService.execute({ date: parseDate, provider_id});

    return response.json(appointment);
    } catch (err:any){
       return response.status(400).json({ error: err.message});
    }
  
});

export default appointmentsRouter;