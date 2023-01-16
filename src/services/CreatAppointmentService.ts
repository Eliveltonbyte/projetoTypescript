import Appointment from "../models/Appontment";
import { startOfHour} from 'date-fns';
import { getCustomRepository } from "typeorm";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface Request {
    provider: string;
    date: Date;
}

class CreatAppointmemtService {
  
    public async execute({provider, date}:Request): Promise <Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate ) {
            throw Error('Já existe')
            
        }


        const appointment = await appointmentsRepository.create({
            provider ,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);
        return appointment;
    }
}

export default CreatAppointmemtService;