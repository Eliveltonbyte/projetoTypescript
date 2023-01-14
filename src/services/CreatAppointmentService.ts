import Appointment from "../models/Appontment";
import { startOfHour} from 'date-fns';
import { getRepository } from "typeorm";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface Request {
    provider: string;
    date: Date;
}

class CreatAppointmemtService {
  
    public async execute({provider, date}:Request): Promise <Appointment> {
        const appointmentsRepository = getRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = appointmentsRepository.findOne(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error('Já existe')
            
        }


        const appointment = appointmentsRepository.create({
            provider ,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);
        return appointment;
    }
}

export default CreatAppointmemtService;