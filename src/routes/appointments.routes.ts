import { request, Router, response } from 'express';
import CreatAppointmemtService from '../services/CreatAppointmentService';
import {  parseISO } from 'date-fns';
import Appointment from '../models/Appontment';
import AppointmentRepository from '../repositories/AppointmentsRepository';



const appointmentsRouter = Router();

const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) =>{
    const appointments = appointmentRepository.all();

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);
    
    const creatAppointmemtService = new CreatAppointmemtService(appointmentRepository);

    const appointment = creatAppointmemtService.execute({ date: parseDate, provider});

    return response.json(appointment);
    } catch (err:any){
       return response.status(400).json({ error: err.message});
    }
  
});

export default appointmentsRouter;